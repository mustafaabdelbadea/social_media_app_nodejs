import jwt from "jsonwebtoken";
import Crud from "./utils/crud.js";
import { serviceErrorHandler } from "../services/utils/error.js";
import CommentModel from "../models/comment.model.js";

export class CommentController {
  
  async getOneById(id) {
    try {
      const comment = await Crud.getById(CommentModel, id);

      return {
        data: comment,
      };
    } catch (error) {
      throw error;
    }
  }

  async addComment(data) {
    try {
      const comment = await Crud.insert(CommentModel, data);
      return comment;
    } catch (error) {
      throw error;
    }
  }


  async getComments(filter) {
    try {
      const comments = await await Crud.findAll(CommentModel, filter);

      return comments
    } catch (error) {
      throw error;
    }
  }

  async updateOneByFilter(filter, data) {
    try {
      const comment = await Crud.findOneAndUpdate(CommentModel, filter, data)

      return comment
    } catch (error) {
      throw error
    }
  }

  async deleteOneByFilter(filter) {
    try {
      const comment = await Crud.deleteOne(CommentModel, filter)

      return {
        data: comment
      }
    } catch (error) {
      throw error
    }
  }
}

export default new CommentController();