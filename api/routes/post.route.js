import express from 'express';
import { verifyToken } from "../utils/verifyUser.js";
import { create, getPosts, updatePost } from "../controllers/post.controller.js";
import { deletePost } from "../controllers/post.controller.js";

const router = express.Router();

router.post('/create', verifyToken, create)
router.get('/getposts', getPosts)
router.delete('/deletepost/:id', verifyToken, deletePost )
router.put('/updatepost/:id', verifyToken, updatePost )


export default router 