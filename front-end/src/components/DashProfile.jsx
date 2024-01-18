import { Button, TextInput } from "flowbite-react";
import { useSelector } from "react-redux";

export default function DashProfile() {
    const currentUser = useSelector((state) => state.user.currentUser);
    return (
        <div className=" max-w-lg mx-auto p-3 w-full">
            <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
            <form action="" className="flex flex-col gap-4">
                <div className="w-32 h-32 self-center cursor-pointer shadow-sm rounded-full">
                    <img
                        src={currentUser.profilePicture}
                        alt="user"
                        className=" rounded-full w-full h-full object-cover border-8 border-[lightgray]"
                    />
                </div>
                <TextInput
                    type="text"
                    id="username"
                    placeholder="username"
                    defaultValue={currentUser.username}
                />
                <TextInput
                    type="email"
                    id="email"
                    placeholder="email"
                    defaultValue={currentUser.email}
                />
                <TextInput
                    type="password"
                    id="password"
                    placeholder="password"
                />
                <Button type="submit" gradientDuoTone={"purpleToBlue"} outline>
                    Update
                </Button>
            </form>
            <div className="flex text-red-500 justify-between">
                <span className="cursor-pointer">Delete Account</span>
                <span className="cursor-pointer">Sign Out</span>
            </div>
        </div>
    );
}
