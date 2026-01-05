import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
    {
        category: {
            type:String,
            required: true
        },
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        read: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
); 

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;