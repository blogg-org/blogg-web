import React, { useEffect } from "react";
import { useAppSelector } from "@store/store";
import { getLoginStatus } from "@store/slice/authSlice";
import { useDocumentTitle } from "@hooks/useDocumentTitle";
import { Login as LoginComponent } from "@components/index";
import { Location, useLocation, useNavigate } from "react-router-dom";

interface ILocation extends Location {
    hash: string;
    key: string;
    pathname: string;
    search: string;
    state: null | { from: string };
}

const Login: React.FC = () => {
    useDocumentTitle("blogg - Sign in");

    const navigate = useNavigate();
    const location: ILocation = useLocation();
    const isSignedIn = useAppSelector(getLoginStatus);

    useEffect(() => {
        if (isSignedIn === "true") {
            navigate(location.state?.from ?? "/");
        }
    }, [navigate, isSignedIn, location.state?.from]);

    return <LoginComponent />;
};

export default Login;
