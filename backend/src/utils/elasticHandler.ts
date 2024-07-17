import {
  createIndex,
  deleteUser,
  getUsersService,
  searchByEmail,
  searchById,
  userUpdateElastic,
} from "./elasticOperations";

export const searchByEmailHandler = async (email: string) => {
  try {
    return await searchByEmail(email);
  } catch (err) {
    console.log(err);
  }
};

export const userUpdateElasticHandler = async (
  elasticId: string,
  name: string,
  email: string,
  hashedPassword: string,
  imageName: string
) => {
  try {
    return await userUpdateElastic(
      elasticId,
      name,
      email,
      hashedPassword,
      imageName
    );
  } catch (err) {
    console.log(err);
  }
};

export const createIndexHandler = async (
  name: string,
  email: string,
  hashedPassword: string,
  imageName: string,
  mongoId: string,
  updatedAt: Date
) => {
  try {
    return createIndex(
      name,
      email,
      hashedPassword,
      imageName,
      mongoId,
      updatedAt
    );
  } catch (err) {
    console.log(err);
  }
};

export const getAllUsersHandler = async (
  searchQuery: string,
  page: number,
  limit: number
) => {
  try {
    return await getUsersService(searchQuery, page, limit);
  } catch (err) {
    console.log(err);
  }
};

export const searchByIdHandler = async (id: string) => {
  try {
    return await searchById(id);
  } catch (err) {
    console.log(err);
  }
};

export const deleteUserElasticHandler = async (elasticId: string) => {
  try {
    return await deleteUser(elasticId);
  } catch (err) {
    console.log(err);
  }
};