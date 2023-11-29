import React, { useEffect } from "react";
import { useAppSelector } from "@store/store";
import { getLoginStatus } from "@store/slice/authSlice";
import { useDocumentTitle } from "@hooks/useDocumentTitle";
import { Signup as SignupComponent } from "@components/index.ts";
import { Location, useLocation, useNavigate } from "react-router-dom";

interface ILocation extends Location {
    hash: string;
    key: string;
    pathname: string;
    search: string;
    state: null | { from: string };
}

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
