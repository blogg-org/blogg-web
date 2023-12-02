import React from "react";
import { useNavigate } from "react-router-dom";

const GoBackButton: React.FC = () => {
    const navigate = useNavigate();

    const handleGoBackButtonClick = () => {
        if (history.state !== null) {
            navigate(-1);
        } else {
            navigate("/");
        }
    };
    return (
        <button
            type="button"
            className="font-medium capitalize text-primary text-blue-800 transition-all duration-200 hover:underline"
            onClick={handleGoBackButtonClick}
        >
            Go back
        </button>
    );
};

export default GoBackButton;
