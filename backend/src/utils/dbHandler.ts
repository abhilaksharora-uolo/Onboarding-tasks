import { createUser, deleteUser, updateUserById } from "./dbOperations";

export const createNewUserHandler = async (
  name: string,
  email: string,
  hashedPassword: string,
  imageName: string
) => {
  try {
    return await createUser(name, email, hashedPassword, imageName);
  } catch (err) {
    console.log(err);
  }
};

export const updateUserHandler = async (
  id: string,
  name: string,
  email: string,
  hashedPassword: string,
  imageName: string
) => {
  try {
    return await updateUserById(id, name, email, hashedPassword, imageName);
  } catch (err) {
    console.log(err);
  }
};

export const deleteUserHandler = async (id: string) => {
  try {
    return await deleteUser(id);
  } catch (err) {
    console.log(err);
  }
};
