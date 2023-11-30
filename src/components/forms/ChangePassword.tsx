import React, { useState } from "react";
import { Button, ErrorInputMessage, Input, Logo } from "@components/index";
import { Controller, useForm } from "react-hook-form";
import { LuEye, LuEyeOff } from "react-icons/lu";
import toast from "react-hot-toast";
import { useAppDispatch } from "@store/store";
import { IChangePasswordPayload } from "src/types/auth.types";
import { yupResolver } from "@hookform/resolvers/yup";
import { changePasswordSchema } from "@form-validations/changePassword.schema";
import { changePassword } from "@store/slice/authSlice";
import { useNavigate } from "react-router-dom";

const ChangePassword: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { control, handleSubmit } = useForm<IChangePasswordPayload>({
        defaultValues: {
            oldPassword: "",
            newPassword: "",
        },
        resolver: yupResolver(changePasswordSchema),
    });
    const [passwordType, setPasswordType] = useState<string>("password");

    const showHidePassword = () => {
        if (passwordType === "password") {
            setPasswordType("text");
        } else {
            setPasswordType("password");
        }
    };

    const handleChangePassword = async (data: IChangePasswordPayload) => {
        try {
            setIsLoading(true);
            const response = await dispatch(changePassword(data));
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
                    Change Password
                </h2>

                <form
                    onSubmit={handleSubmit(handleChangePassword)}
                    className="mt-8"
                >
                    <div className="space-y-5">
                        {/* recent password */}
                        <Controller
                            name="oldPassword"
                            control={control}
                            defaultValue=""
                            render={({ field, fieldState }) => (
                                <div className="relative">
                                    <Input
                                        label="Recent Password"
                                        type={passwordType}
                                        placeholder="your recent password"
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
                        {/* new password */}
                        <Controller
                            name="newPassword"
                            control={control}
                            defaultValue=""
                            render={({ field, fieldState }) => (
                                <div className="relative">
                                    <Input
                                        label="New Password"
                                        type={passwordType}
                                        placeholder="your new password"
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
                            disabled={isLoading}
                            type="submit"
                            bgColor="bg-green-500"
                            className="w-full hover:bg-green-600 disabled:bg-green-400"
                        >
                            {isLoading ? "Updating..." : "Update"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChangePassword;
