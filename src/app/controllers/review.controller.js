import Crud from "./utils/crud.js";
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

  async getReviews(filter) {
    try {
      const reviews = await await Crud.findAll(ReviewModel, filter);

      return reviews
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
