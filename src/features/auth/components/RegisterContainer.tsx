import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Field, FieldGroup, FieldLabel } from "../../../components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../../../components/ui/input-group";
import { Lock, Mail, User, EyeOffIcon, Loader2 } from "lucide-react";
import { Link } from "@tanstack/react-router";
import useRegister from "../hooks/useRegister";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../schema/auth.schema";
import type { RegisterForm } from "../types/auth.types";
import { useNavigate } from "@tanstack/react-router";

export default function RegisterContainer() {
  const { registerUser, isRegistering, isError } = useRegister();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterForm) => {
    const response = await registerUser(data);

    console.log("Registration response:", response);
    if (response.status === "success") {
      navigate({
        to: "/auth/verify-email",
        search: {
          email: data.email,
        },
      });
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <Card className="w-100 pb-0">
        <CardHeader className="px-5">
          <CardTitle>Create account</CardTitle>
          <CardDescription>Get started with your free account</CardDescription>
        </CardHeader>

        <CardContent className="px-5">
          <form onSubmit={handleSubmit(onSubmit)} id="register-form">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="fullName">Full name</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    id="fullName"
                    placeholder="Full name"
                    {...register("fullName")}
                  />
                  <InputGroupAddon>
                    <User />
                  </InputGroupAddon>
                </InputGroup>
                {errors.fullName && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.fullName.message}
                  </p>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    id="email"
                    placeholder="Email"
                    {...register("email")}
                  />
                  <InputGroupAddon>
                    <Mail />
                  </InputGroupAddon>
                </InputGroup>
                {errors.email && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.email.message}
                  </p>
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
                  />
                  <InputGroupAddon>
                    <Lock />
                  </InputGroupAddon>
                  <InputGroupAddon align="inline-end">
                    <EyeOffIcon />
                  </InputGroupAddon>
                </InputGroup>
                {errors.password && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.password.message}
                  </p>
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
                  />
                  <InputGroupAddon>
                    <Lock />
                  </InputGroupAddon>
                  <InputGroupAddon align="inline-end">
                    <EyeOffIcon />
                  </InputGroupAddon>
                </InputGroup>
                {errors.confirmPassword && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.confirmPassword.message}
                  </p>
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
            {isRegistering ? (
              <Loader2 className="mr-2 animate-spin" />
            ) : (
              "Register"
            )}
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
