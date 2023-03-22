import jwt from "jsonwebtoken";
import Crud from "./utils/Crud.js";
import { serviceErrorHandler } from "../services/utils/error.js";
import ReviewModel from "../models/review.model.js";

export class ReviewController {
  
  async getOneById(id) {
    try {
      const review = await Crud.getById(ReviewModel, id);

      return {
        data: review,
      };
    } catch (error) {
      throw error;
    }
  }

//   async getOneByFilter(filter) {
//     try {
//       const user = await Crud.findOneByFilter(UserModel, filter);

//       return {
//         data: user,
//       };
//     } catch (error) {
//       throw error;
//     }
//   }

  async updateOneByFilter(filter, data) {
    try {
      const review = await Crud.findOneAndUpdate(ReviewModel, filter, data)

      return {
        data: review
      }
    } catch (error) {
      throw error
    }
  }

  async deleteOneByFilter(filter) {
    try {
      const review = await Crud.deleteOne(ReviewModel, filter)

      return {
        data: review
      }
    } catch (error) {
      throw error
    }
  }
}

export default new ReviewController();
