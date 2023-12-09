import { useEffect } from "react";
import toast from "react-hot-toast";
import { useAppSelector } from "@store/store";
import { StateStatus } from "src/types/auth.types";
import { getAuthError, getAuthMessage } from "@store/slice/authSlice";
import { getPostsError, getPostsMessage } from "@store/slice/postsSlice";

export const useAuthToast = (toastStatus: StateStatus) => {
    const authMessage = useAppSelector(getAuthMessage);
    const authError = useAppSelector(getAuthError);

    useEffect(() => {
        if (toastStatus === "succeeded") {
            toast.success(authMessage);
        }
        if (toastStatus === "failed") {
            toast.error(authError);
        }
    }, [toastStatus, authError, authMessage]);
};

export const usePostToast = (toastStatus: StateStatus) => {
    const postMessage = useAppSelector(getPostsMessage);
    const postError = useAppSelector(getPostsError);

    useEffect(() => {
        if (toastStatus === "succeeded") {
            toast.success(postMessage);
        }
        if (toastStatus === "failed") {
            toast.error(postError);
        }
    }, [toastStatus, postError, postMessage]);
};
