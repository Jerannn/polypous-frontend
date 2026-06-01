import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { type ReactNode, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
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
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ApiError } from "@/utils/apiError";

import useCreateClient from "../hooks/use-create-client";
import useUpdateClient from "../hooks/use-update-client";
import { createClientSchema } from "../schema";
import type { ClientPayload } from "../types";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type ClientForm = {
  title: string;
  description: string;
  button: ReactNode;
  initialClient?: ClientPayload & { id: string };
  action?: "update" | "create";
};

export default function ClientForm({
  title,
  description,
  button,
  initialClient,
  action = "create",
}: ClientForm) {
  const [open, setOpen] = useState(false);
  const { createClient, isCreating } = useCreateClient();
  const { updateClient, isUpdating } = useUpdateClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<ClientPayload>({
    resolver: zodResolver(createClientSchema),
    defaultValues: initialClient,
  });

  const onSubmit = async (data: ClientPayload) => {
    try {
      if (action === "create") {
        const newClient = await createClient(data);
        if (newClient) {
          reset();
          setOpen(false);
          toast.success("Client created successfully!");
        }
      }

      if (action === "update") {
        const updatedClient = await updateClient({
          payload: data,
          id: initialClient?.id as string,
        });
        if (updatedClient) {
          reset();
          setOpen(false);
          toast.success("Client updated successfully!");
        }
      }
    } catch (error: unknown) {
      if (error instanceof ApiError) {
        setError("root", {
          type: "server",
          message: "An unexpected error occurred. Please try again.",
        });
      }
    }
  };

  useEffect(() => {
    if (initialClient) {
      reset(initialClient);
    }
  }, [initialClient, reset]);

  const isLoading = isCreating || isUpdating;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>{button}</DialogTrigger>
        </TooltipTrigger>
        {action === "update" && <TooltipContent>Update client</TooltipContent>}
      </Tooltip>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden">
        <DialogHeader className="p-4 pb-0">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          id="client-form"
          className="no-scrollbar max-h-[50vh] overflow-y-auto w-full px-4"
        >
          <FieldGroup>
            {errors.root && <FieldError>{errors.root.message}</FieldError>}
            <Field>
              <FieldLabel htmlFor="name">Client Name *</FieldLabel>
              <FieldDescription>
                The official name of the company or individual you are working
                with.
              </FieldDescription>
              <Input
                id="name"
                placeholder="Polypous Corporation"
                {...register("name")}
                disabled={isLoading}
              />
              {errors.name && <FieldError>{errors.name.message}</FieldError>}
            </Field>

            <Field>
              <FieldLabel htmlFor="email">Email *</FieldLabel>
              <FieldDescription>
                Primary contact email used for communication and invoices.
              </FieldDescription>
              <Input
                id="email"
                placeholder="contact@example.com"
                {...register("email")}
                disabled={isLoading}
              />
              {errors.email && <FieldError>{errors.email.message}</FieldError>}
            </Field>

            <Field>
              <FieldLabel htmlFor="phone">Phone</FieldLabel>
              <FieldDescription>
                Direct phone number for reaching the client or their
                representative.
              </FieldDescription>
              <Input
                id="phone"
                placeholder="+1 (123) 456-7890"
                {...register("phone", { required: false })}
                disabled={isLoading}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="address">Address</FieldLabel>
              <FieldDescription>
                Physical business address for billing or documentation purposes.
              </FieldDescription>
              <Input
                id="address"
                placeholder="2436 Main Street, Springfield, IL 62704, United States"
                {...register("address", { required: false })}
                disabled={isLoading}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="notes">Notes</FieldLabel>
              <FieldDescription>
                Internal notes about the client (preferences, context, or
                important details).
              </FieldDescription>
              <Textarea
                id="notes"
                placeholder="e.g. Prefers email communication, VIP client, pending contract renewal..."
                {...register("notes", { required: false })}
                disabled={isLoading}
              />
            </Field>
          </FieldGroup>
        </form>
        <DialogFooter className="p-4 bg-muted/50">
          <DialogClose asChild disabled={isLoading}>
            <Button variant="outline">Cancel</Button>
          </DialogClose>

          <Button
            type="submit"
            className="w-full sm:max-w-30 capitalize"
            form="client-form"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {action === "update" ? "Updating..." : "Creating..."}
              </>
            ) : (
              <>{action}</>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
