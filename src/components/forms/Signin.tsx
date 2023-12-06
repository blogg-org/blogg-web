import {
    Logo,
    Input,
    Button,
    CustomLink,
    ErrorInputMessage,
    SigninWithGoogle,
} from "@components/index";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch, useAppSelector } from "@store/store";
import { signinSchema } from "@form-validations/signin.schema";
import { AuthStateStatus, ISigninPayload } from "src/types/auth.types";
import { getAuthError, getAuthMessage, signin } from "@store/slice/authSlice";

const Signin: React.FC = () => {
    const dispatch = useAppDispatch();
    const authMessage = useAppSelector(getAuthMessage);
    const authError = useAppSelector(getAuthError);
    const [signinStatus, setSigninStatus] = useState<AuthStateStatus>("idle");
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
        setSigninStatus("loading");
        const response = await dispatch(signin(data));
        if (response) {
            if (response.meta.requestStatus === "fulfilled") {
                setSigninStatus("succeeded");
            } else {
                setSigninStatus("failed");
            }
        } else {
            setSigninStatus("idle");
        }
    };

    useEffect(() => {
        if (signinStatus === "succeeded") {
            toast.success(authMessage);
        }
        if (signinStatus === "failed") {
            toast.error(authError);
        }
        setSigninStatus("idle");
    }, [signinStatus, authError, authMessage]);

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
                    <span>Don&apos;t have any account?&nbsp;</span>
                    <CustomLink to="/auth/signup">Sign up</CustomLink>
                </p>
                <div className="w-full flex justify-center mt-6">
                    <SigninWithGoogle />
                </div>
                <div className="w-full text-center text-lg font-medium text-blue-950 mt-6">
                    -OR-
                </div>
                <form onSubmit={handleSubmit(handleLogin)} className="mt-6">
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
                                                <LuEyeOff />
                                            ) : (
                                                <LuEye />
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
                            disabled={signinStatus === "loading"}
                            type="submit"
                            className="w-full hover:bg-blue-700 disabled:bg-blue-400"
                        >
                            {signinStatus === "loading"
                                ? "Signing in..."
                                : "Sign in"}
                        </Button>
                    </div>
                </form>
                <div className="w-full text-center mt-4">
                    <CustomLink to="/auth/verify-email">
                        Forgot Password?
                    </CustomLink>
                </div>
            </div>
        </div>
    );
};

export default Signin;
