import logo from "@/assets/img/logo.svg";

export default function ProtectedRoutePending() {
  return (
    <div
      className="flex min-h-svh w-full flex-col items-center justify-center bg-background p-8 animate-app-boot"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="relative flex flex-col items-center">
        <div className="relative flex items-center justify-center size-16 rounded-2xl">
          <img src={logo} alt="Polypous Logo" className="size-10" />
        </div>

        <div className="flex flex-col items-center gap-1.5 text-center">
          <h1 className="text-base font-semibold text-foreground">Polypous</h1>
          <p className="text-xs text-muted-foreground/80 animate-pulse">
            Authenticating session...
          </p>
        </div>
      </div>
      <span className="sr-only">Loading application…</span>
    </div>
  );
}
