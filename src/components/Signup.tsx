import { useState } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "@store/store";
import { signup } from "@store/slice/authSlice";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import { ISignupPayload } from "src/types/auth.types";
import { Button, Input, Logo } from "@components/index";

const Signup: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [passwordType, setPasswordType] = useState("password");
    const { register, handleSubmit } = useForm<ISignupPayload>({
        defaultValues: {
            fullname: "",
            email: "",
            password: "",
        },
    });

    const handleSignup = async (data: ISignupPayload) => {
        try {
            setIsLoading(true);
            const response = await dispatch(signup(data));
            console.log("\n:: Signup.tsx => response: ", response);
            if (response && response.meta.requestStatus === "fulfilled") {
                toast.success(response.payload as string, { duration: 5000 });
                navigate("/signin");
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
        <div className="flex items-center justify-center">
            <div className={`mx-auto w-full max-w-lg bg-blue-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-flex justify-center w-full max-w-[100px]">
                        <Logo />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/signin"
                        className="font-medium text-primary text-blue-800 transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                <form onSubmit={handleSubmit(handleSignup)}>
                    <div className="space-y-5">
                        <Input
                            label="Full Name: "
                            placeholder="Enter your full name"
                            {...register("fullname", {
                                required: true,
                            })}
                        />
                        <Input
                            label="Email: "
                            placeholder="Enter your email"
                            type="email"
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
                            {isLoading ? "Signing up..." : "Sign up"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;
