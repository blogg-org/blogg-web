import React, { useEffect } from "react";
import { useAppSelector } from "@store/store";
import { useNavigate } from "react-router-dom";
import { getSigninStatus } from "@store/slice/authSlice";
import { useDocumentTitle } from "@hooks/useDocumentTitle";
import { VerifyOTP as VerifyOTPFrom } from "@components/index";

const VerifyOTP: React.FC = () => {
    useDocumentTitle("blogg - Verify OTP");

    const navigate = useNavigate();
    const isSignedIn = useAppSelector(getSigninStatus);

    useEffect(() => {
        if (isSignedIn) {
            navigate("/");
        }
    }, [isSignedIn, navigate]);

    return <VerifyOTPFrom />;
};

export default VerifyOTP;
