import { useEffect } from "react";
import toast from "react-hot-toast";
import { useAppSelector } from "@store/store";
import { useNavigate } from "react-router-dom";
import { AuthStateStatus } from "src/types/auth.types";
import { getPostsError, getPostsMessage } from "@store/slice/blogsSlice";

export const usePostToast = (status: AuthStateStatus, path = "") => {
    const navigate = useNavigate();
    const postsMessage = useAppSelector(getPostsMessage);
    const postsError = useAppSelector(getPostsError);

    useEffect(() => {
        if (status === "succeeded") {
            toast.success(postsMessage, { duration: 5000 });
            if (path) {
                navigate(path);
            }
        } else if (status === "failed") {
            toast.error(postsError, { duration: 5000 });
        }
    }, [postsError, postsMessage, navigate, status, path]);
};
