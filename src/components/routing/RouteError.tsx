import {
  type ErrorComponentProps,
  isRedirect,
  useRouter,
} from "@tanstack/react-router";
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
  showSignIn = false,
}: RouteErrorProps) {
  const router = useRouter();

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
    <div className="flex min-h-[50vh] items-center justify-center p-6">
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
          {showSignIn && (
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                router.navigate({
                  to: "/auth/login",
                  replace: true,
                })
              }
            >
              Sign in
            </Button>
          )}
        </div>
      </Empty>
    </div>
  );
}
