import {
    signout,
    currentUser,
    getAuthData,
    getLoginStatus,
} from "@store/slice/authSlice";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
import React, { Fragment, useEffect } from "react";
import { Menu, Transition } from "@headlessui/react";
import defaultUserIcon from "@assets/user-alien.svg";
import { useAppDispatch, useAppSelector } from "@store/store";

interface AvatarProps {
    showLink: boolean;
}

const Avatar: React.FC<AvatarProps> = ({ showLink }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isSignedIn = useAppSelector(getLoginStatus) === "true";
    const authData = useAppSelector(getAuthData);

    const handleChangePasswordButtonClick = () => {
        navigate("/auth/change-password");
    };

    const handleLogout = async () => {
        const response = await dispatch(signout());
        if (response && response.meta.requestStatus === "fulfilled") {
            toast.success(response.payload as string, { duration: 5000 });
        } else if (response && response.meta.requestStatus === "rejected") {
            toast.error(response.payload as string, { duration: 5000 });
        }
    };

    useEffect(() => {
        // IIFE (immediately invoked function expression)
        (async () => {
            if (isSignedIn) {
                await dispatch(currentUser());
            }
        })();
    }, [isSignedIn, dispatch]);

    return (
        <Menu as="div" className="group relative z-50">
            <Menu.Button
                className="flex justify-center items-center rounded-full border-4 border-white group-hover:border-blue-400 transition-colors duration-200 ease-in"
                title="Menu"
            >
                <img
                    src={defaultUserIcon}
                    alt="avatar"
                    width={40}
                    height={40}
                    className="bg-white rounded-full"
                />
            </Menu.Button>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 mt-2 w-max origin-top-right px-4 py-3 bg-blue-200 border-2 border-black/10  rounded-md flex flex-col">
                    {isSignedIn ? (
                        <>
                            <Menu.Item>
                                {() => (
                                    <div className="flex flex-col border-b-2 border-b-black/20 pb-3 mb-3">
                                        <span className="inline-block font-normal truncate text-base">
                                            {authData?.fullname}
                                        </span>
                                        <span className="inline-block font-normal truncate text-base">
                                            {authData?.email}
                                        </span>
                                    </div>
                                )}
                            </Menu.Item>
                            {!showLink ? (
                                <div className=" w-full flex flex-col gap-3 pb-3">
                                    <Menu.Item>
                                        {() => (
                                            <NavLink
                                                to="/all-posts"
                                                className={({ isActive }) =>
                                                    `w-full block p-2 border border-blue-500 hover:bg-blue-500 text-center rounded-md text-base transition-colors duration-200 ease-in disabled:cursor-not-allowed ${
                                                        isActive
                                                            ? "bg-blue-600 font-medium text-blue-950"
                                                            : ""
                                                    }
                                        `
                                                }
                                            >
                                                All Posts
                                            </NavLink>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {() => (
                                            <NavLink
                                                to="/add-post"
                                                className={({ isActive }) =>
                                                    `w-full block p-2 border border-blue-500 hover:bg-blue-500 text-center rounded-md text-base transition-colors duration-200 ease-in disabled:cursor-not-allowed ${
                                                        isActive
                                                            ? "bg-blue-600 font-medium text-blue-950"
                                                            : ""
                                                    }
                                        `
                                                }
                                            >
                                                Add Post
                                            </NavLink>
                                        )}
                                    </Menu.Item>
                                </div>
                            ) : null}
                            {/* change password button */}
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        onClick={
                                            handleChangePasswordButtonClick
                                        }
                                        className={`w-full p-2 border mb-3 border-blue-500 rounded-md text-base transition-colors duration-200 ease-in disabled:cursor-not-allowed ${
                                            active && "bg-blue-500"
                                        }`}
                                    >
                                        Change Password
                                    </button>
                                )}
                            </Menu.Item>

                            {/* sign out button */}
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        onClick={handleLogout}
                                        className={`w-full p-2 border border-blue-500 rounded-md text-base transition-colors duration-200 ease-in disabled:cursor-not-allowed ${
                                            active && "bg-blue-500"
                                        }`}
                                    >
                                        Sign out
                                    </button>
                                )}
                            </Menu.Item>
                        </>
                    ) : (
                        <>
                            <Menu.Item>
                                {() => (
                                    <div className="inline-block">
                                        You are not logged in!
                                    </div>
                                )}
                            </Menu.Item>
                            {!showLink ? (
                                <div className=" w-full flex flex-col gap-3 border-t-2 border-t-black/20 pt-3 mt-2">
                                    <Menu.Item>
                                        {() => (
                                            <NavLink
                                                to="/signin"
                                                className={({ isActive }) =>
                                                    `w-full block p-2 border border-blue-500 hover:bg-blue-500 text-center rounded-md text-base transition-colors duration-200 ease-in disabled:cursor-not-allowed ${
                                                        isActive
                                                            ? "bg-blue-600 font-medium text-blue-950"
                                                            : ""
                                                    }
                                        `
                                                }
                                            >
                                                Sign in
                                            </NavLink>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {() => (
                                            <NavLink
                                                to="/signup"
                                                className={({ isActive }) =>
                                                    `w-full block p-2 border border-blue-500 hover:bg-blue-500 text-center rounded-md text-base transition-colors duration-200 ease-in disabled:cursor-not-allowed ${
                                                        isActive
                                                            ? "bg-blue-600 font-medium text-blue-950"
                                                            : ""
                                                    }
                                        `
                                                }
                                            >
                                                Sign up
                                            </NavLink>
                                        )}
                                    </Menu.Item>
                                </div>
                            ) : null}
                        </>
                    )}
                </Menu.Items>
            </Transition>
        </Menu>
    );
};

export default Avatar;
