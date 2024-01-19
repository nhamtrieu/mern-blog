import bycript from "bcryptjs";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.userId) {
        return next(
            errorHandler(403, "You are not allowed to update this user")
        );
    }
    if (req.body.password) {
        if (req.body.password.length < 6) {
            return next(
                errorHandler(400, "Password must be at least 6 characters long")
            );
        }
        req.body.password = bycript.hashSync(req.body.password, 10);
    }
    if (req.body.username) {
        if (req.body.username.includes(" ")) {
            return next(errorHandler(400, "Username must not contain spaces"));
        }
        if (req.body.username.length < 6 || req.body.username.length > 20) {
            return next(
                errorHandler(
                    400,
                    "Username must be between 7 and 20 characters long"
                )
            );
        }
        if (req.body.username !== req.body.username.toLowerCase()) {
            return next(errorHandler(400, "Username must be lowercase"));
        }
        if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
            return next(
                errorHandler(
                    400,
                    "Username must contain only letters and numbers"
                )
            );
        }
    }
    try {
        const userUpdate = await User.findByIdAndUpdate(
            req.params.userId,
            {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    profilePicture: req.body.profilePicture,
                },
            },
            { new: true }
        );
        const { password, ...userReturn } = userUpdate._doc;
        res.status(200).json(userReturn);
    } catch (error) {
        next(error);
    }
};

export const deleteUser = async (req, res, next) => {
    const user = await User.findById(req.params.userId);
    if (!user) {
        return next(errorHandler(404, "User not found"));
    }
    if (req.user.id !== req.params.userId) {
        return next(
            errorHandler(403, "You are not allowed to delete this user")
        );
    }
    try {
        await User.findByIdAndDelete(req.params.userId);
        res.status(200).json({ message: "User deleted" });
    } catch (error) {
        next(error);
    }
};
