import React from "react";
import { Signup as SignupComponent } from "@components/index.ts";
import { useDocumentTitle } from "@hooks/useDocumentTitle";

const Signup: React.FC = () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    useDocumentTitle("blogg - Sign up");

    return <SignupComponent />;
};

export default Signup;
