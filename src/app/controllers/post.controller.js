import Crud from "./utils/crud.js";
import PostModel from "../models/post.model.js";

export class PostController {
  async getOneById(id) {
    try {
      const post = await Crud.getById(PostModel, id);

      return {
        data: post,
      };
    } catch (error) {
      throw error;
    }
  }

  async addPost(data) {
    try {
      const post = await Crud.insert(PostModel, data);
      return post;
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
      const post = await Crud.findOneAndUpdate(PostModel, filter, data);

      return {
        data: post,
      };
    } catch (error) {
      throw error;
    }
  }

  async deleteOneByFilter(filter) {
    try {
      const post = await Crud.deleteOne(PostModel, filter);

      return {
        data: post,
      };
    } catch (error) {
      throw error;
    }
  }
}

export default new PostController();
