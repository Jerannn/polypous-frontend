import { useMutation } from "@tanstack/react-query";

import { downloadInvoicePDF as downloadInvoicePDFApi } from "../api";

export default function useDownloadPdf() {
  const { mutateAsync: downloadInvoicePDF, isPending: isDownloading } =
    useMutation({
      mutationFn: downloadInvoicePDFApi,
    });

  return { downloadInvoicePDF, isDownloading };
}
