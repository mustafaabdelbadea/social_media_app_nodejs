import Crud from "./utils/Crud.js";
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
  async getOneByfiler(filter) {
    try {
      const review = await Crud.findOneByFilter(ReviewModel, filter);

      return {
        data: review,
      };
    } catch (error) {
      throw error;
    }
  }

  async addReview(data) {
    try {
      const review = await Crud.insert(ReviewModel, data);
      return review
    } catch (error) {
      throw error;
    }
  }

  async updateOneByFilter(filter, data) {
    try {
      const review = await Crud.findOneAndUpdate(ReviewModel, filter, data)
      console.log("🚀 ~ file: review.controller.js:41 ~ ReviewController ~ updateOneByFilter ~ review:", review)

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
