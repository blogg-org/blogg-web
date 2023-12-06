import { useEffect } from "react";
import { useAppSelector } from "@store/store";
import { getSigninStatus } from "@store/slice/authSlice";
import { useLocation, useNavigate } from "react-router-dom";

interface AuthLayoutProps {
    children: React.ReactNode;
    isAuthor?: boolean;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
    children,
}: AuthLayoutProps) => {
    const navigate = useNavigate();
    const location = useLocation();
    const isSignedIn = useAppSelector(getSigninStatus);

    useEffect(() => {
        if (!isSignedIn) {
            navigate("/auth/signin", { state: { from: location.pathname } });
        }
    }, [navigate, isSignedIn, location.pathname]);

    return <>{children}</>;
};

export default AuthLayout;
