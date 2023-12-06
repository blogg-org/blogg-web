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
import { useNavigate } from "react-router-dom";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch, useAppSelector } from "@store/store";
import { signupSchema } from "@form-validations/signup.schema";
import { AuthStateStatus, ISignupPayload } from "src/types/auth.types";
import { getAuthError, getAuthMessage, signup } from "@store/slice/authSlice";

const Signup: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const authMessage = useAppSelector(getAuthMessage);
    const authError = useAppSelector(getAuthError);
    const [signupStatus, setSignupStatus] = useState<AuthStateStatus>("idle");
    const { control, handleSubmit } = useForm<ISignupPayload>({
        defaultValues: {
            fullname: "",
            email: "",
            password: "",
        },
        resolver: yupResolver(signupSchema),
    });
    const [passwordType, setPasswordType] = useState<string>("password");

    const showHidePassword = () => {
        if (passwordType === "password") {
            setPasswordType("text");
        } else {
            setPasswordType("password");
        }
    };

    const handleSignup = async (data: ISignupPayload) => {
        setSignupStatus("loading");
        const response = await dispatch(signup(data));
        if (response) {
            if (response.meta.requestStatus === "fulfilled") {
                setSignupStatus("succeeded");
            } else {
                setSignupStatus("failed");
            }
        } else {
            setSignupStatus("idle");
        }
    };

    useEffect(() => {
        if (signupStatus === "succeeded") {
            toast.success(authMessage);
            navigate("/auth/signin");
        }
        if (signupStatus === "failed") {
            toast.error(authError);
        }
    }, [signupStatus, navigate, authError, authMessage]);

    return (
        <div className="flex items-center justify-center">
            <div
                className={`mx-auto w-full max-w-lg bg-blue-100 rounded-xl p-10 border border-black/10`}
            >
                <div className="mb-2 flex justify-center">
                    <span className="inline-flex justify-center w-full max-w-[100px]">
                        <Logo />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">
                    Sign up to create account
                </h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <CustomLink to="/auth/signin">Sign in</CustomLink>
                </p>
                <div className="w-full flex justify-center mt-6">
                    <SigninWithGoogle />
                </div>
                <div className="w-full text-center text-lg font-medium text-blue-950 mt-6">
                    -OR-
                </div>
                <form onSubmit={handleSubmit(handleSignup)} className="mt-2">
                    <div className="space-y-5">
                        {/* fullname */}
                        <Controller
                            name="fullname"
                            control={control}
                            defaultValue=""
                            render={({ field, fieldState }) => (
                                <div className="relative">
                                    <Input
                                        label="Fullname"
                                        type="fullname"
                                        placeholder="Enter your fullname"
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

                        {/* email */}
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

                        {/* password */}
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
                            disabled={signupStatus === "loading"}
                            type="submit"
                            className="w-full hover:bg-blue-700 disabled:bg-blue-400"
                        >
                            {signupStatus === "loading"
                                ? "Signing up..."
                                : "Sign up"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;
