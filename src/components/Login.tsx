import { useState } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "@store/store";
import { signin } from "@store/slice/authSlice";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import { ISigninPayload } from "src/types/auth.types";
import { Button, Input, Logo } from "@components/index";
``;
const Login: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [passwordType, setPasswordType] = useState("password");
    const { register, handleSubmit } = useForm<ISigninPayload>();

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
            <div className={`mx-auto w-full max-w-lg bg-blue-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-flex justify-center w-full max-w-[100px]">
                        <Logo />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
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
                        <Input
                            label="Email"
                            type="email"
                            placeholder="enter your email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPatern: (value) =>
                                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                },
                            })}
                        />
                        <div className="relative">
                            <Input
                                label="Password: "
                                type={passwordType}
                                placeholder="Enter your password"
                                {...register("password", {
                                    required: true,
                                })}
                            />
                            <div className="absolute top-10 right-3 hover:cursor-pointer scale-125">
                                {passwordType === "password" ? (
                                    <div onClick={() => setPasswordType("text")} title="show password">
                                        <LuEye />
                                    </div>
                                ) : (
                                    <div onClick={() => setPasswordType("password")} title="hide password">
                                        <LuEyeOff />
                                    </div>
                                )}
                            </div>
                        </div>
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
