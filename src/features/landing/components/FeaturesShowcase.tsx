import { Receipt, TrendingUp, Users, Zap } from "lucide-react";

export default function FeaturesShowcase() {
  const features = [
    {
      title: "Elegant Invoice Creation",
      description:
        "Build invoices in seconds. Customize billing items, add taxes, specify terms, and produce clean layouts that look great on screen or printed.",
      icon: Receipt,
      accent: "from-primary/20 to-primary/5",
    },
    {
      title: "Centralised Client Directory",
      description:
        "No more hunting down details. Maintain clean business files with saved addresses, contact emails, specific tax rates, and histories.",
      icon: Users,
      accent: "from-accent/20 to-accent/5",
    },
    {
      title: "Real-time Revenue Analytics",
      description:
        "Receive instant updates when invoices are drafted or paid. Track overdue accounts and monitor monthly growth with clean visual statistics.",
      icon: TrendingUp,
      accent: "from-primary/20 to-primary/5",
    },
    {
      title: "Built for Frictionless Speed",
      description:
        "Quick toggles between light and dark modes, mobile-first layouts, and modern typography keep your billing workflow completely smooth.",
      icon: Zap,
      accent: "from-accent/20 to-accent/5",
    },
  ];

  return (
    <section className="relative py-20 lg:py-28 bg-background">
      {/* Decorative background blur */}
      <div className="absolute right-0 bottom-0 w-80 h-80 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary">
            <span>Features Overview</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Everything you need, nothing you don't
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Polypous focuses on the core billing operations so you can spend
            less time chasing payments and more time running your business.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="flex flex-col sm:flex-row items-start gap-5 p-6 rounded-2xl bg-card/40 border border-border/60 hover:bg-card/85 hover:border-primary/20 transition-all duration-300"
              >
                {/* Icon Container */}
                <div
                  className={`p-3.5 rounded-xl bg-linear-to-br ${feature.accent} text-foreground shrink-0 border border-border`}
                >
                  <Icon className="w-6 h-6 text-primary" />
                </div>

                {/* Text Info */}
                <div className="space-y-2 mt-2 sm:mt-0">
                  <h3 className="text-lg font-bold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
