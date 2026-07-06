import { Spinner } from "./ui/spinner";

type ActionButtonContentProps = {
  action: string;
  isLoading: boolean;
};

export default function ActionButtonContent({
  action,
  isLoading,
}: ActionButtonContentProps) {
  return (
    <>
      {isLoading && <Spinner className="mr-2" />}
      {action}
    </>
  );
}
