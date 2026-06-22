import { useNavigate } from "@tanstack/react-router";
import type { UseFormClearErrors, UseFormSetError } from "react-hook-form";
import { toast } from "sonner";

import { ApiError } from "@/utils/apiError";

import type { VerifyCodePayload } from "../types";
import useResendOtp from "./use-resend-otp";
import useVerifyEmail from "./use-verify-email";

type useVerifyEmailFlowProps = {
  email: string;
  setError: UseFormSetError<VerifyCodePayload>;
  clearErrors: UseFormClearErrors<VerifyCodePayload>;
  onResendSuccess: (expiresAt: string) => void;
};

export default function useVerifyEmailFlow({
  email,
  setError,
  clearErrors,
  onResendSuccess,
}: useVerifyEmailFlowProps) {
  const navigate = useNavigate();
  const { verifyEmail, isVerifying } = useVerifyEmail();
  const { resendOtp, isResending } = useResendOtp();
  const handleVerify = async (data: VerifyCodePayload) => {
    clearErrors("otp");
    try {
      await verifyEmail(
        { email, otp: data.otp },
        {
          onSuccess: () => {
            toast.success("Email verified successfully.");
            navigate({ to: "/dashboard", replace: true });
          },
        },
      );
    } catch (error: unknown) {
      if (error instanceof ApiError) {
        const errorData = error.error;
        switch (error.statusCode) {
          case 400:
            setError("otp", {
              type: "server",
              message: errorData.error.otp || "Invalid verification code.",
            });
            break;
          case 429:
            setError("otp", {
              type: "server",
              message: errorData.error.otp,
            });
            break;
          case 500:
            setError("root", {
              type: "server",
              message: "An unexpected error occurred. Please try again.",
            });
            break;
          default:
            break;
        }
      }
    }
  };

  const handleResend = async () => {
    clearErrors("otp");
    try {
      await resendOtp(
        { email, action: "register" },
        {
          onSuccess: (newOtp) => {
            onResendSuccess(newOtp.expiresAt);
            toast.success("Verification code has been resent.");
          },
        },
      );
    } catch (error: unknown) {
      if (error instanceof ApiError) {
        const errorData = error.error;
        switch (error.statusCode) {
          case 400:
            setError("otp", {
              type: "server",
              message: errorData.error.otp,
            });
            break;
          case 500:
            setError("root", {
              type: "server",
              message: "An unexpected error occurred. Please try again.",
            });
            break;
          default:
            break;
        }
      }
    }
  };

  return {
    handleVerify,
    handleResend,
    isLoading: isVerifying || isResending,
    isVerifying,
    isResending,
  };
}
