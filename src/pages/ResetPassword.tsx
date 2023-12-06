import React, { useEffect } from "react";
import { useAppSelector } from "@store/store";
import { useNavigate } from "react-router-dom";
import { getSigninStatus } from "@store/slice/authSlice";
import { useDocumentTitle } from "@hooks/useDocumentTitle";
import { ResetPassword as ResetPasswordForm } from "@components/index";

const ResetPassword: React.FC = () => {
    useDocumentTitle("blogg - Reset Password");

    const navigate = useNavigate();
    const isSignedIn = useAppSelector(getSigninStatus);

    useEffect(() => {
        if (isSignedIn) {
            navigate("/");
        }
    }, [isSignedIn, navigate]);

    return <ResetPasswordForm />;
};

export default ResetPassword;
