import { getObjectSignedUrl, uploadFile } from "../controllers/imageController";
import { client } from "../config/elasticSearch";
import userModel from "../model/userModel";
import bcrypt from "bcryptjs";

interface User {
  name: string;
  email: string;
  hashedPassword: string;
  imageName: string;
}

interface UserHit {
  isDeleted: boolean;
  _id: string;
  imageUrl: string;
  imageName: string;
  _source: {
    name: string;
    email: string;
    hashedPassword: string;
    imageName: string;
    mongoId: string;
    isDeleted?: boolean;
    updatedAt: Date;
  };
}

interface GetPageQuery {
  page?: number;
  limit?: number;
}

interface DeleteUserParams {
  id: string;
}

export const addUserService = async (
  name: string,
  email: string,
  password: string,
  file: Express.Multer.File
) => {
  try {
    const body = await client.search<UserHit>({
      index: "users",
      body: {
        query: {
          term: { email: email },
        },
      },
    });
    console.log(body, "ADD BODY");
    const hits = body?.hits?.hits || [];
    console.log(hits, "hits");
    const userCount = hits.length;
    let elasticId: string = "";
    let mongoId: string = "";

    if (hits.length > 0) {
      const firstHit = hits[0];
      elasticId = String(firstHit._id);
      mongoId = (firstHit._source as { mongoId?: string })?.mongoId || "";
    }

    let existingUserActive = false;
    let isDeleted: Boolean = false;
    for (const hit of hits) {
      const { _source } = hit;
      isDeleted = Boolean(_source?.isDeleted);
      if (_source && _source.isDeleted === false) {
        existingUserActive = true;
        break;
      }
    }

    if (existingUserActive) {
      return {
        ok: false,
        message: "User with this email already exists and is active.",
      };
    } else if (!existingUserActive && isDeleted) {
      const imageName = Date.now().toString();
      if (file) {
        await uploadFile(
          file.buffer,
          `${imageName}${file.originalname}`,
          file.mimetype
        );
      }
      const img = `${imageName}${file.originalname}`;
      const hashedPassword = await bcrypt.hash(password, 8);

      const elasD = await client.update({
        index: "users",
        id: elasticId,
        body: {
          doc: {
            name,
            email,
            hashedPassword,
            imageName: img,
            isDeleted: false,
          },
        },
      });

      console.log(elasD, "update");

      const userUpdated = await userModel.findByIdAndUpdate(mongoId, {
        name,
        email,
        hashedPassword,
        imageName: img,
        isDeleted: false,
      });
      return { ok: true, userUpdated };
    }

    const imageName = Date.now().toString();
    if (file) {
      await uploadFile(
        file.buffer,
        `${imageName}${file.originalname}`,
        file.mimetype
      );
    }
    const img = `${imageName}${file.originalname}`;
    const hashedPassword = await bcrypt.hash(password, 8);

    const user = await userModel.create({
      name,
      email,
      hashedPassword,
      imageName: img,
    });

    if (user && user._id && user.updatedAt) {
      const body = await client.index({
        index: "users",
        body: {
          name,
          email,
          hashedPassword,
          imageName: img,
          isDeleted: false,
          mongoId: user._id.toString(),
          updatedAt: user.updatedAt,
        },
      });
    }

    return { ok: true, user };
  } catch (err) {
    return { ok: false, message: (err as Error).message };
  }
};

export const getUserService = async (query: GetPageQuery) => {
  try {
    const page: number = Number(query.page) || 1;
    const limit: number = Number(query.limit) || 8;
    const startIndex: number = (page - 1) * limit;

    const body = await client.search<UserHit>({
      index: "users",
      from: startIndex,
      size: limit,
      body: {
        query: {
          bool: {
            must: [{ match_all: {} }, { term: { isDeleted: false } }],
          },
        },
        sort: [{ updatedAt: { order: "asc" } }],
      },
    });

    let userCount = 0;
    if (body && body.hits && body.hits.total) {
      if (typeof body.hits.total === "number") {
        userCount = body.hits.total;
      } else if ("value" in body.hits.total) {
        userCount = body.hits.total.value;
      }
    }

    if (userCount === 0) {
      return { ok: false, message: "No users found" };
    }

    const totalPages: number = Math.ceil(userCount / limit);

    const res = body.hits.hits.map((hit: any) => ({
      _id: hit._id,
      ...hit._source,
    }));

    for (const user of res) {
      user.imageUrl = await getObjectSignedUrl(user.imageName);
    }

    return {
      ok: true,
      res,
      totalPages,
      message: "Users fetched successfully",
    };
  } catch (err) {
    return { ok: false, message: (err as Error).message };
  }
};

export const deleteUserService = async (params: DeleteUserParams) => {
  const id: string = params.id;
  console.log(id);

  const body = await client.search<UserHit>({
    index: "users",
    body: {
      query: {
        match: { mongoId: id },
      },
    },
  });

  let userCount = 0;
  if (body && body.hits && body.hits.total) {
    if (typeof body.hits.total === "number") {
      userCount = body.hits.total;
    } else if ("value" in body.hits.total) {
      userCount = body.hits.total.value;
    }
  }
  if (userCount < 0) {
    return {
      ok: false,
      message: "User does not exists",
    };
  }

  if (body?.hits?.hits.length > 0) {
    const userHit = body.hits.hits[0];
    const elasticId = userHit._id;

    if (elasticId) {
      const elasD = await client.update({
        index: "users",
        id: elasticId,
        body: {
          doc: { isDeleted: true },
        },
      });
      console.log(elasD);
    }
  }
  const user = await userModel.findByIdAndUpdate(id, { isDeleted: true });
  if (!user) {
    return {
      ok: false,
      message: "User does not exists",
    };
  }
  return {
    ok: true,
    message: "User deleted successfully",
  };
};

export const searchUserService = async (query: any) => {
  try {
    const body: any = await client.search({
      index: "users",
      body: {
        query: {
          bool: {
            should: [
              {
                multi_match: {
                  query: query,
                  fields: ["name", "email"],
                  type: "best_fields",
                  fuzziness: "AUTO",
                  operator: "OR",
                },
              },
              {
                match_phrase_prefix: {
                  name: {
                    query: query,
                    slop: 10,
                  },
                },
              },
            ],
            minimum_should_match: 1,
          },
        },
      },
    });

    const res = body.hits.hits.map((hit: any) => ({
      _id: hit._id,
      ...hit._source,
    }));
    for (const user of res) {
      user.imageUrl = await getObjectSignedUrl(user.imageName);
    }

    return {
      ok: true,
      res,
    };
  } catch (err) {
    console.error("Error searching users:", err);
    return { ok: false, message: (err as Error).message };
  }
};

export const deleteUserFromElastic = async (params: DeleteUserParams) => {
  const id: string = params.id;
  try {
    const body = await client.delete({
      index: "users",
      id: id,
    });
    return {
      ok: true,
      message: "User deleted successfully",
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
