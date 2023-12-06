import React from "react";
import { Link } from "react-router-dom";
import { Posts } from "@components/index";
import { useAppSelector } from "@store/store";
import { getSigninStatus } from "@store/slice/authSlice";

const Home: React.FC = () => {
    const isSignedIn = useAppSelector(getSigninStatus);

    if (!isSignedIn) {
        return (
            <div className="flex flex-wrap">
                <div className="p-2 w-full flex flex-col items-center">
                    <h1 className="text-2xl font-bold">
                        You are not signed in. Sign in to read posts.
                    </h1>
                    <Link
                        to="/auth/signin"
                        className="block mt-6 text-lg bg-blue-400 w-max py-4 px-6 rounded-md hover:bg-blue-500 duration-200 ease-out"
                    >
                        Sign in
                    </Link>
                </div>
            </div>
        );
    } else {
        return <Posts />;
    }
};

export default Home;
