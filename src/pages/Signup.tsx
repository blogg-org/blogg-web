import React, { useEffect } from "react";
import { useAppSelector } from "@store/store";
import { ILocation } from "src/types/auth.types";
import { getLoginStatus } from "@store/slice/authSlice";
import { useDocumentTitle } from "@hooks/useDocumentTitle";
import { useLocation, useNavigate } from "react-router-dom";
import { Signup as SignupComponent } from "@components/index.ts";

const Signup: React.FC = () => {
    useDocumentTitle("blogg - Sign up");

    const navigate = useNavigate();
    const location: ILocation = useLocation();
    const isSignedIn = useAppSelector(getLoginStatus);

    useEffect(() => {
        if (isSignedIn === "true") {
            navigate(location.state?.from ?? "/");
        }
    }, [navigate, isSignedIn, location.state?.from]);

    return <SignupComponent />;
};

export default Signup;
