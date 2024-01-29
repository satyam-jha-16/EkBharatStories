// import User from "../models/user.model";
import Post from "../models/post.model.js";
import { errorHandler } from "../utils/error.js";

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
        const startIndex = parseInt(req.query.startIndex) || 0
        const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === 'asc' ? 1 : -1;
    const posts = await Post.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.postId && { _id: req.query.postId }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: 'i' } },
          { content: { $regex: req.query.searchTerm, $options: 'i' } },
        ],
      }),
    })
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);


    const totalPosts = await Post.countDocuments();

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthPosts = await Post.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      posts,
      totalPosts,
      lastMonthPosts,
    });

    } catch (error) {
        
    }
}

export const deletePost = async (req, res, next) => {
        try {
          await Post.findByIdAndDelete(req.params.id)
          res.status(200).json({
            success:true,
            message:"Post deleted successfully"
          })
        } catch (error) {
          next(error)
        }       
}
