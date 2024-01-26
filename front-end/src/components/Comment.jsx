import axios from "axios";
import { useEffect, useState } from "react";
import moment from "moment";

import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function Comment({ comment, onLike }) {
    const { currentUser } = useSelector((state) => state.user);
    const [user, setUser] = useState({});
    useEffect(() => {
        const getUser = async () => {
            try {
                const user = await axios.get(`/api/v1/user/${comment.userId}`);
                setUser(user.data);
            } catch (error) {
                setUser({});
                console.log(error);
            }
        };
        getUser();
    }, [comment.userId]);
    return (
        <div className="flex p-4 border-b dark:border-gray-600 text-sm">
            <div className="mr-3 flex-shrink-0">
                <img
                    src={user.profilePicture}
                    alt="user"
                    className="w-10 h-10 rounded-full bg-gray-200"
                />
            </div>
            <div>
                <div className="flex items-center mb-1">
                    <span className="mr-1 font-bold text-xs truncate">
                        {user ? `@${user.username}` : "anonimous user"}
                    </span>
                    <span className="text-gray-500 text-xs">
                        {moment(comment.createdAd).fromNow()}
                    </span>
                </div>
                <p className="pb-2 text-gray-500">{comment.content}</p>
                <div className="flex items-center pt-2 text-xs border-t dark:border-t-gray-700 max-w-fit gap-2">
                    <button
                        type="button"
                        className={`text-gray-400 hover:text-blue-500 ${
                            currentUser &&
                            comment.likes.includes(currentUser._id) &&
                            "!text-blue-500"
                        }`}
                        onClick={() => onLike(comment._id)}
                    >
                        <FaThumbsUp />
                    </button>
                    <p className="text-gray-400">
                        {comment.numberOfLikes > 0 &&
                            comment.numberOfLikes +
                                " " +
                                (comment.numberOfLikes === 1
                                    ? "like"
                                    : "likes")}
                    </p>
                </div>
            </div>
        </div>
    );
}
