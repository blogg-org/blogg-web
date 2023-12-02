import {
    Logo,
    Input,
    Button,
    GoBackButton,
    ErrorInputMessage,
} from "@components/index";
import React, { useState } from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { useAuthToast } from "@hooks/useAuthToast";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch, useAppSelector } from "@store/store";
import { getVerifiedEmail, resetPassword } from "@store/slice/authSlice";
import { resetPasswordSchema } from "@form-validations/resetPassword.schema";
import { AuthStateStatus, IResetPasswordPayload } from "src/types/auth.types";

const ResetPassword: React.FC = () => {
    const dispatch = useAppDispatch();
    const verifiedEmail = useAppSelector(getVerifiedEmail);
    const [passwordType, setPasswordType] = useState<string>("password");
    const [resetPasswordStatus, setResetPasswordStatus] =
        useState<AuthStateStatus>("idle");
    const { control, handleSubmit } = useForm({
        defaultValues: {
            newPassword: "",
        },
        resolver: yupResolver(resetPasswordSchema),
    });

    const showHidePassword = () => {
        if (passwordType === "password") {
            setPasswordType("text");
        } else {
            setPasswordType("password");
        }
    };

    const handleResetPassword = async (data: IResetPasswordPayload) => {
        setResetPasswordStatus("loading");
        const response = await dispatch(
            resetPassword({ ...data, email: verifiedEmail })
        );
        if (response && response.meta.requestStatus === "fulfilled") {
            setResetPasswordStatus("succeeded");
        } else if (response && response.meta.requestStatus === "rejected") {
            setResetPasswordStatus("failed");
        } else {
            setResetPasswordStatus("idle");
        }
    };

    useAuthToast(resetPasswordStatus, "/auth/signin");

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
                    Reset password
                </h2>

                <form
                    onSubmit={handleSubmit(handleResetPassword)}
                    className="mt-8"
                >
                    <div className="space-y-5">
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
                            disabled={resetPasswordStatus === "loading"}
                            type="submit"
                            className="w-full hover:bg-blue-700 disabled:bg-blue-400"
                        >
                            {resetPasswordStatus === "loading"
                                ? "Submitting..."
                                : "Submit"}
                        </Button>
                    </div>
                </form>
                <div className="w-full mt-4 text-center">
                    <GoBackButton />
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
