import React from "react";
import { useDocumentTitle } from "@hooks/useDocumentTitle";
import { ChangePassword as ChangePasswordForm } from "@components/index";

const ChangePassword: React.FC = () => {
    useDocumentTitle("blogg - Change Password");

    return <ChangePasswordForm />;
};

export default ChangePassword;
