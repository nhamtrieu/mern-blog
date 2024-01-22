import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { create, getposts } from "../controllers/post.controller.js";

const route = express.Router();

route.post("/create", verifyToken, create);
route.get("/getposts", getposts);

export default route;
