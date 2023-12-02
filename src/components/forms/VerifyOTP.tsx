import OTPInput from "react-otp-input";
import { useAppDispatch } from "@store/store";
import { verifyOTP } from "@store/slice/authSlice";
import React, { FormEvent, useState } from "react";
import { useAuthToast } from "@hooks/useAuthToast";
import { AuthStateStatus } from "src/types/auth.types";
import { Button, GoBackButton, Logo } from "@components/index";

const VerifyOTP: React.FC = () => {
    const dispatch = useAppDispatch();
    const [otp, setOtp] = useState("");
    const [isInputError, setIsInputError] = useState<boolean>(false);
    const [verifyOTPStatus, setVerifyOTPStatus] =
        useState<AuthStateStatus>("idle");

    const handleVerifyOTP = async (event: FormEvent) => {
        event.preventDefault();
        setVerifyOTPStatus("loading");
        try {
            if (!otp) {
                setIsInputError(true);
                setVerifyOTPStatus("idle");
            } else {
                const response = await dispatch(verifyOTP(otp));
                if (response && response.meta.requestStatus === "fulfilled") {
                    setOtp("");
                    setVerifyOTPStatus("succeeded");
                } else if (
                    response &&
                    response.meta.requestStatus === "rejected"
                ) {
                    setIsInputError(true);
                    setVerifyOTPStatus("failed");
                }
            }
        } catch (error) {
            setVerifyOTPStatus("idle");
        }
    };

    useAuthToast(verifyOTPStatus, "/auth/reset-password");

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
                    Verify OTP
                </h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Enter OTP recently sent to your email.
                </p>
                <form onSubmit={handleVerifyOTP} className="mt-8">
                    <div className="space-y-5 ">
                        <OTPInput
                            value={otp}
                            onChange={setOtp}
                            numInputs={4}
                            shouldAutoFocus={true}
                            renderInput={(props) => (
                                <input {...props} style={{ width: "48px" }} />
                            )}
                            containerStyle=" flex flex-row items-center justify-center gap-6 w-full"
                            inputStyle={`rounded-lg bg-white text-black outline-none duration-200 border-2 h-12 inline-block focus:border-blue-500 focus:bg-gray-100 text-center text-lg ${
                                isInputError
                                    ? "border-red-300"
                                    : "border-blue-300"
                            }`}
                        />
                        <Button
                            disabled={verifyOTPStatus === "loading"}
                            type="submit"
                            className="w-full hover:bg-blue-700 disabled:bg-blue-400"
                        >
                            {verifyOTPStatus === "loading"
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

export default VerifyOTP;
