import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
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
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { BusinessInput } from "@/features/settings/types";

import useRetrieveBusiness from "../hooks/use-retrieve-business";
import useUpdateBusiness from "../hooks/use-update-business";
import { businessSchema } from "../schema";

export default function Business() {
  const { updateBusiness, isUpdating } = useUpdateBusiness();
  const { business, isRetrieving } = useRetrieveBusiness();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<BusinessInput>({
    resolver: zodResolver(businessSchema),
    defaultValues: {
      name: "",
      email: "",
      address: "",
      phone: "",
    },
  });

  const onSubmit = async (data: BusinessInput) => {
    await updateBusiness(data);
    toast.success("Business updated successfully!");
  };

  useEffect(() => {
    if (!business) return;
    setValue("name", business?.name ?? "");
    setValue("email", business?.email ?? "");
    setValue("address", business?.address ?? "");
    setValue("phone", business?.phone ?? "");
  }, [business, setValue]);

  const isLoading = isUpdating || isRetrieving;

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Business Settings</CardTitle>
        <CardDescription>
          Configure your business details for invoices
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Business name</FieldLabel>
              <Input
                id="name"
                placeholder="e.g. John Doe"
                disabled={isLoading}
                {...register("name")}
              />
              {errors.name && <FieldError>{errors.name.message}</FieldError>}
            </Field>

            <Field>
              <FieldLabel htmlFor="email">Business Email</FieldLabel>
              <Input
                id="email"
                placeholder="e.g. 2V8kD@example.com"
                disabled={isLoading}
                {...register("email")}
              />
              {errors.email && <FieldError>{errors.email.message}</FieldError>}
            </Field>

            <Field>
              <FieldLabel htmlFor="address">Business address</FieldLabel>
              <Input
                id="address"
                placeholder="e.g. 123 Main Street"
                disabled={isLoading}
                {...register("address")}
              />
              {errors.address && (
                <FieldError>{errors.address.message}</FieldError>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="phone">Business phone</FieldLabel>
              <Input
                id="phone"
                placeholder="e.g. 123456789"
                disabled={isLoading}
                {...register("phone")}
              />
              {errors.phone && <FieldError>{errors.phone.message}</FieldError>}
            </Field>

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
