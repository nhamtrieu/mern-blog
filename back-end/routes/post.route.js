import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
    create,
    deletepost,
    getposts,
    updatepost,
} from "../controllers/post.controller.js";

const route = express.Router();

route.post("/create", verifyToken, create);
route.get("/getposts", getposts);
route.delete("/delete/:postId/:userId", verifyToken, deletepost);
route.put("/update/:postId/:userId", verifyToken, updatepost);

export default route;
