import { useEffect } from "react";
import toast from "react-hot-toast";
import { useAppSelector } from "@store/store";
import { useNavigate } from "react-router-dom";
import { AuthStateStatus } from "src/types/auth.types";
import { getAuthError, getAuthMessage } from "@store/slice/authSlice";

export const useAuthToast = (status: AuthStateStatus, path = "") => {
    const navigate = useNavigate();
    const authMessage = useAppSelector(getAuthMessage);
    const authError = useAppSelector(getAuthError);

    useEffect(() => {
        if (status === "succeeded") {
            toast.success(authMessage, { duration: 5000 });
            if (path) {
                navigate(path);
            }
        } else if (status === "failed") {
            toast.error(authError, { duration: 5000 });
        }
    }, [authError, authMessage, navigate, status, path]);
};
