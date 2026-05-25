import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "@tanstack/react-router";
import { EyeOffIcon, Loader2, Lock, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

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
import useLogin from "@/features/auth/hooks/use-login";
import { loginSchema } from "@/features/auth/schema";
import type { LoginPayload } from "@/features/auth/types";

export default function LoginForm() {
  const navigate = useNavigate();
  const { login, isLoggingIn } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginPayload>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginPayload) => {
    const response = await login(data);

    if (response.status === "success") {
      navigate({
        to: "/dashboard",
        replace: true,
      });
      toast.success("Logged in successfully!");
    } else if (response.status === "fail") {
      setError("root", { message: response.message });
    }
  };

  return (
    <div className="flex items-center justify-center flex-1">
      <Card className="w-100 pb-0">
        <CardHeader className="px-5">
          <CardTitle>Login</CardTitle>
          <CardDescription>Sign in to your account</CardDescription>
        </CardHeader>

        <CardContent className="px-5">
          <form onSubmit={handleSubmit(onSubmit)} id="login-form">
            <FieldGroup>
              {errors.root && (
                <FieldError className="text-xs text-center bg-destructive/5 py-2 rounded-sm text-red-500">
                  {errors.root.message}
                </FieldError>
              )}
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    id="email"
                    placeholder="Email"
                    disabled={isLoggingIn}
                    {...register("email")}
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
                    disabled={isLoggingIn}
                    {...register("password")}
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
            </FieldGroup>
          </form>
        </CardContent>

        <CardFooter className="flex-col gap-2 px-5 py-3">
          <Button
            className="w-full py-4"
            type="submit"
            form="login-form"
            disabled={isLoggingIn}
          >
            {isLoggingIn ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </Button>
          <p className="text-center text-xs text-muted-foreground mt-2">
            Don't have an account?
            <Link
              to="/auth/register"
              className="pl-1 text-primary hover:underline"
            >
              Register
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
