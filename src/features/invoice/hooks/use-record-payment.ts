import { useMutation } from "@tanstack/react-query";

import { recordPayment as recordPaymentApi } from "../api";
import type { RecordPaymentPayload } from "../types";

export default function useRecordPayment(invoiceId: string) {
  const { mutateAsync: recordPayment, isPending: isRecording } = useMutation({
    mutationFn: (payload: RecordPaymentPayload) =>
      recordPaymentApi(invoiceId, payload),
  });
  return { recordPayment, isRecording };
}
