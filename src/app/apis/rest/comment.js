import { Router } from "express";
import commentService from "../../services/comment.service.js";
const router = Router();

router.post("/:id", async (req, res) => {
  try {
    const data = {
      content: req.body.content,
      post: req.params.id,
    };

    const result = await commentService.commentCreate(
      data,
      req.headers["authorization"]
    );

    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const result = await commentService.commentDeleteOne(
      req.params.id,
      req.headers["authorization"]
    );
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const data = {
      _id: req.params.id,
      content: req.body.content,
    };
    const result = await commentService.commentUpdateOne(
      data,
      req.headers["authorization"]
    );

    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const result = await commentService.commentDeleteOne(
      req.params.id,
      req.headers["authorization"]
    );

    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

export const commentRouter = router;
