import { client } from "../config/initializeElasticsearch";

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

export const searchByEmail = async (email: string) => {
  try {
    const body = await client.search<UserHit>({
      index: "abhilaksh_users3",
      body: {
        query: {
          match_phrase: { email: email },
        },
      },
    });
    const hits = body?.hits?.hits || [];
    const userCount = hits.length;
    let elasticId: string = "";
    let mongoId: string = "";

    let firstHit;
    if (userCount > 0) {
      firstHit = hits[0];
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
    return { existingUserActive, isDeleted, firstHit, elasticId, mongoId };
  } catch (err) {
    console.log(err);
  }
};

export const userUpdateElastic = async (
  elasticId: string,
  name: string,
  email: string,
  hashedPassword: string,
  imageName: string
) => {
  try {
    return await client.update({
      index: "abhilaksh_users3",
      id: elasticId,
      body: {
        doc: {
          name,
          email,
          hashedPassword,
          imageName,
          isDeleted: false,
        },
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const createIndex = async (
  name: string,
  email: string,
  hashedPassword: string,
  imageName: string,
  mongoId: string,
  updatedAt: Date
) => {
  try {
    return await client.index({
      index: "abhilaksh_users3",
      body: {
        name,
        email,
        hashedPassword,
        imageName,
        isDeleted: false,
        mongoId,
        updatedAt,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const searchById = async (id: string): Promise<any> => {
  try {
    const body = await client.search<UserHit>({
      index: "abhilaksh_users3",
      body: {
        query: {
          match: { mongoId: id },
        },
      },
    });
    console.log(body, "body");
    if (body?.hits?.hits.length > 0) {
      return body.hits.hits[0];
    } else {
      return null;
    }
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const deleteUser = async (elasticId: string) => {
  try {
    return await client.update({
      index: "abhilaksh_users3",
      id: elasticId,
      refresh: true,
      body: {
        doc: { isDeleted: true },
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const getUsersService = async (
  query: string,
  page: number,
  limit: number
): Promise<any> => {
  try {
    const from = (page - 1) * limit;

    const baseQuery: any = {
      bool: {
        must: [{ term: { isDeleted: false } }],
      },
    };

    if (query !== " ") {
      baseQuery.bool.should = [
        {
          wildcard: {
            name: {
              value: `*${query}*`,
              boost: 1.0,
            },
          },
        },
        {
          wildcard: {
            email: {
              value: `*${query}*`,
              boost: 1.0,
            },
          },
        },
      ];
      baseQuery.bool.minimum_should_match = 1;
    } else {
      baseQuery.bool.must.push({ match_all: {} });
    }

    const body: any = await client.search({
      index: "abhilaksh_users3",
      body: {
        query: baseQuery,
        from: from,
        size: limit,
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

    return {
      body,
      userCount,
    };
  } catch (err) {
    return { ok: false, message: (err as Error).message };
  }
};
