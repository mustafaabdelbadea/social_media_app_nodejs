import { Router } from "express";
import { userRouter } from "./user.js";
import { postRouter } from "./post.js";
import { commentRouter } from "./comment.js";
import { reviewRouter } from "./review.js";

const router = Router();

router.get("/", (req, res) => {
  res.send("Hello World")
});

router.use("/user", userRouter);
router.use("/comment", commentRouter);
router.use("/review", reviewRouter);
router.use("/post", postRouter);

export default router;
