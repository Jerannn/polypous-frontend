import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
import { EyeOffIcon, Lock, Mail, User } from "lucide-react";
import { useForm } from "react-hook-form";

import ActionButtonContent from "@/components/ActionButtonContent";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { registerSchema } from "@/features/auth/schema";
import type { RegisterPayload } from "@/features/auth/types";
import { ApiError } from "@/utils/apiError";

import { useAuth } from "../AuthProvider";

export default function RegisterForm() {
  const { register: registerUser, isRegistering } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<RegisterPayload>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterPayload) => {
    try {
      await registerUser(data, {
        onSuccess: () => {
          navigate({
            to: "/auth/verify-email",
            search: {
              email: data.email,
            },
          });
        },
      });
    } catch (error: unknown) {
      if (error instanceof ApiError) {
        const errorData = error.error;
        switch (error.statusCode) {
          case 400:
            Object.entries(errorData.error).forEach(([field, message]) => {
              setError(field as keyof RegisterPayload, {
                type: "server",
                message: message,
              });
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
    <div className="flex items-center justify-center flex-1">
      <Card className="w-100 pb-0">
        <CardHeader className="px-5">
          <CardTitle>Create account</CardTitle>
          <CardDescription>Get started with your free account</CardDescription>
        </CardHeader>

        <CardContent className="px-5">
          <form onSubmit={handleSubmit(onSubmit)} id="register-form">
            <FieldGroup>
              {errors.root && (
                <FieldError className="text-xs text-center bg-destructive/5 py-2 rounded-sm text-red-500">
                  {errors.root.message}
                </FieldError>
              )}
              <Field>
                <FieldLabel htmlFor="fullName">Full name</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    id="fullName"
                    placeholder="Full name"
                    {...register("fullName")}
                    disabled={isRegistering}
                  />
                  <InputGroupAddon>
                    <User />
                  </InputGroupAddon>
                </InputGroup>
                {errors.fullName && (
                  <FieldError>{errors.fullName.message}</FieldError>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    id="email"
                    placeholder="Email"
                    {...register("email")}
                    disabled={isRegistering}
                  />
                  <InputGroupAddon>
                    <Mail />
                  </InputGroupAddon>
                </InputGroup>
                {errors.email && (
                  <FieldError>{errors.email.message}</FieldError>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    id="password"
                    placeholder="Password"
                    type="password"
                    {...register("password")}
                    disabled={isRegistering}
                  />
                  <InputGroupAddon>
                    <Lock />
                  </InputGroupAddon>
                  <InputGroupAddon align="inline-end">
                    <EyeOffIcon />
                  </InputGroupAddon>
                </InputGroup>
                {errors.password && (
                  <FieldError>{errors.password.message}</FieldError>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="confirmPassword">
                  Confirm Password
                </FieldLabel>

                <InputGroup>
                  <InputGroupInput
                    id="confirmPassword"
                    placeholder="Confirm Password"
                    type="password"
                    {...register("confirmPassword")}
                    disabled={isRegistering}
                  />
                  <InputGroupAddon>
                    <Lock />
                  </InputGroupAddon>
                  <InputGroupAddon align="inline-end">
                    <EyeOffIcon />
                  </InputGroupAddon>
                </InputGroup>
                {errors.confirmPassword && (
                  <FieldError>{errors.confirmPassword.message}</FieldError>
                )}
              </Field>
            </FieldGroup>
          </form>
        </CardContent>

        <CardFooter className="flex-col gap-2 px-5 py-3">
          <Button
            className="w-full py-4"
            type="submit"
            form="register-form"
            disabled={isRegistering}
          >
            <ActionButtonContent
              action={isRegistering ? "Registering..." : "Register"}
              isLoading={isRegistering}
            />
          </Button>
          <p className="text-center text-xs text-muted-foreground mt-2">
            Already have an account?
            <Link
              to="/auth/login"
              className="pl-1 text-primary hover:underline"
            >
              Log in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
