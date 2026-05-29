import logo from "@/assets/img/logo.svg";

export default function ProtectedRoutePending() {
  return (
    <>
      <style>{`
        @keyframes app-boot-fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-app-boot {
          animation: app-boot-fade-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          animation-delay: 250ms;
          opacity: 0;
        }
      `}</style>
      <div
        className="flex min-h-svh w-full flex-col items-center justify-center bg-background p-8 animate-app-boot"
        role="status"
        aria-live="polite"
        aria-busy="true"
      >
        <div className="relative flex flex-col items-center gap-6">
          {/* Logo container */}
          <div className="relative flex items-center justify-center size-16 rounded-2xl bg-card border border-border shadow-sm">
            <img
              src={logo}
              alt="Polypous Logo"
              className="size-10"
            />
          </div>

          {/* Typography */}
          <div className="flex flex-col items-center gap-1.5 text-center">
            <h1 className="text-base font-semibold tracking-wide text-foreground">
              Polypous
            </h1>
            <p className="text-xs text-muted-foreground/80">
              Authenticating session...
            </p>
          </div>
        </div>
        <span className="sr-only">Loading application…</span>
      </div>
    </>
  );
}

