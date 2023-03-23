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
      req.body,
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
    const result = await commentService.commentUpdateOne(req.params.id);

    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const result = await commentService.commentDeleteOne(req.params.id);

    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

export const commentRouter = router;
