
import mongoose from "mongoose";

const ReviewSchema = mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    post:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    },
    rate: {
        type: Number
    }
    
})

const ReviewModel = mongoose.model("Review", ReviewSchema);

export default ReviewModel;