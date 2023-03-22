import { Router } from "express";
import commentService from "../../services/comment.service.js";
const router = Router();

router.post("/",async (req, res) => {
  try {
    const result = await commentService.commentCreate(req.body);

    res.send(result);
  } catch (error) {
    res.send(error);
  }
});


router.get('/:id',async(req,res) => {
  try {
      const result = await commentService.commentGetOne(req.params.id);
  
      res.send(result);
    } catch (error) {
      res.send(error);
    }
});


router.patch('/:id',async (req,res) => {

  try {
      const result = await commentService.commentUpdateOne(req.params.id);
  
      res.send(result);
    } catch (error) {
      res.send(error);
    }
});



router.delete('/:id',async (req,res) => {
  
  try {
      const result = await commentService.commentDeleteOne(req.params.id);
  
      res.send(result);
    } catch (error) {
      res.send(error);
    }
});

export const commentRouter = router;