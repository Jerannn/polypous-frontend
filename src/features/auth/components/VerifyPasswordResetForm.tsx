import { zodResolver } from "@hookform/resolvers/zod";
import { getRouteApi, useNavigate } from "@tanstack/react-router";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { ChevronLeft } from "lucide-react";
import { Controller, useForm } from "react-hook-form";

import ActionButtonContent from "@/components/ActionButtonContent";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import useVerifyPasswordReset from "../hooks/use-verify-password-reset";
import { verifyPasswordResetSchema } from "../schema";
import type { VerifyPasswordResetPayload } from "../types";
import { ApiError } from "@/utils/apiError";

const routeApi = getRouteApi("/(public)/auth/forgot-password/verify");

export default function VerifyPasswordResetForm() {
  const { email } = routeApi.useSearch();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<VerifyPasswordResetPayload>({
    resolver: zodResolver(verifyPasswordResetSchema),
    defaultValues: {
      email: email ?? "",
      otp: "",
    },
  });

  const { verifyPasswordReset, isVerifying } = useVerifyPasswordReset();

  const onSubmit = async (data: VerifyPasswordResetPayload) => {
    try {
      const token = await verifyPasswordReset(data);

      navigate({
        to: "/auth/forgot-password/reset",
        search: { token },
      });
    } catch (error) {
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
              message: "Too many requests. Try again later.",
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

  return (
    <div className="max-w-lg w-full mx-auto mt-10">
      <Button
        variant="link"
        className="-ml-3"
        onClick={() => navigate({ to: "/auth/forgot-password" })}
      >
        <ChevronLeft />
        Back
      </Button>
      <h1 className="text-xl font-bold mb-5">
        Verify your One-Time Password (OTP)
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="verify-code">
              Enter verification code
            </FieldLabel>
            <Controller
              name="otp"
              control={control}
              render={({ field }) => (
                <InputOTP
                  maxLength={6}
                  id="verify-code"
                  className="w-full"
                  containerClassName="justify-center"
                  pattern={REGEXP_ONLY_DIGITS}
                  disabled={isVerifying}
                  value={field.value}
                  onChange={(val) => {
                    field.onChange(val);

                    // Auto-submit form when all 6 slots are completed
                    if (val.length === 6) {
                      handleSubmit(onSubmit)();
                    }
                  }}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              )}
            />

            {errors.otp && (
              <FieldError className="text-center">
                {errors.otp.message}
              </FieldError>
            )}
          </Field>

          <Button type="submit" disabled={isVerifying}>
            <ActionButtonContent
              action={isVerifying ? "Loading..." : "Continue"}
              isLoading={isVerifying}
            />
          </Button>
        </FieldGroup>
      </form>
    </div>
  );
}
