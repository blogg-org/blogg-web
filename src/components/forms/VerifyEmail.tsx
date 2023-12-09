import {
    Logo,
    Input,
    Button,
    GoBackButton,
    ErrorInputMessage,
} from "@components/index";
import React, { useState } from "react";
import { useAppDispatch } from "@store/store";
import { useAuthToast } from "@hooks/useToast";
import { verifyEmail } from "@store/slice/authSlice";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppNavigate } from "@hooks/useAppNavigate";
import { verifyEmailSchema } from "@form-validations/verifyEmail.schema";
import { AuthStateStatus, IVerifyEmailPayload } from "src/types/auth.types";

const VerifyEmail: React.FC = () => {
    const dispatch = useAppDispatch();
    const [verifyEmailStatus, setVerifyEmailStatus] =
        useState<AuthStateStatus>("idle");
    const { control, handleSubmit } = useForm<IVerifyEmailPayload>({
        defaultValues: {
            email: "",
        },
        resolver: yupResolver(verifyEmailSchema),
    });

    const handleVerifyEmail = async (data: IVerifyEmailPayload) => {
        setVerifyEmailStatus("loading");
        const response = await dispatch(verifyEmail(data));
        if (response) {
            if (response.meta.requestStatus === "fulfilled") {
                setVerifyEmailStatus("succeeded");
            } else {
                setVerifyEmailStatus("failed");
            }
        } else {
            setVerifyEmailStatus("idle");
        }
    };

    useAuthToast(verifyEmailStatus);
    useAppNavigate(verifyEmailStatus, "/auth/verify-otp");

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
                    Verify email
                </h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Enter an email associated with this account
                </p>
                <form
                    onSubmit={handleSubmit(handleVerifyEmail)}
                    className="mt-8"
                >
                    <div className="space-y-5">
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
                        <Button
                            disabled={verifyEmailStatus === "loading"}
                            type="submit"
                            className="w-full hover:bg-blue-700 disabled:bg-blue-400"
                        >
                            {verifyEmailStatus === "loading"
                                ? "Verifying..."
                                : "Verify"}
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

export default VerifyEmail;
