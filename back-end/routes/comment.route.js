import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
    createComment,
    getPostComments,
    likeComment,
    editComment,
} from "../controllers/comment.controller.js";

const route = express.Router();

route.post("/create", verifyToken, createComment);
route.get("/getPostComments/:postId", getPostComments);
route.put("/likeComment/:commentId", verifyToken, likeComment);
route.put("/editComment/:commentId", verifyToken, editComment);

export default route;
