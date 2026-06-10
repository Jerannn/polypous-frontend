import PaymentFilters from "./PaymentFilters";
import PaymentStats from "./PaymentStats";
import PaymentTable from "./PaymentTable";

export default function PaymentContainer() {
  return (
    <div>
      <PaymentStats />
      <PaymentFilters />

      <PaymentTable />
    </div>
  );
}
