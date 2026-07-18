import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { useForm } from "react-hook-form";

import ActionButtonContent from "@/components/ActionButtonContent";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import useRequestPasswordReset from "../hooks/use-request-password-reset";
import { emailSchema } from "../schema";
import type { EmailPayload } from "../types";

export default function RequestPasswordResetForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailPayload>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  const { requestPasswordReset, isRequesting } = useRequestPasswordReset();

  const onSubmit = async (data: EmailPayload) => {
    await requestPasswordReset(data);
    navigate({
      to: "/auth/forgot-password/verify",
      search: { email: data.email },
    });
  };

  return (
    <div className="max-w-lg w-full mx-auto mt-10">
      <Button variant="link" className="-ml-3">
        <ChevronLeft />
        Back
      </Button>
      <h1 className="text-xl font-bold mb-5">Find your account</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup>
          <Field>
            <FieldLabel>Enter your mobile email.</FieldLabel>
            <Input
              placeholder="Email"
              type="text"
              {...register("email")}
              disabled={isRequesting}
            />
            {errors.email && <FieldError>{errors.email.message}</FieldError>}
          </Field>

          <Button type="submit" disabled={isRequesting}>
            <ActionButtonContent
              action={isRequesting ? "Loading..." : "Continue"}
              isLoading={isRequesting}
            />
          </Button>
        </FieldGroup>
      </form>
    </div>
  );
}
