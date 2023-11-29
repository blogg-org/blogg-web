import React from "react";

interface ContainerProps {
    children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
    return (
        <div className="w-full max-w-7xl mx-auto px-4 h-full">{children}</div>
    );
};

export default Container;
