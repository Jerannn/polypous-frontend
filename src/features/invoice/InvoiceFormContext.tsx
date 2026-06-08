import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "@tanstack/react-router";
import { createContext, type ReactNode, useContext } from "react";
import {
  useFieldArray,
  type UseFieldArrayReturn,
  useForm,
  type UseFormReturn,
} from "react-hook-form";
import { toast } from "sonner";

import useCreateInvoice from "./hooks/use-create-invoice";
import useUpdateInvoice from "./hooks/use-update-invoice";
import { invoiceSchema } from "./schema";
import type { InvoiceBase } from "./types";

type InvoiceFormContextType = {
  action: string;
  isSubmitting: boolean;
  form: UseFormReturn<InvoiceBase>;
  fields: UseFieldArrayReturn<InvoiceBase>;
  onSubmit: (data: InvoiceBase) => Promise<void>;
  onAddItem: () => void;
  onRemoveItem: (index: number) => void;
};

const InvoiceFormContext = createContext<InvoiceFormContextType | undefined>(
  undefined,
);

type InvoiceFormProviderProps = {
  children: ReactNode;
  initialInvoice?: InvoiceBase;
  action?: "create" | "edit";
};

export function InvoiceFormProvider({
  children,
  initialInvoice,
  action = "create",
}: InvoiceFormProviderProps) {
  const navigate = useNavigate();
  const { invoiceId } = useParams({
    from: "/(protected)/invoices/$invoiceId/edit",
  });

  const { createInvoice, isCreating } = useCreateInvoice();
  const { updateInvoice, isUpdating } = useUpdateInvoice();

  const form = useForm<InvoiceBase>({
    resolver: zodResolver(invoiceSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    criteriaMode: "all",
    defaultValues: {
      clientId: initialInvoice?.clientId || "",
      taxRate: Number(initialInvoice?.taxRate) || 0,
      issueDate: initialInvoice?.issueDate || new Date(),
      dueDate: initialInvoice?.dueDate || undefined,
      notes: initialInvoice?.notes || "",
      items: initialInvoice?.items || [
        {
          description: "",
          quantity: 0,
          unitPrice: 0,
        },
      ],
    },
  });

  const fields = useFieldArray({
    control: form.control,
    name: "items",
  });

  const onSubmit = async (data: InvoiceBase) => {
    try {
      if (action === "create") {
        await createInvoice(data);
        toast.success("Invoice created successfully!");
      }

      if (action === "edit") {
        await updateInvoice({ ...data, id: invoiceId });
        toast.success("Invoice updated successfully!");
        navigate({ to: `/invoices`, replace: true });
      }

      form.reset();
    } catch {
      toast.error("Failed to create invoice.");
    }
  };

  const handleAddItem = () =>
    fields.append({
      description: "",
      quantity: 1,
      unitPrice: 0,
    });

  const handleRemoveItem = (index: number) => fields.remove(index);

  const isSubmitting = isCreating || isUpdating;
  const actionLabel =
    action === "create"
      ? isSubmitting
        ? "Creating..."
        : "Create"
      : isSubmitting
        ? "Updating..."
        : "Update";

  return (
    <InvoiceFormContext.Provider
      value={{
        action: actionLabel,
        form,
        fields,
        onSubmit,
        isSubmitting,
        onAddItem: handleAddItem,
        onRemoveItem: handleRemoveItem,
      }}
    >
      {children}
    </InvoiceFormContext.Provider>
  );
}

export function useInvoiceForm() {
  const context = useContext(InvoiceFormContext);

  if (!context) {
    throw new Error(
      "useInvoiceForm must be used within a InvoiceFormProvider.",
    );
  }

  return context;
}
