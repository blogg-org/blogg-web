import React from "react";
import { Login as LoginComponent } from "@components/index";
import { useDocumentTitle } from "@hooks/useDocumentTitle";

const Login: React.FC = () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    useDocumentTitle("blogg - Sign in");

    return <LoginComponent />;
};

export default Login;
