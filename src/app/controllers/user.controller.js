import jwt from "jsonwebtoken";
import Crud from "./utils/Crud.js";
import { serviceErrorHandler } from "../services/utils/error.js";
import UserModel from "../models/user.model.js";

export class UsersController {
  async userRegister(data) {
    try {
      const userData = {
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role
      };

      const user = await Crud.insert(UserModel, userData);

      return {
        data: user,
      };
    } catch (error) {
      throw error;
    }
  }

  async signIn(data) {
    try {
      const user = await Crud.findOneByFilter(UserModel, { email: data.email });

      if (!user) {
        throw new serviceErrorHandler(
          {message: "User not found"},
          400
        );
      }

      if (UserModel.checkPassword(data.password, user.password)) {
        let token = jwt.sign(
          { _id: user._id, email: user.email },
          process.env.JWT_SECRET_KEY
        );

        return {
          data: {
            token: token,
            user: user,
          },
        };
      } else {
        throw new serviceErrorHandler(
          {message: "Wrong Password"},
          400
        );
      }
    } catch (error) {
      throw error;
    }
  }

  async getOneById(id) {
    try {
      const user = await Crud.getById(UserModel, id, {
        populate: "password" 
      });

      return {
        data: user,
      };
    } catch (error) {
      throw error;
    }
  }

  async getOneByFilter(filter) {
    try {
      const user = await Crud.findOneByFilter(UserModel, filter);

      return {
        data: user,
      };
    } catch (error) {
      throw error;
    }
  }

  async updateOneByFilter(filter, data) {
    try {
      const user = await Crud.findOneAndUpdate(UserModel, filter, data)

      return {
        data: user
      }
    } catch (error) {
      throw error
    }
  }
}

export default new UsersController();
