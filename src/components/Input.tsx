import React, {
    HTMLInputTypeAttribute,
    InputHTMLAttributes,
    useId,
} from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    type?: HTMLInputTypeAttribute;
    className?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ label, type = "text", className = "", ...props }, ref) => {
        const id = useId();

        return (
            <div className="w-full">
                {label && (
                    <label
                        htmlFor={id}
                        className="inline-block mb-1 pl-1 capitalize"
                    >
                        {label}
                    </label>
                )}
                <input
                    id={id}
                    ref={ref}
                    type={type}
                    className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
                    {...props}
                />
            </div>
        );
    }
);

Input.displayName = "Input";

export default Input;
