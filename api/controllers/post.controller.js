// import User from "../models/user.model";
import Post from "../models/post.model.js";

export const create = async (req, res, next) => {
    if(!req.user.id){ //check with userid
        return res.status(400).json({
            success:false,
            message:"You must be logged in to create a post"
        })
    }
    if(!req.body.title || !req.body.content){
        return res.status(400).json({
            success:false,
            message:"Title and content are required"
        })
    }
    const slug = req.body.title.replace(/ /g, "-").toLowerCase()
    const newPost =new Post({
        ...req.body, slug, userId:req.user.id
    })
    try {
        const savedPost = await newPost.save()

        res.status(200).json(savedPost)
        
    } catch (error) {
        next (error)
    }
}

export const getPosts = async (req, res, next) => {
    try {
        
    } catch (error) {
        
    }
}