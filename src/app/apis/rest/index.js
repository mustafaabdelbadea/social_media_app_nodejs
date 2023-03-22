import { Router } from 'express';
import { userRouter } from './user.js';
const router = Router();


router.get("/", () => {
    console.log("Hello World!");
})

router.use('/user', userRouter);
// router.use('/comment', commentRouter);
// router.use('/review',reviewRouter);
// router.use('/post',postRouter);



export default router;