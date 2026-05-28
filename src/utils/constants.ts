import {
  ChartColumn,
  DollarSign,
  FileText,
  LayoutDashboard,
  Settings,
  Users,
} from "lucide-react";

export const navMainList = [
  {
    title: "Dashboard",
    url: "/dashboard",
    description: "Welcome back! Here's your business overview",
    icon: LayoutDashboard,
  },
  {
    title: "Clients",
    url: "/clients",
    description: "Manage your client relationships",
    icon: Users,
  },
  {
    title: "Invoices",
    url: "/invoices",
    description: "Create and manage your invoices",
    icon: FileText,
  },
  {
    title: "Payments",
    url: "/payments",
    description: "Track all received payments and revenue",
    icon: DollarSign,
  },
  {
    title: "Analytics",
    url: "/analytics",
    description: "Insights into your business performance",
    icon: ChartColumn,
  },
  {
    title: "Settings",
    url: "/settings",
    description: "Manage your account settings and preferences",
    icon: Settings,
  },
];

export const LIMIT = 10;
