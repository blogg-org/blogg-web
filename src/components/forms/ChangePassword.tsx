import React, { useState } from "react";
import { useAppDispatch } from "@store/store";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { useAuthToast } from "@hooks/useAuthToast";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { changePassword } from "@store/slice/authSlice";
import { Logo, Input, Button, ErrorInputMessage } from "@components/index";
import { AuthStateStatus, IChangePasswordPayload } from "src/types/auth.types";
import { changePasswordSchema } from "@form-validations/changePassword.schema";

const ChangePassword: React.FC = () => {
    const dispatch = useAppDispatch();
    const [changePasswordStatus, setChangePasswordStatus] =
        useState<AuthStateStatus>("idle");
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
        setChangePasswordStatus("loading");
        const response = await dispatch(changePassword(data));
        if (response && response.meta.requestStatus === "fulfilled") {
            setChangePasswordStatus("succeeded");
        } else if (response && response.meta.requestStatus === "rejected") {
            setChangePasswordStatus("failed");
        }
    };

    useAuthToast(changePasswordStatus, "/");

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
                                        placeholder="Enter new password"
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
                            disabled={changePasswordStatus === "loading"}
                            type="submit"
                            bgColor="bg-green-500"
                            className="w-full hover:bg-green-600 disabled:bg-green-400"
                        >
                            {changePasswordStatus === "loading"
                                ? "Updating..."
                                : "Update"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChangePassword;
