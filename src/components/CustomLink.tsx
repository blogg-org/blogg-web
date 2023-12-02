import React from "react";
import { Link } from "react-router-dom";

interface ICustomLinkProps {
    to: string;
    className?: string;
    children: React.ReactNode;
}

const CustomLink: React.FC<ICustomLinkProps> = ({
    to,
    className = "",
    children,
    ...props
}: ICustomLinkProps) => {
    return (
        <Link
            to={to}
            className={`font-medium capitalize text-primary text-blue-800 transition-all duration-200 hover:underline ${className}`}
            {...props}
        >
            {children}
        </Link>
    );
};

export default CustomLink;
