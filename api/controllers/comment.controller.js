import Comment from "../models/comment.model.js";
import { errorHandler } from "../utils/error.js";

export const create = async (req, res, next) => {
    try {
        const {content, postId, userId} = req.body;

        if(userId !== req.user.id){
            return next(errorHandler({status: 401, message: "Unauthorized to make comment"}));
        }
        const newComment = new Comment({
            content,
            postId,
            userId
        })
        await newComment.save();

        res.status(200).json(newComment)
        
    } catch (error) {
        next(errorHandler(error));
    }
};

export const getComments = async (req, res, next) => {
    try {
        const comments = await Comment.find({postId: req.params.postId}).sort({createdAt :-1});
        res.status(200).json(comments)
        
    } catch (error) {
        next(error)
        
    }
}

export const likeComment = async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.commentId)
        if(!comment){
            return next(errorHandler(404, "No comment was found"))
        }
        const userIndex = comment.likes.indexOf(req.user.id);
        if(userIndex == -1){
            comment.likes.push(req.user.id)
            comment.noOfLikes += 1
        }else{
            comment.likes.splice(userIndex, 1)
            comment.noOfLikes -= 1
        }
        await comment.save()
        res.status(200).json(comment)

    } catch (error) {
        next(error);
    }
}

export const deleteComment = async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.commentId)
        if(!comment){
            return next(errorHandler(404, "Comment doesn't exist"))
        }
        if(req.user.isAdmin){
            await Comment.findByIdAndDelete(req.params.commentId)
        res.status(200).json({message: "Comment deleted successfully"})
        }
        if(comment.userId !== req.user.id ){
            return next(errorHandler(401, "Unauthorized to delete comment"))
        }
        
        
        await Comment.findByIdAndDelete(req.params.commentId)
        res.status(200).json({message: "Comment deleted successfully"})
    } catch (error) {
        next(error);
        
    }
}

export const getAllComments = async (req, res, next) => {
    try {
        const comments = await Comment.find().sort({createdAt: -1})
        res.status(200).json(comments)
    } catch (error) {
        next(error);
        
    }
}