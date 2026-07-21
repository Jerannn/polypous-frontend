import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  Receipt,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/auth/AuthProvider";

export default function HeroSection() {
  const { isAuthenticated } = useAuth();

  return (
    <section className="relative overflow-hidden py-20 lg:py-28 bg-linear-to-b from-background to-card/50">
      {/* Decorative Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[14px_24px] mask-[radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Decorative Blur Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Text Content Block */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6 max-w-2xl">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary transition-all duration-300 hover:bg-primary/15">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Smart Billing & Invoicing</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none bg-linear-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              Invoices that get paid. <br />
              <span className="text-primary bg-linear-to-r from-primary to-primary/80 bg-clip-text">
                Relationships
              </span>{" "}
              that grow.
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl">
              Polypous streamlines your entire client billing cycle. Craft
              polished, brand-aligned invoices, manage client billing data, and
              track revenue health from one minimalist interface.
            </p>

            {/* Quick Benefits list */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4.5 h-4.5 text-primary shrink-0" />
                <span>Unlimited invoices & clients</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4.5 h-4.5 text-primary shrink-0" />
                <span>Secure client directory</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4.5 h-4.5 text-primary shrink-0" />
                <span>Real-time payment tracking</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4.5 h-4.5 text-primary shrink-0" />
                <span>Beautiful financial dashboard</span>
              </li>
            </ul>

            {/* Call To Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full sm:w-auto">
              {isAuthenticated ? (
                <>
                  <Button
                    size="lg"
                    className="h-12 px-6 text-base font-semibold group"
                    asChild
                  >
                    <Link to="/dashboard">
                      Go to Dashboard
                      <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-12 px-6 text-base font-semibold"
                    asChild
                  >
                    <Link to="/invoices">View Invoices</Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    size="lg"
                    className="h-12 px-6 text-base font-semibold group"
                    asChild
                  >
                    <Link to="/auth/register">
                      Start Invoicing Free
                      <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-12 px-6 text-base font-semibold"
                    asChild
                  >
                    <Link to="/auth/login">Login to Account</Link>
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Interactive CSS Mockup Block */}
          <div className="lg:col-span-5 relative w-full flex justify-center lg:justify-end">
            <div className="relative w-full max-w-110 aspect-square lg:aspect-auto lg:h-115 flex items-center justify-center">
              {/* Decorative behind elements */}
              <div className="absolute inset-0 bg-linear-to-tr from-primary/10 to-accent/10 rounded-3xl blur-2xl -rotate-6 scale-95" />

              {/* Mockup Card 1: Invoice Preview */}
              <div className="absolute top-4 left-4 right-12 bottom-20 bg-card border border-border shadow-xl rounded-2xl p-5 flex flex-col space-y-4 hover:-translate-y-1 transition-transform duration-300 ease-out z-10">
                {/* Invoice Header */}
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                      <Receipt className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold leading-none text-foreground">
                        INV-2026-004
                      </h4>
                      <span className="text-[10px] text-muted-foreground">
                        Due in 14 days
                      </span>
                    </div>
                  </div>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-primary/15 text-primary text-[10px] font-medium border border-primary/20">
                    Draft
                  </span>
                </div>

                <div className="border-t border-dashed border-border/80 pt-3 flex justify-between items-center text-[11px]">
                  <div>
                    <p className="text-muted-foreground text-[10px] uppercase font-bold">
                      Client
                    </p>
                    <p className="font-semibold text-foreground mt-0.5">
                      Acme Corporation
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-muted-foreground text-[10px] uppercase font-bold">
                      Date Issued
                    </p>
                    <p className="font-semibold text-foreground mt-0.5">
                      Jul 21, 2026
                    </p>
                  </div>
                </div>

                {/* Items */}
                <div className="flex-1 flex flex-col space-y-2">
                  <p className="text-muted-foreground text-[10px] uppercase font-bold border-b border-border pb-1">
                    Items
                  </p>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-foreground">
                      Brand Identity Design
                    </span>
                    <span className="font-semibold text-foreground">
                      $1,200.00
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-foreground">
                      Frontend Engineering
                    </span>
                    <span className="font-semibold text-foreground">
                      $2,400.00
                    </span>
                  </div>
                </div>

                {/* Invoice Footer Total */}
                <div className="border-t border-border pt-3 flex justify-between items-center">
                  <span className="text-xs font-bold text-foreground">
                    Total Due
                  </span>
                  <span className="text-sm font-extrabold text-foreground">
                    $3,600.00
                  </span>
                </div>
              </div>

              {/* Mockup Card 2: Revenue Analytics Widget */}
              <div className="absolute right-0 bottom-4 w-52 bg-card border border-border shadow-2xl rounded-2xl p-4 flex flex-col space-y-3 hover:-translate-y-1 transition-transform duration-300 ease-out z-20">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                    <TrendingUp className="w-3.5 h-3.5 text-accent" />
                    <span>Monthly Growth</span>
                  </div>
                  <span className="text-[10px] font-bold text-accent">
                    +24.8%
                  </span>
                </div>

                <div>
                  <span className="text-2xl font-black text-foreground">
                    $12,450
                  </span>
                  <span className="text-[10px] text-muted-foreground block">
                    Revenue this month
                  </span>
                </div>

                {/* Tiny CSS Sparkline Chart */}
                <div className="h-9 flex items-end gap-1 pt-2">
                  <div className="flex-1 bg-muted rounded-t h-[30%] hover:bg-primary/50 transition-colors" />
                  <div className="flex-1 bg-muted rounded-t h-[45%] hover:bg-primary/50 transition-colors" />
                  <div className="flex-1 bg-muted rounded-t h-[60%] hover:bg-primary/50 transition-colors" />
                  <div className="flex-1 bg-primary/20 rounded-t h-[40%] hover:bg-primary/50 transition-colors" />
                  <div className="flex-1 bg-primary/40 rounded-t h-[75%] hover:bg-primary/50 transition-colors" />
                  <div className="flex-1 bg-primary rounded-t h-[90%] transition-colors" />
                </div>
              </div>

              {/* Mockup Card 3: Client Count Widget */}
              <div className="absolute top-2 right-4 w-32 bg-card border border-border shadow-lg rounded-xl p-2.5 flex items-center gap-2 hover:-translate-y-1 transition-transform duration-300 ease-out z-10 opacity-80 sm:opacity-100">
                <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                  <Users className="w-4.5 h-4.5" />
                </div>
                <div>
                  <span className="text-[10px] text-muted-foreground block font-medium leading-tight">
                    Active Clients
                  </span>
                  <span className="text-sm font-bold text-foreground">18</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
