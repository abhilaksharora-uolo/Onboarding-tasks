import userModel from "../model/userModel";

export const createUser = async (
  name: string,
  email: string,
  hashedPassword: string,
  imageName: string
) => {
  try {
    return await userModel.create({
      name,
      email,
      hashedPassword,
      imageName,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateUserById = async (
  id: string,
  name: string,
  email: string,
  hashedPassword: string,
  imageName: string
) => {
  try {
    return await userModel.findByIdAndUpdate(id, {
      name,
      email,
      hashedPassword,
      imageName,
      isDeleted: false,
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteUser = async (id: string) => {
  try {
    return await userModel.findByIdAndUpdate(id, { isDeleted: true });
  } catch (err) {
    console.log(err);
  }
};
