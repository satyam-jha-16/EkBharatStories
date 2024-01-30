import express from "express"
import { getUser, getUsers, test } from "../controllers/user.controller.js";
import { updateUser } from "../controllers/user.controller.js"
import { deleteUser } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
import { signout } from "../controllers/user.controller.js";
const router = express.Router()

router.get("/test", test)
router.put("/update/:userid", verifyToken,updateUser)
router.delete("/delete/:userid", verifyToken,deleteUser)
router.post("/signout", signout)
router.get("/getusers", verifyToken, getUsers)
router.get("/:userid",getUser)

export default router;