import React, { useEffect } from "react";
import { useAppSelector } from "@store/store";
import { ILocation } from "src/types/auth.types";
import { getSigninStatus } from "@store/slice/authSlice";
import { Signin as SigninForm } from "@components/index";
import { useDocumentTitle } from "@hooks/useDocumentTitle";
import { useLocation, useNavigate } from "react-router-dom";

const Login: React.FC = () => {
    useDocumentTitle("blogg - Sign in");

    const navigate = useNavigate();
    const location: ILocation = useLocation();
    const isSignedIn = useAppSelector(getSigninStatus);

    useEffect(() => {
        if (isSignedIn === "true") {
            navigate(location.state?.from ?? "/");
        }
    }, [navigate, isSignedIn, location.state?.from]);

    return <SigninForm />;
};

export default Login;
