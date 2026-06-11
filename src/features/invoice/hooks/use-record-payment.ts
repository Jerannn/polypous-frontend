import { useMutation, useQueryClient } from "@tanstack/react-query";

import { recordPayment as recordPaymentApi } from "../api";
import { invoiceKeys } from "../queryKeys";
import type { RecordPaymentPayload } from "../types";

export default function useRecordPayment(invoiceId: string) {
  const queryClient = useQueryClient();

  const { mutateAsync: recordPayment, isPending: isRecording } = useMutation({
    mutationFn: (payload: RecordPaymentPayload) =>
      recordPaymentApi(invoiceId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: invoiceKeys.detail(invoiceId),
      });
    },
  });
  return { recordPayment, isRecording };
}
