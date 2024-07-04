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
  limit?: number;
}

interface DeleteUserParams {
  id: string;
}

let users: User[] = [];

export const addUserService = (name: string, email: string) => {
  const newUser: User = { name, email, id: uuidv4() };
  users.push(newUser);
  return { ok: true, newUser };
};

export const getUserService = (query: GetPageQuery) => {
  const page: number = Number(query.page) || 1;
  const limit: number = Number(query.limit) || 8;
  console.log(limit)
  const startIndex: number = (page - 1) * limit;
  const endIndex: number = page * limit;
  const totalPages: number = Math.ceil(users.length / limit);
  const results: User[] = users.slice(startIndex, endIndex);
  return {
    ok: true,
    results,
    totalPages,
    message:
      results.length <= 0 ? "No users found" : "Users fetched successfully",
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
