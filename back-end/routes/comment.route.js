import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
    createComment,
    getPostComments,
} from "../controllers/comment.controller.js";

const route = express.Router();

route.post("/create", verifyToken, createComment);
route.get("/getPostComments/:postId", getPostComments);

export default route;
