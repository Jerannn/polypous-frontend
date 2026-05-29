import { Loading03Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

type RoutePendingProps = {
  label?: string;
};

export default function RoutePending({
  label = "Loading page…",
}: RoutePendingProps) {
  return (
    <>
      <style>{`
        @keyframes route-pending-fade-in {
          from {
            opacity: 0;
            transform: translateY(4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-route-pending {
          animation: route-pending-fade-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          animation-delay: 250ms;
          opacity: 0;
        }
      `}</style>
      <div
        className="flex flex-1 flex-col items-center justify-center min-h-[60vh] p-8 animate-route-pending"
        role="status"
        aria-live="polite"
        aria-busy="true"
      >
        <div className="relative flex flex-col items-center gap-4">
          {/* Spinner container */}
          <div className="relative flex items-center justify-center size-12 rounded-xl bg-card border border-border/80 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.2)]">
            <HugeiconsIcon
              icon={Loading03Icon}
              className="size-5 text-primary animate-spin"
              strokeWidth={2}
            />
          </div>

          {/* Text Labels */}
          <div className="flex flex-col items-center gap-1 text-center">
            <h2 className="text-sm font-medium tracking-wide text-foreground">
              {label}
            </h2>
            <p className="text-xs text-muted-foreground/80">
              Please wait a moment
            </p>
          </div>
        </div>
        <span className="sr-only">{label}</span>
      </div>
    </>
  );
}

