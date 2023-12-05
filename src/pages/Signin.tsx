import React, { useEffect } from "react";
import { useAppSelector } from "@store/store";
import { getSigninStatus } from "@store/slice/authSlice";
import { useDocumentTitle } from "@hooks/useDocumentTitle";
import { Signin as SigninForm } from "@components/index";
import { useLocation, useNavigate } from "react-router-dom";
import { ILocation } from "src/types/auth.types";

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
