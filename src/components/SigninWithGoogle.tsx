import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@components/index";
import { useAppDispatch } from "@store/store";
import { useAuthToast } from "@hooks/useToast";
import { useGoogleLogin } from "@react-oauth/google";
import { AuthStateStatus } from "src/types/auth.types";
import { signinWithGoogle } from "@store/slice/authSlice";

const SigninWithGoogle: React.FC = () => {
    const dispatch = useAppDispatch();
    const [signinWithGoogleStatus, setSigninWithGoogleStatus] =
        useState<AuthStateStatus>("idle");

    const handleSigninWithGoogleButtonClick = useGoogleLogin({
        flow: "auth-code",
        onSuccess: async ({ code }) => {
            setSigninWithGoogleStatus("loading");
            const response = await dispatch(signinWithGoogle(code));
            if (response) {
                if (response.meta.requestStatus === "fulfilled") {
                    setSigninWithGoogleStatus("succeeded");
                } else {
                    setSigninWithGoogleStatus("failed");
                }
            } else {
                setSigninWithGoogleStatus("idle");
            }
        },
    });

    useAuthToast(signinWithGoogleStatus);

    return (
        <Button
            disabled={signinWithGoogleStatus === "loading"}
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
