import React, { useEffect } from "react";
import { Signup as SignupComponent } from "@components/index";

const Signup: React.FC = () => {
    useEffect(() => {
        document.title = "blogg - Sign up";

        return () => {
            document.title = "blogg";
        };
    }, []);

    return <SignupComponent />;
};

export default Signup;
