import React, { useEffect } from "react";
import { VerifyOTP as VerifyOTPFrom } from "@components/index";
import { useDocumentTitle } from "@hooks/useDocumentTitle";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@store/store";
import { getSigninStatus } from "@store/slice/authSlice";

const VerifyOTP: React.FC = () => {
    useDocumentTitle("blogg - Verify OTP");

    const navigate = useNavigate();
    const isSignedIn = useAppSelector(getSigninStatus) === "true";

    useEffect(() => {
        if (isSignedIn) {
            navigate("/");
        }
    }, [isSignedIn, navigate]);

    return <VerifyOTPFrom />;
};

export default VerifyOTP;
