import { Router } from 'express';
import { userRouter } from './user.js';
const router = Router();


router.get("/", () => {
    console.log("Hello World!");
})

router.use('/user', userRouter)


export default router;