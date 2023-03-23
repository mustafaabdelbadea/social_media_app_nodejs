import Crud from "./utils/crud.js";
import PostModel from "../models/post.model.js";
import  CommentController  from "./comment.controller.js";
import  ReviewController  from "./review.controller.js";

export class PostController {
  async getOneById(id) {
    try {
      const post = await Crud.getById(PostModel, id);
      const comments = await CommentController.getComments({post: post._id})
      const reviews = await ReviewController.getReviews({post: post._id})

      return {
        comments,
        reviews,
        post
      }
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

    async getPosts(filter) {
      try {
        const posts = await Crud.findAll(PostModel, filter);

        return posts
        
      } catch (error) {
        throw error;
      }
    }

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
