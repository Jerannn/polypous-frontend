import { zodResolver } from "@hookform/resolvers/zod";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getRouteApi, useNavigate } from "@tanstack/react-router";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { ArrowLeft, Mail } from "lucide-react";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

import ActionButtonContent from "@/components/ActionButtonContent";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import useOtpTimer from "@/features/auth/hooks/use-otp-timer";
import useVerifyEmailFlow from "@/features/auth/hooks/use-verify-email-flow";
import { verifyCodeSchema } from "@/features/auth/schema";
import type { VerifyCodePayload } from "@/features/auth/types";
import { otpQueryOptions } from "@/routes/(public)/auth/verify-email";

const routeApi = getRouteApi("/(public)/auth/verify-email/");

export default function VerifyEmailCard() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<VerifyCodePayload>({
    resolver: zodResolver(verifyCodeSchema),
    defaultValues: { otp: "" },
    reValidateMode: "onSubmit",
  });
  const navigate = useNavigate();
  const { email } = routeApi.useSearch();
  const { data: otpData } = useSuspenseQuery(
    otpQueryOptions(email, "register"),
  );
  const initialExpiry =
    otpData?.status === "success" ? otpData.data.otp.expiresAt : null;
  const { countdown, setExpiresAt, isTimerActive } = useOtpTimer(initialExpiry);

  useEffect(() => {
    if (otpData?.status === "success") {
      setExpiresAt(otpData.data.otp.expiresAt);
    }
  }, [otpData, setExpiresAt]);

  const { handleVerify, handleResend, isLoading, isVerifying, isResending } =
    useVerifyEmailFlow({
      email,
      setError,
      clearErrors,
      onResendSuccess: setExpiresAt,
    });

  return (
    <div className="flex min-h-dvh items-center justify-center px-4 bg-background">
      <Card className="w-full sm:w-100 shadow-sm ring-0 p-10">
        <Button
          variant="ghost"
          className="w-fit p-0 gap-2 mb-4 text-muted-foreground hover:text-foreground hover:bg-transparent"
          onClick={() => navigate({ to: "/auth/register" })}
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>

        <CardContent className="flex flex-col items-center p-0">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 mx-auto">
            <Mail className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-2xl font-semibold mb-2 text-center text-foreground">
            Check your email
          </h2>
          <p className="text-muted-foreground mb-8 text-center text-sm">
            We sent a verification code to{" "}
            <b className="text-foreground">{email}</b>
          </p>

          <form
            className="w-full flex flex-col items-center"
            onSubmit={handleSubmit(handleVerify)}
          >
            <Field className="w-fit">
              <FieldLabel
                htmlFor="verify-code"
                className="justify-center mb-4 text-sm font-medium"
              >
                Enter verification code
              </FieldLabel>
              <Controller
                name="otp"
                control={control}
                render={({ field }) => (
                  <InputOTP
                    maxLength={6}
                    id="verify-code"
                    containerClassName="justify-center"
                    pattern={REGEXP_ONLY_DIGITS}
                    disabled={isLoading}
                    value={field.value}
                    onChange={(val) => {
                      field.onChange(val);

                      // Auto-submit form when all 6 slots are completed
                      if (val.length === 6) {
                        handleSubmit(handleVerify)();
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
                <FieldError className="text-center mt-2 justify-center">
                  {errors.otp.message}
                </FieldError>
              )}
            </Field>

            <Button
              className="w-full mt-8 py-4 font-semibold"
              disabled={isLoading}
            >
              <ActionButtonContent
                action={isVerifying ? "Verifying..." : "Verify"}
                isLoading={isVerifying}
              />
            </Button>
          </form>

          <p className="text-xs text-muted-foreground mt-6 mb-1 text-center">
            Didn't receive the code?
          </p>
          {isTimerActive ? (
            <p className="pt-2 text-sm text-muted-foreground font-medium">
              Resend code in{" "}
              <span className="text-foreground font-semibold">
                {countdown}s
              </span>
            </p>
          ) : (
            <Button
              variant="link"
              className="w-fit p-0 text-primary hover:underline text-sm font-medium"
              onClick={handleResend}
              disabled={isLoading}
            >
              <ActionButtonContent
                action={isResending ? "Resending..." : "Resend Code"}
                isLoading={isResending}
              />
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
