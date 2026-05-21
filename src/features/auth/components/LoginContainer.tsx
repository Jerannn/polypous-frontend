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
import { Lock, Mail, EyeOffIcon, Loader2 } from "lucide-react";
import { Link } from "@tanstack/react-router";

export default function LoginContainer() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Card className="w-100 pb-0">
        <CardHeader className="px-5">
          <CardTitle>Login</CardTitle>
          <CardDescription>Sign in to your account</CardDescription>
        </CardHeader>

        <CardContent className="px-5">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <InputGroup>
                <InputGroupInput id="email" placeholder="Email" />
                <InputGroupAddon>
                  <Mail />
                </InputGroupAddon>
              </InputGroup>
            </Field>

            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id="password"
                  placeholder="Password"
                  type="password"
                />
                <InputGroupAddon>
                  <Lock />
                </InputGroupAddon>
                <InputGroupAddon align="inline-end">
                  <EyeOffIcon />
                </InputGroupAddon>
              </InputGroup>
            </Field>
          </FieldGroup>
        </CardContent>

        <CardFooter className="flex-col gap-2 px-5 py-3">
          <Button
            className="w-full py-4"
            type="submit"
            form="register-form"
            // disabled={isSubmitting}
          >
            {/* {isSubmitting ? (
              <Loader2 className="mr-2 animate-spin" />
            ) : ( */}
            Login
            {/* )} */}
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
