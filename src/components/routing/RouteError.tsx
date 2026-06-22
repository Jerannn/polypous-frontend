import { type ErrorComponentProps, isRedirect } from "@tanstack/react-router";
import { AlertCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { ApiError } from "@/utils/apiError";

type RouteErrorProps = ErrorComponentProps & {
  title?: string;
  showSignIn?: boolean;
};

export default function RouteError({
  error,
  reset,
  title = "Unable to load this page",
}: RouteErrorProps) {
  if (isRedirect(error)) {
    throw error;
  }

  const description =
    error instanceof ApiError
      ? error.message
      : error instanceof Error
        ? error.message
        : "Something went wrong. Please try again.";

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <Empty className="max-w-md border-none">
        <EmptyMedia variant="icon">
          <AlertCircle className="text-destructive" />
        </EmptyMedia>
        <EmptyHeader>
          <EmptyTitle>{title}</EmptyTitle>
          <EmptyDescription>{description}</EmptyDescription>
        </EmptyHeader>
        <div className="flex flex-wrap justify-center gap-2">
          <Button type="button" onClick={() => reset()}>
            Try again
          </Button>
        </div>
      </Empty>
    </div>
  );
}
