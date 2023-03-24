import UsersController from "../controllers/user.controller.js";
import { serviceErrorHandler } from "./utils/error.js";
import usersValidator from "./utils/user-validator.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";
import { authenticateUser } from "./utils/authentication.js";
import userController from "../controllers/user.controller.js";
class UserService {

  async userSignUp(data) {

    try {
      const prepareData = {
        ...data.body,
        photos: [data?.file?.filename],
      };
      await usersValidator.create(prepareData);
      const foundUser = (
        await UsersController.getOneByFilter({ email: data.body.email })
      ).data;

      if (foundUser) {
        throw new serviceErrorHandler(
          { message: "Email already exists", name: "userFound" },
          {
            code: 409,
            path: "email",
          }
        );
      }
      const photo = await this.UploadPhoto(data?.file?.filename);

      prepareData.photos[0] = photo;

      delete prepareData.confirmPassword;

      const userResponse = await UsersController.userRegister(prepareData);

      return userResponse;
    } catch (error) {
      throw error;
    }
  }

  async userSignIn(data) {

    try {
      await usersValidator.signin(data);

      const userResponse = await UsersController.signIn(data);

      return userResponse;
    } catch (error) {
      throw error;
    }
  }
  async userGetOne(data) {
    try {
      const foundUser = (await UsersController.getOneById(data)).data;
      if (!foundUser) {
        throw new serviceErrorHandler(
          { message: "User not found", name: "usernotfound" },
          {
            code: 404,
            path: "_id",
          }
        );
      }
      return foundUser;
    } catch (error) {
      throw error;
    }
  }
  async deleteOne(data, userToken) {
    try {
      const authenticatedUser = await authenticateUser(userToken);
      if (authenticatedUser.role != "admin") {
        throw new serviceErrorHandler(
          { message: "Not authorized" },
          { code: 401 }
        );
      }
      const foundUser = (await UsersController.getOneById(data)).data;

      if (foundUser.role == "admin") {
        throw new serviceErrorHandler(
          { message: "Not allowed to delete this user" },
          { code: 401 }
        );
      }

      const response = await userController.deleteOne({ _id: data });
      return response;
    } catch (error) {
      throw error;
    }
  }
  async UploadPhoto(photo) {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    });
    try {
      const response = await cloudinary.uploader.upload("./uploads/" + photo, {
        public_id: "olympic_flag",
      });
      this.clearUploads(photo);
      return response.secure_url;
    } catch (error) {
      await this.clearUploads(photo);
      throw new serviceErrorHandler(
        { message: "Error while uploading photo" },
        {
          code: 400,
          path: "photo",
        }
      );
    }
  }

  clearUploads(file) {
    try {
      fs.unlink(path.join("./uploads/", file), (err) => {
        if (err) throw err;
      });
    } catch (error) {
      throw error;
    }
  }

  async userUpdateOne(data, userToken)
  {
 
   try {
     const authenticatedUser = await authenticateUser(userToken);
 
     if (authenticatedUser.role != "user") 
     {
 
       throw new serviceErrorHandler(
 
         { message: "Not authorized" },
         { code: 401 }
       );
     }
     
     const foundUser = await UsersController.updateOneByFilter(filter, data);
 
     return foundUser;
 
   } catch (error) {
     throw error;
   }
 }
};

 


export default new UserService();
