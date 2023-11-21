import { useState } from "react";
import toast from "react-hot-toast";
import { useAppDispatch } from "@store/store";
import { signin } from "@store/slice/authSlice";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { ISigninPayload } from "src/types/auth.types";
import { yupResolver } from "@hookform/resolvers/yup";
import { signinSchema } from "@form-validations/signin.schema";
import { Button, ErrorInputMessage, Input, Logo } from "@components/index";

``;
const Login: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { control, handleSubmit } = useForm<ISigninPayload>({
        resolver: yupResolver(signinSchema),
    });
    const [passwordType, setPasswordType] = useState<string>("password");

    const showHidePassword = () => {
        if (passwordType === "password") {
            setPasswordType("text");
        } else {
            setPasswordType("password");
        }
    };

    const handleLogin = async (data: ISigninPayload) => {
        try {
            setIsLoading(true);
            const response = await dispatch(signin(data));
            console.log("\n:: Login.tsx => response: ", response);
            if (response && response.meta.requestStatus === "fulfilled") {
                toast.success(response.payload as string, { duration: 5000 });
                navigate("/");
            } else if (response && response.meta.requestStatus === "rejected") {
                toast.error(response.payload as string, { duration: 5000 });
            }
        } catch (error) {
            console.log("\n:: Signup.tsx => Error: ", error);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className="flex items-center justify-center w-full">
            <div
                className={`mx-auto w-full max-w-lg bg-blue-100 rounded-xl p-10 border border-black/10`}
            >
                <div className="mb-2 flex justify-center">
                    <span className="inline-flex justify-center w-full max-w-[100px]">
                        <Logo />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">
                    Sign in to your account
                </h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary text-blue-800 transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
                <form onSubmit={handleSubmit(handleLogin)} className="mt-8">
                    <div className="space-y-5">
                        <Controller
                            name="email"
                            control={control}
                            defaultValue=""
                            render={({ field, fieldState }) => (
                                <div className="relative">
                                    <Input
                                        label="Email"
                                        type="email"
                                        placeholder="Enter your email"
                                        className={`${
                                            fieldState.error?.message
                                                ? "border-red-800"
                                                : ""
                                        }`}
                                        {...field}
                                    />
                                    {fieldState.error?.message && (
                                        <ErrorInputMessage
                                            message={fieldState.error.message}
                                        />
                                    )}
                                </div>
                            )}
                        />
                        <Controller
                            name="password"
                            control={control}
                            defaultValue=""
                            render={({ field, fieldState }) => (
                                <div className="relative">
                                    <Input
                                        label="Password"
                                        type={passwordType}
                                        placeholder="Enter your password"
                                        className={`${
                                            fieldState.error?.message
                                                ? "border-red-800"
                                                : ""
                                        }`}
                                        {...field}
                                    />
                                    {field.value && (
                                        <div
                                            className="absolute top-12 -translate-y-1/2 right-3 hover:cursor-pointer scale-125"
                                            onClick={showHidePassword}
                                            title={`${
                                                passwordType === "password"
                                                    ? "show"
                                                    : "hide"
                                            } password`}
                                        >
                                            {passwordType === "password" ? (
                                                <LuEye />
                                            ) : (
                                                <LuEyeOff />
                                            )}
                                        </div>
                                    )}
                                    {fieldState.error?.message && (
                                        <ErrorInputMessage
                                            message={fieldState.error.message}
                                        />
                                    )}
                                </div>
                            )}
                        />
                        <Button
                            disabled={isLoading}
                            type="submit"
                            className="w-full hover:bg-blue-700 disabled:bg-blue-400"
                        >
                            {isLoading ? "Signing in..." : "Sign in"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
