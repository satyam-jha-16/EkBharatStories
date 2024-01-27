import express from "express"
import { test } from "../controllers/user.controller.js";
import { updateUser } from "../controllers/user.controller.js"
import { deleteUser } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
const router = express.Router()

router.get("/test", test)
router.put("/update/:userid", verifyToken,updateUser)
router.delete("/delete/:userid", verifyToken,deleteUser)

export default router;