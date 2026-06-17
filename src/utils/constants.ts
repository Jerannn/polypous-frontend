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

export const APP_NAME = "Polypous";

export const DEFAULT_PAGE_SIZE = 10;
export const MAX_PAGE_SIZE = 10;

/** @deprecated Use DEFAULT_PAGE_SIZE */
export const LIMIT = DEFAULT_PAGE_SIZE;

export function getNavItemByPathname(pathname: string) {
  return navMainList.find((item) => item.url === pathname);
}

export const INVOICESTATUSCLASSES: Record<string, string> = {
  paid: "text-primary",
  unpaid: "text-accent",
  overdue: "text-destructive",
} as const;

export const CURRENCIES = [
  { code: "PHP", locale: "en-PH", symbol: "₱", name: "Philippine Peso" },
  { code: "USD", locale: "en-US", symbol: "$", name: "US Dollar" },
  { code: "EUR", locale: "de-DE", symbol: "€", name: "Euro" },
  { code: "GBP", locale: "en-GB", symbol: "£", name: "British Pound" },
  { code: "JPY", locale: "ja-JP", symbol: "¥", name: "Japanese Yen" },
  { code: "CNY", locale: "zh-CN", symbol: "¥", name: "Chinese Yuan" },
  { code: "INR", locale: "hi-IN", symbol: "₹", name: "Indian Rupee" },
  { code: "IDR", locale: "id-ID", symbol: "Rp", name: "Indonesian Rupiah" },
  { code: "BRL", locale: "pt-BR", symbol: "R$", name: "Brazilian Real" },
  { code: "RUB", locale: "ru-RU", symbol: "₽", name: "Russian Ruble" },
  { code: "KRW", locale: "ko-KR", symbol: "₩", name: "South Korean Won" },
  { code: "MXN", locale: "es-MX", symbol: "$", name: "Mexican Peso" },
  { code: "VND", locale: "vi-VN", symbol: "₫", name: "Vietnamese Dong" },
  { code: "TRY", locale: "tr-TR", symbol: "₺", name: "Turkish Lira" },
  { code: "CZK", locale: "cs-CZ", symbol: "Kč", name: "Czech Koruna" },
  { code: "SEK", locale: "sv-SE", symbol: "kr", name: "Swedish Krona" },
  { code: "NOK", locale: "nb-NO", symbol: "kr", name: "Norwegian Krone" },
  { code: "DKK", locale: "da-DK", symbol: "kr", name: "Danish Krone" },
];
