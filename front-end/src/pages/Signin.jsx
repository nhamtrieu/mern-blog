import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import {
    signInFailure,
    signInStart,
    signInSuccess,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

export default function Signin() {
    const [formData, setFormData] = useState({});
    const { loading, error: errorMessages } = useSelector(
        (state) => state.user
    );
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.email || !formData.password) {
            dispatch(signInFailure("Please fill all fields"));
        }
        try {
            dispatch(signInStart());
            const res = await axios.post("/api/v1/auth/sign-in", formData);
            console.log(res.data);
            if (res.data?.success === false) {
                console.log("res.data?.message");
                dispatch(signInFailure(res.data?.message));
            }
            dispatch(signInSuccess(res.data));
            navigate("/");
        } catch (error) {
            dispatch(signInFailure(error.message));
        }
    };

    return (
        <div className=" min-h-screen mt-20">
            <div className="flex max-w-3xl p-3 mx-auto flex-col md:flex-row md:items-center gap-5">
                <div className="flex-1">
                    <Link
                        to={"/"}
                        className="text-4xl font-semibold dark:text-white"
                    >
                        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
                            Nham&apos;s
                        </span>{" "}
                        Blog
                    </Link>
                    <p className=" text-sm mt-5">
                        This is demo project. You can sign in with your email
                        and password or with Google
                    </p>
                </div>
                <div className="flex-1">
                    <form
                        action=""
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-4"
                    >
                        {/* <div>
                            <Label value="Your username" htmlFor="username" />
                            <TextInput
                                type="text"
                                placeholder="Username"
                                id="username"
                                onChange={handleChange}
                            />
                        </div> */}
                        <div>
                            <Label value="Your email" htmlFor="email" />
                            <TextInput
                                type="email"
                                placeholder="Email"
                                id="email"
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <Label value="Your password" htmlFor="password" />
                            <TextInput
                                type="password"
                                placeholder="Password"
                                id="password"
                                onChange={handleChange}
                            />
                        </div>
                        <Button
                            gradientDuoTone={"purpleToPink"}
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Spinner size={"sm"} />{" "}
                                    <span className="pl-3">Loading...</span>
                                </>
                            ) : (
                                "Sign In"
                            )}
                        </Button>
                        <OAuth />
                    </form>
                    <div className="flex gap-2 text-sm mt-5">
                        <span>Don&apos;t Have an account</span>
                        <Link to={"/sign-up"} className="text-blue-500">
                            Sign Up
                        </Link>
                    </div>
                    {errorMessages && (
                        <Alert className="mt-5" color={"failure"}>
                            {errorMessages}
                        </Alert>
                    )}
                </div>
            </div>
        </div>
    );
}
