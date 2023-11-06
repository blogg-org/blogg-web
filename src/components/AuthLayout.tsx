import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

interface AuthLayoutProps {
    children: React.ReactNode;
    authentication?: boolean;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, authentication = true }) => {
    const navigate = useNavigate();
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

    useEffect(() => {
        if (authentication && isUserLoggedIn !== authentication) {
            navigate("/login");
        } else if (!authentication && isUserLoggedIn !== authentication) {
            navigate("/");
        }
    }, [authentication, isUserLoggedIn, navigate]);
    return <>{children}</>;
};

export default AuthLayout;
