import express from "express";

const route = express.Router();

route.get("/test", (req, res) => {
    res.json({ message: "User route" });
});

export default route;
