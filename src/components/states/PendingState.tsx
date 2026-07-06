import { Spinner } from "@/components/ui/spinner";

export default function PendingState() {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <Spinner className="mr-2 h-4 w-4 text-primary" />
      <span className="text-xs text-muted-foreground">Loading...</span>
    </div>
  );
}
