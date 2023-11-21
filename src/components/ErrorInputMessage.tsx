import React from "react";

interface ErrorInputMessageProps {
    message: string;
}

const ErrorInputMessage: React.FC<ErrorInputMessageProps> = ({ message }) => {
    return (
        <p className=" text-base font-normal text-red-800 first-letter:capitalize pl-1">
            {message}
        </p>
    );
};

export default ErrorInputMessage;
