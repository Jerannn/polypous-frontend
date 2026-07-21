import { ArrowRight,LineChart, Send, UserPlus, Users } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Quick Account Setup",
      description:
        "Sign up in seconds. Configure your company profile, upload your branding logo, and set your default billing currency.",
      icon: UserPlus,
      color: "text-primary bg-primary/10 border-primary/20",
    },
    {
      number: "02",
      title: "Organise Client Profiles",
      description:
        "Maintain a centralized client directory. Save billing addresses, specific tax rates, and default payment terms.",
      icon: Users,
      color: "text-accent bg-accent/10 border-accent/20",
    },
    {
      number: "03",
      title: "Draft & Dispatch Invoices",
      description:
        "Quickly select client profiles, add line items, and generate modern, brand-aligned invoices sent instantly via email.",
      icon: Send,
      color: "text-primary bg-primary/10 border-primary/20",
    },
    {
      number: "04",
      title: "Track Status & Grow",
      description:
        "Keep tabs on outstanding balances with real-time status tracking and watch your business scale with visual dashboard statistics.",
      icon: LineChart,
      color: "text-accent bg-accent/10 border-accent/20",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="relative py-20 lg:py-28 bg-card/30 border-y border-border/50"
    >
      {/* Background radial accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-75 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-xs font-semibold text-accent">
            <span>Workflow Guide</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Up and running in minutes
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            No complex configurations. No steep learning curves. Polypous is
            built to feel intuitive and natural from day one.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="group relative bg-card border border-border/80 rounded-2xl p-6 shadow-md hover:shadow-xl hover:border-primary/30 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Step Connectors (Hidden on Mobile) */}
                {index < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
                    <ArrowRight className="w-5 h-5 text-muted-foreground/30 transition-transform group-hover:translate-x-0.5" />
                  </div>
                )}

                {/* Card Header Info */}
                <div className="space-y-4">
                  {/* Icon & Big Number Row */}
                  <div className="flex justify-between items-center">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center border ${step.color}`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-4xl font-black text-foreground/5 tracking-wider select-none group-hover:text-primary/10 transition-colors">
                      {step.number}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
