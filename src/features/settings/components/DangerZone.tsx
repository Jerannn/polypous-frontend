import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOffIcon, Lock } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import ActionButtonContent from "@/components/ActionButtonContent";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import { Label } from "@/components/ui/label";
import { ApiError } from "@/utils/apiError";

import useDeleteAccount from "../hooks/use-delete-account";
import useVerifyPassword from "../hooks/use-verify-password";
import { verifyPasswordSchema } from "../schema";
import type { VerifyPasswordInput } from "../types";

export default function DangerZone() {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isPasswordConfirmed, setIsPasswordConfirmed] = useState(false);

  const { verifyPassword, isVerifying } = useVerifyPassword();
  const { deleteMe, isDeleting } = useDeleteAccount();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<VerifyPasswordInput>({
    resolver: zodResolver(verifyPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = async (data: VerifyPasswordInput) => {
    try {
      await verifyPassword(data);
      setIsPasswordConfirmed(true);
    } catch (error) {
      if (error instanceof ApiError && error.statusCode === 400) {
        setError("password", {
          type: "server",
          message: error.error.error.message,
        });
      }
    }
  };

  const handleDelete = async () => {
    await deleteMe();
    toast.success("Account deleted successfully!");
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Danger Zone</CardTitle>
        <CardDescription>Irreversible actions for your account</CardDescription>
      </CardHeader>
      <CardContent>
        <Item variant="muted">
          <ItemContent>
            <ItemTitle>Delete Account</ItemTitle>
            <ItemDescription>
              Permanently delete your account and all data
            </ItemDescription>
          </ItemContent>
          <ItemActions>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="destructive">Delete Account</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                  <DialogTitle>Delete your account?</DialogTitle>
                  <DialogDescription>
                    Deleting your account is permanent and cannot be undone.
                    You'll lose access to your account, and your personal data
                    will be permanently removed.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <FieldGroup>
                    <Field>
                      <Label htmlFor="password">Password</Label>
                      <FieldDescription>
                        Enter your password to verify your identity before
                        deleting your account.
                      </FieldDescription>
                      <InputGroup>
                        <InputGroupInput
                          id="password"
                          type={isShowPassword ? "text" : "password"}
                          placeholder="••••••••"
                          disabled={isVerifying}
                          {...register("password")}
                        />
                        <InputGroupAddon>
                          <Lock />
                        </InputGroupAddon>
                        <InputGroupAddon
                          align="inline-end"
                          className="cursor-pointer"
                          onClick={() => setIsShowPassword(!isShowPassword)}
                        >
                          {isShowPassword ? <EyeOffIcon /> : <Eye />}
                        </InputGroupAddon>
                      </InputGroup>
                      {errors.password && (
                        <FieldError>{errors.password.message}</FieldError>
                      )}
                    </Field>
                    <Button type="submit" disabled={isVerifying}>
                      <ActionButtonContent
                        action={
                          isVerifying ? "Verifying..." : "Verify Password"
                        }
                        isLoading={isVerifying}
                      />
                    </Button>
                  </FieldGroup>
                </form>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>

                  <Button
                    variant="destructive"
                    disabled={!isPasswordConfirmed || isDeleting}
                    onClick={handleDelete}
                  >
                    <ActionButtonContent
                      action={isDeleting ? "Deleting..." : "Delete Account"}
                      isLoading={isDeleting}
                    />
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </ItemActions>
        </Item>
      </CardContent>
    </Card>
  );
}
