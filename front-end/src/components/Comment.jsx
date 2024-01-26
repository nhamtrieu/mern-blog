import axios from "axios";
import { useEffect, useState } from "react";
import moment from "moment";

export default function Comment({ comment }) {
    const [user, setUser] = useState({});
    console.log("props comment", comment);
    useEffect(() => {
        const getUser = async () => {
            try {
                const user = await axios.get(`/api/v1/user/${comment.userId}`);
                setUser(user.data);
                console.log(user);
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
            </div>
        </div>
    );
}
