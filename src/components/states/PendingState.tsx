import { Loader2 } from "lucide-react";

export default function PendingState() {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <Loader2 className="mr-2 h-4 w-4 animate-spin text-primary" />
      <span className="text-xs text-muted-foreground">Loading...</span>
    </div>
  );
}
