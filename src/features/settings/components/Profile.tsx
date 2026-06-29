import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, User } from "lucide-react";
import { Controller, useForm } from "react-hook-form";

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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/features/auth/AuthProvider";
import type { Profile } from "@/features/settings/types";
import { CURRENCIES } from "@/utils/constants";

import useUpdateProfile from "../hooks/use-update-profile";
import { profileSchema } from "../schema";

export default function Profile() {
  const { user } = useAuth();
  const { updateProfile, isUpdating } = useUpdateProfile();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<Profile>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: user?.fullName || "",
      email: user?.email || "",
      currency: user?.currency || "USD",
    },
  });

  const onSubmit = (data: Profile) => {
    updateProfile(data);
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Profile Settings </CardTitle>
        <CardDescription>Update your personal information</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="fullName">Full name</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id="fullName"
                  placeholder="e.g. John Doe"
                  disabled={isUpdating}
                  {...register("fullName")}
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
                  placeholder="e.g. 2V8kD@example.com"
                  disabled={true}
                />
                <InputGroupAddon>
                  <Mail />
                </InputGroupAddon>
              </InputGroup>
            </Field>

            <Controller
              name="currency"
              control={control}
              render={({ field }) => {
                return (
                  <Field>
                    <FieldLabel htmlFor="currency">Currency</FieldLabel>
                    <Select
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      disabled={isUpdating}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent align="end" position="popper">
                        <SelectGroup>
                          {CURRENCIES.map((currency) => (
                            <SelectItem
                              key={currency.code}
                              value={currency.code}
                            >
                              {currency.symbol} {currency.code}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    {errors.currency && (
                      <FieldError>{errors.currency.message}</FieldError>
                    )}
                  </Field>
                );
              }}
            />

            <Button type="submit" className="self-end" disabled={isUpdating}>
              <ActionButtonContent
                action={isUpdating ? "Saving..." : "Save changes"}
                isLoading={isUpdating}
              />
            </Button>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
