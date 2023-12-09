import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StateStatus } from "src/types/auth.types";

export const useAppNavigate = (
    appNavigateStatus: StateStatus,
    path: string
) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (appNavigateStatus === "succeeded") {
            navigate(path);
        }
    }, [appNavigateStatus, navigate, path]);
};
