import { type ChangeEvent,useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import ActionButtonContent from "@/components/ActionButtonContent";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ApiError } from "@/utils/apiError";

import useUploadLogo from "../hooks/use-upload-business-logo";

type BusinessBrandingFormProps = {
  initialLogo: string | null;
};

export default function BusinessBrandingForm({
  initialLogo,
}: BusinessBrandingFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { updateBusinessLogo, isUpdating } = useUploadLogo();

  useEffect(() => {
    if (initialLogo) {
      setImage(initialLogo);
    }
  }, [initialLogo]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) return;

    setFile(selectedFile);
    setImage(URL.createObjectURL(selectedFile));
  };

  const clearSelectedLogo = () => {
    if (file && image) {
      URL.revokeObjectURL(image);
      setImage(null);
      setFile(null);
    }

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleReset = () => clearSelectedLogo();

  const handleCancel = () => {
    clearSelectedLogo();

    if (initialLogo) {
      setImage(initialLogo);
    }
  };

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();

    formData.append("logo", file);

    try {
      await updateBusinessLogo(formData);
      handleReset();
      toast.success("Logo updated successfully!");
    } catch (error) {
      if (error instanceof ApiError && error.statusCode === 400) {
        setError(error.message);
      }
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Invoice Branding</CardTitle>
        <CardDescription>
          Customize the look and feel of your invoices
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <Field>
              <FieldLabel>Company logo</FieldLabel>
              <Input
                type="file"
                accept="image/*"
                className="cursor-pointer"
                ref={inputRef}
                onChange={handleFileChange}
                disabled={isUpdating}
              />

              {image && (
                <div className="max-w-48 max-h-48 overflow-hidden rounded-lg">
                  <img src={image} className="object-cover w-full" />
                </div>
              )}

              {error && <FieldError>{error}</FieldError>}
            </Field>

            <div className="self-end">
              {image && (
                <Button
                  type="button"
                  variant="outline"
                  className="mr-2"
                  onClick={handleCancel}
                  disabled={isUpdating}
                >
                  Cancel
                </Button>
              )}

              <Button type="submit" className="self-end" disabled={isUpdating}>
                <ActionButtonContent
                  action={isUpdating ? "Saving..." : "Save changes"}
                  isLoading={isUpdating}
                />
              </Button>
            </div>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
