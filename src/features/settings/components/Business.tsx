import useRetrieveBusiness from "../hooks/use-retrieve-business";
import BusinessBrandingForm from "./BusinessBrandingForm";
import BusinessDetailsForm from "./BusinessDetailsForm";

export default function Business() {
  const { business, isRetrieving } = useRetrieveBusiness();

  return (
    <div className="space-y-5">
      <BusinessDetailsForm
        initialValues={business}
        isRetrieving={isRetrieving}
      />
      <BusinessBrandingForm initialLogo={business?.brandUrl || null} />
    </div>
  );
}
