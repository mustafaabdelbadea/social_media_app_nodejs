
import mongoose from "mongoose";

const CommentSchema = mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    post:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    },
    content: {
        type: String
    }
    
})

const CommentModel = mongoose.model("Comment", CommentSchema);

export default CommentModel;