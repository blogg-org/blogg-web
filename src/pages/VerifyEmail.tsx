import React, { useEffect } from "react";
import { VerifyEmail as VerifyEmailForm } from "@components/index";
import { useDocumentTitle } from "@hooks/useDocumentTitle";
import { useAppDispatch, useAppSelector } from "@store/store";
import { getSigninStatus, resetVerifiedEmail } from "@store/slice/authSlice";
import { useNavigate } from "react-router-dom";

const VerifyEmail: React.FC = () => {
    useDocumentTitle("blogg - Verify Email");

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isSignedIn = useAppSelector(getSigninStatus);

    useEffect(() => {
        dispatch(resetVerifiedEmail());
    }, [dispatch]);

    useEffect(() => {
        if (isSignedIn) {
            navigate("/");
        }
    }, [isSignedIn, navigate]);

    return <VerifyEmailForm />;
};

export default VerifyEmail;
