import { useNavigate } from "@tanstack/react-router";
import type { UseFormClearErrors, UseFormSetError } from "react-hook-form";
import { toast } from "sonner";

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
      const response = await verifyEmail({ email, otp: data.otp });
      if (response.status === "success") {
        toast.success("Email verified successfully.");
        navigate({ to: "/dashboard", replace: true });
      } else if (response.status === "fail") {
        setError("otp", {
          type: "server",
          message: response.details.otp || "Invalid verification code.",
        });
      }
    } catch {
      setError("otp", {
        type: "server",
        message: "An unexpected error occurred. Please try again.",
      });
    }
  };

  const handleResend = async () => {
    clearErrors("otp");
    try {
      const response = await resendOtp({ email, action: "register" });
      if (response.status === "success") {
        onResendSuccess(response.data.otp.expiresAt);
        toast.success("Verification code has been resent.");
      } else if (response.status === "fail") {
        setError("otp", {
          type: "server",
          message:
            response.details.otp || "Failed to resend verification code.",
        });
      }
    } catch {
      setError("otp", {
        type: "server",
        message: "An unexpected error occurred. Please try again.",
      });
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
