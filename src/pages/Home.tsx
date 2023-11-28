import React from "react";
import { Link } from "react-router-dom";
import { Posts } from "@components/index";
import { useAppSelector } from "@store/store";
import { getLoginStatus } from "@store/slice/authSlice";

const Home: React.FC = () => {
    const isLoggedIn = useAppSelector(getLoginStatus);

    if (isLoggedIn === "false") {
        return (
            <div className="flex flex-wrap">
                <div className="p-2 w-full flex flex-col items-center">
                    <h1 className="text-2xl font-bold">
                        You are not logged in. Login to read posts.
                    </h1>
                    <Link
                        to="/signin"
                        className="block mt-6 text-lg bg-blue-400 w-max py-4 px-6 rounded-md hover:bg-blue-500 duration-200 ease-out"
                    >
                        Login
                    </Link>
                </div>
            </div>
        );
    } else if (isLoggedIn === "true") {
        return <Posts />;
    }
};

export default Home;
