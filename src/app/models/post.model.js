
import mongoose from "mongoose";

const PostSchema = mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    content: {
        type: String
    }
    
})

const PostModel = mongoose.model("Post", PostSchema);

export default PostModel;