import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    type?: "button" | "submit" | "reset";
    bgColor?: string;
    textColor?: string;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({
    children,
    type = "button",
    bgColor = "bg-blue-600",
    textColor = "text-white",
    className = "",
    ...props
}) => {
    return (
        <button
            type={type}
            className={`px-4 py-2 rounded-lg transition-colors duration-200 ease-in disabled:cursor-not-allowed ${bgColor} ${textColor} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
