import { model } from "mongoose";

class Crud {
  async insert(model, data) {
    try {
      const document = new model(data);
      const insertedDoc = await document.save();

      return insertedDoc;
    } catch (error) {
      console.log(error);
      throw new Error("Something Went Wrong");
    }
  }

  async findAll(model, filter) {
    try {
      const data = await model.find(filter);
      return data;
    } catch (error) {
      throw new Error("Something Went Wrong");
    }
  }

  async getById(model, _id, options) {
    try {
      const doc = await model
        .findOne({ _id: _id })
        .select(`-${options?.populate}`);

      return doc;
    } catch (error) {
      throw new Error("Something Went Wrong");
    }
  }

  async findOneByFilter(model, filter, options = {}) {
    try {
      const doc = await model.findOne(filter);
      return doc;
    } catch (error) {
      throw new Error("Something Went Wrong");
    }
  }

  async findOneAndUpdate(model, filter, data) {
    try {
      const doc = await model.findOneAndUpdate(filter, data, { new: true });

      return doc;
    } catch (error) {
      throw new Error("Something Went Wrong");
    }
  }

  async deleteOne(model, filter) {
    try {
      const doc = await model.deleteOne(filter);

      return doc;
    } catch (error) {
      throw new Error("Something Went Wrong");
    }
  }

  async deleteAll(model, filter) {
    try {
      const doc = await model.deleteMany(filter);

      return doc;
    } catch (error) {
      throw new Error("Something Went Wrong");
    }
  }
}

export default new Crud();
