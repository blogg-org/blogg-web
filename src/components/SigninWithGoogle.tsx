import React, { useEffect, useState } from "react";
import { Button } from "@components/index";
import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import { useAppDispatch, useAppSelector } from "@store/store";
import {
    getAuthError,
    getAuthMessage,
    signinWithGoogle,
} from "@store/slice/authSlice";
import { AuthStateStatus } from "src/types/auth.types";
import toast from "react-hot-toast";

const SigninWithGoogle: React.FC = () => {
    const dispatch = useAppDispatch();
    const authMessage = useAppSelector(getAuthMessage);
    const authError = useAppSelector(getAuthError);
    const [signinWithGoogleStatus, setSigninWithGoogleStatus] =
        useState<AuthStateStatus>("idle");

    const handleSigninWithGoogleButtonClick = useGoogleLogin({
        flow: "auth-code",
        onSuccess: async ({ code }) => {
            setSigninWithGoogleStatus("loading");
            const response = await dispatch(signinWithGoogle(code));
            if (response && response.meta.requestStatus === "fulfilled") {
                setSigninWithGoogleStatus("succeeded");
            } else if (response && response.meta.requestStatus === "rejected") {
                setSigninWithGoogleStatus("failed");
            } else {
                setSigninWithGoogleStatus("idle");
            }
        },
    });

    useEffect(() => {
        if (signinWithGoogleStatus === "succeeded") {
            toast.success(authMessage);
        }
        if (signinWithGoogleStatus == "failed") {
            toast.error(authError);
        }
    }, [authError, authMessage, signinWithGoogleStatus]);

    return (
        <Button
            onClick={handleSigninWithGoogleButtonClick}
            bgColor="bg-blue-100 hover:bg-blue-300"
            textColor="text-blue-800 hover:text-blue-950"
            className=" border-2 border-blue-500 hover:border-blue-700 text-base whitespace-nowrap px-6"
        >
            <div className="flex items-center gap-3">
                <div className="scale-150">
                    <FcGoogle />
                </div>
                <span>Sign in with Google</span>
            </div>
        </Button>
    );
};

export default SigninWithGoogle;
