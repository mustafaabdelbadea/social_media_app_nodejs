import jwt from "jsonwebtoken";
import userController from '../../controllers/user.controller.js';
import { serviceErrorHandler } from "./error.js";

export async function authenticateUser(token) {

  if (token) {
    try {
      token = token

      let decodedToken;

      try {
        decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
      } catch (error) {
        throw new StatusError("Invalid token", 401);
      }

      const userId = decodedToken._id;

      const user = await userController.getOneById(userId);

      if (!user) {
        throw new serviceErrorHandler({message: "Authentication failed"}, 401);
      }

      return user.data;
    } catch (error) {
      throw new serviceErrorHandler({message: "Not authorized"}, 401);
    }
  } else {
    throw new serviceErrorHandler({message: "Not authorized"}, 401);
  }
}
