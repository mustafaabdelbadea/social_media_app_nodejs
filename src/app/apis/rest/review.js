import { Router } from "express";
import reviewService from "../../services/review.service.js";
const router = Router();

//create a review
router.post("/",async (req, res) => {
    try {
      const result = await reviewService.reviewCreate(req.body);
  
      res.send(result);
    } catch (error) {
      res.send(error);
    }
  });



router.get('/:id',async(req,res) => {
    try {
        const result = await reviewService.reviewGetOne(req.params.id);
    
        res.send(result);
      } catch (error) {
        res.send(error);
      }
});



router.patch('/:id',async (req,res) => {
 
    try {
        const result = await reviewService.reviewUpdateOne(req.params.id);
    
        res.send(result);
      } catch (error) {
        res.send(error);
      }
});



router.delete('/:id',async (req,res) => {
    
    try {
        const result = await reviewService.reviewDeleteOne(req.params.id);
    
        res.send(result);
      } catch (error) {
        res.send(error);
      }
});

export const reviewRouter = router;