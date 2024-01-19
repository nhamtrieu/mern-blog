import express from "express";
import { updateUser } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const route = express.Router();

route.get("/test", (req, res) => {
    res.json({ message: "User route" });
});

route.put("/update/:userId", verifyToken, updateUser);

export default route;
