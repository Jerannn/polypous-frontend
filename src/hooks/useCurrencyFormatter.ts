import { useAuth } from "@/features/auth/AuthProvider";
import { CURRENCIES } from "@/utils/constants";

export default function useCurrencyFormatter() {
  const { user } = useAuth();

  return (amount: number) => {
    if (!amount) return "";

    const currency = CURRENCIES.find((c) => c.code === user?.currency);

    return new Intl.NumberFormat(currency?.locale, {
      style: "currency",
      currency: user?.currency ?? "USD",
    }).format(amount);
  };
}
