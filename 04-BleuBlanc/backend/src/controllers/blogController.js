import Blog from "../models/Blog.js";


export async function getAllBlogs(req, res) {
    try {
        const allBlogs = await Blog.find().sort({ createdAt: -1 });
        res.status(200).json(allBlogs);
    }
    catch(err) {
        console.log("Error in addBlog controller: ", err.message);
        res.status(500).json({ message: "Server error" });
    }
}


export async function getBlogById(req, res) {
    try {
        const specificBlog = await Blog.findById(req.params.id);
        if (!specificBlog) return res.status(404).json({ message: "Blog not found" });
        res.status(200).json(specificBlog);
    }
    catch(err) {
        console.log("Error in addBlog controller: ", err.message);
        res.status(500).json({ message: "Server error" });
    }
}


export async function addBlog(req, res) {
    try {
        const { category, title, content, read, image } = req.body;
        const newBlog = new Blog({category, title, content, read, image});
        const savedBlog = await newBlog.save();

        res.status(201).json(savedBlog);
    }
    catch(err) {
        console.log("Error in addBlog controller: ", err.message);
        res.status(500).json({ message: "Server error" });
    }
}


export async function updateBlog(req, res) {
    try {
        const {category, title, content, read, image} = req.body;
        const updatedBlog = await Blog.findByIdAndUpdate(
            req.params.id,
            { category, title, content, read, image },
            { new: true }
        );

        if (!updatedBlog) return res.status(404).json({ message:"Blog not found" });
        res.status(200).json(updatedBlog);
    }
    catch(err) {
        console.log("Error in addBlog controller: ", err.message);
        res.status(500).json({ message: "Server error" });
    }
}


export async function deleteBlog(req, res) {
    try {
        const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
        if (!deletedBlog) return res.status(404).json({ message: "Blog not found" }); 
        res.status(200).json(deletedBlog);
    }
    catch(err) {
        console.log("Error in addBlog controller: ", err.message);
        res.status(500).json({ message: "Server error" });
    } 
}