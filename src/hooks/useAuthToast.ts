import { useEffect } from "react";
import toast from "react-hot-toast";
import { useAppSelector } from "@store/store";
import { AuthStateStatus } from "src/types/auth.types";
import { getAuthError, getAuthMessage } from "@store/slice/authSlice";

export const useAuthToast = (status: AuthStateStatus, path = "") => {
    const authMessage = useAppSelector(getAuthMessage);
    const authError = useAppSelector(getAuthError);
    console.log(path);
    useEffect(() => {
        if (status === "succeeded") {
            toast.success(authMessage);
        } else if (status === "failed") {
            toast.error(authError);
        }
    }, [authError, authMessage, status]);
};
