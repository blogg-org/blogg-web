import React, { useEffect } from "react";
import { Login as LoginComponent } from "@components/index";

const Login: React.FC = () => {
    useEffect(() => {
        document.title = "blogg - Sign in";

        return () => {
            document.title = "blogg";
        };
    }, []);

    return <LoginComponent />;
};

export default Login;
