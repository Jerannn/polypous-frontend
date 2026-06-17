import { CURRENCIES } from "./constants";

export const formatCurrency = (amount: number, currencyCode: string) => {
  const currency = CURRENCIES.find((c) => c.code === currencyCode);

  return new Intl.NumberFormat(currency?.locale, {
    style: "currency",
    currency: currencyCode,
  }).format(amount);
};
