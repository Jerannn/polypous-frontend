import { z } from "zod";

import { DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE } from "@/utils/constants";

const invoiceItemSchema = z.object({
  description: z
    .string()
    .trim()
    .min(1, "Description is required")
    .max(255, "Description is too long"),
  quantity: z
    .number("Quantity is required")
    .int("Quantity must be a whole number")
    .positive("Quantity must be greater than 0"),
  unitPrice: z
    .number("Unit price is required")
    .nonnegative("Unit price cannot be negative")
    .transform((val) => parseFloat(val.toFixed(2))),
});

export const invoiceSchema = z
  .object({
    clientId: z.string().trim().min(1, "Please select a client"),
    taxRate: z
      .number()
      .min(0, "Tax rate cannot be negative")
      .max(100, "Tax rate cannot exceed 100")
      .optional(),
    issueDate: z.coerce.date<Date>("Please select an issue date"),
    dueDate: z.coerce.date<Date>("Please select a due date"),
    notes: z
      .string()
      .trim()
      .max(1000, "Notes cannot exceed 1000 characters")
      .optional(),

    items: z
      .array(invoiceItemSchema)
      .min(1, "At least one invoice item is required"),
  })
  .refine((data) => data.dueDate > data.issueDate, {
    path: ["dueDate"],
    message: "Due date must be after issue date",
  });

export const invoiceQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce
    .number()
    .min(1)
    .max(MAX_PAGE_SIZE, `Limit must not exceed ${DEFAULT_PAGE_SIZE}`)
    .default(DEFAULT_PAGE_SIZE)
    .catch(DEFAULT_PAGE_SIZE),
  search: z.string().trim().optional().default(""),
});

export const recordPaymentSchema = z.object({
  amount: z
    .number("Payment amount is required")
    .nonnegative("Amount cannot be negative")
    .transform((val) => parseFloat(val.toFixed(2))),
  paymentMethod: z.string().trim().min(1, "Payment method is required"),
  paymentDate: z.coerce.date<Date>().catch(new Date()),
  referenceNumber: z.string().trim().max(255).optional(),
  notes: z.string().trim().max(1000).optional(),
});
