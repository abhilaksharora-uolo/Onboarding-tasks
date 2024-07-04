import { v4 as uuidv4 } from "uuid";

interface User {
  name: string;
  email: string;
  id: string;
}

interface AddUserBody {
  name: string;
  email: string;
}

interface GetPageQuery {
  page?: number;
}

interface DeleteUserParams {
  id: string;
}

let users: User[] = [];

export const addUserService = (body: AddUserBody) => {
  const { name, email } = body;
  if (!name || !email) {
    return { ok: false, message: "All fields are required" };
  }
  const newUser: User = { name, email, id: uuidv4() };
  users.push(newUser);
  return { ok: true, newUser };
};

export const getUserService = (query: GetPageQuery) => {
  const page: number = Number(query.page) || 1;
  const limit: number = 8;
  const startIndex: number = (page - 1) * limit;
  const endIndex: number = page * limit;
  const totalPages: number = Math.ceil(users.length / limit);
  const results: User[] = users.slice(startIndex, endIndex);
  if (results.length <= 0) {
    return {
      ok: true,
      results,
      totalPages,
      message: "No users found",
    };
  }
  return {
    ok: true,
    results,
    totalPages,
    message: "Users fetched successfully",
  };
};

export const deleteUserService = (params: DeleteUserParams) => {
  const id: string = params.id;
  const userIndex = users.findIndex((user) => user.id === id);
  if (userIndex === -1) {
    return {
      ok: true,
      message: "User does not exists",
    };
  }
  users = users.filter((item) => item.id !== id);
  return {
    ok: true,
    message: "User deleted successfully",
    users,
  };
};
