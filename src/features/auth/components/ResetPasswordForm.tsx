import { zodResolver } from "@hookform/resolvers/zod";
import { getRouteApi, useNavigate } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import ActionButtonContent from "@/components/ActionButtonContent";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import useResetPassword from "../hooks/use-reset-password";
import { resetPasswordSchema } from "../schema";
import type { ResetPasswordPayload } from "../types";

const routeApi = getRouteApi("/(public)/auth/forgot-password/reset");

export default function ResetPasswordForm() {
  const { token } = routeApi.useSearch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordPayload>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmNewPassword: "",
      token: token ?? "",
    },
  });

  const { resetPassword, isResetting } = useResetPassword();

  const onSubmit = async (data: ResetPasswordPayload) => {
    await resetPassword(data);
    navigate({ to: "/auth/login" });
    toast.success("Password reset successfully!");
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
      <h1 className="text-xl font-bold mb-5">Reset your password</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="new-password">New Password</FieldLabel>
            <Input
              type="password"
              id="new-password"
              placeholder="••••••"
              {...register("newPassword")}
              disabled={isResetting}
            />
            {errors.newPassword && (
              <FieldError>{errors.newPassword.message}</FieldError>
            )}
          </Field>

          <Field>
            <FieldLabel htmlFor="confirm-new-password">
              Confirm New Password
            </FieldLabel>
            <Input
              type="password"
              id="confirm-new-password"
              placeholder="••••••"
              {...register("confirmNewPassword")}
              disabled={isResetting}
            />
            {errors.confirmNewPassword && (
              <FieldError>{errors.confirmNewPassword.message}</FieldError>
            )}
          </Field>

          <Button type="submit" disabled={isResetting}>
            <ActionButtonContent
              action={isResetting ? "Loading..." : "Reset Password"}
              isLoading={isResetting}
            />
          </Button>
        </FieldGroup>
      </form>
    </div>
  );
}
