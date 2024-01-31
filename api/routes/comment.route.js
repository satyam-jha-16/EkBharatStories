import express from "express"
import { verifyToken } from "../utils/verifyUser.js"
import { create, deleteComment, getAllComments, getComments, likeComment } from "../controllers/comment.controller.js"

const router = express.Router()
router.post('/create', verifyToken,create)
router.get('/getcomments/:postId',getComments)
router.get('/getcomments',getAllComments)
router.put('/likecomment/:commentId', verifyToken, likeComment)
router.delete('/deletecomment/:commentId', verifyToken, deleteComment)

export default router