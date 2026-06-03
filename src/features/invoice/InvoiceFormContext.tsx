import { zodResolver } from "@hookform/resolvers/zod";
import { createContext, type ReactNode,useContext } from "react";
import {
  useFieldArray,
  type UseFieldArrayReturn,
  useForm,
  type UseFormReturn,
} from "react-hook-form";
import { toast } from "sonner";

import useCreateInvoice from "./hooks/use-create-invoice";
import { invoiceSchema } from "./schema";
import type { InvoiceBase } from "./types";

type InvoiceFormContextType = {
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
};

export function InvoiceFormProvider({ children }: InvoiceFormProviderProps) {
  const { createInvoice, isCreating } = useCreateInvoice();

  const form = useForm<InvoiceBase>({
    resolver: zodResolver(invoiceSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    criteriaMode: "all",
    defaultValues: {
      clientId: "",
      taxRate: 0,
      issueDate: new Date(),
      dueDate: undefined,
      notes: "",
      items: [
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
      const invoice = await createInvoice(data);
      console.log("Invoice created:", invoice);
      form.reset();
      toast.success("Invoice created successfully!");
    } catch (error) {
      console.error("Error creating invoice:", error);
    }
  };

  const isSubmitting = isCreating;

  const handleAddItem = () =>
    fields.append({
      description: "",
      quantity: 1,
      unitPrice: 0,
    });

  const handleRemoveItem = (index: number) => fields.remove(index);

  return (
    <InvoiceFormContext.Provider
      value={{
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
