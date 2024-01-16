import bycript from "bcryptjs";

import User from "../models/user.model.js";

export async function signup(req, res) {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const hashedPassword = bycript.hashSync(password, 10);

    const newUser = new User({ username, email, password: hashedPassword });

    try {
        await newUser.save();
        res.json({ message: "User created" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
