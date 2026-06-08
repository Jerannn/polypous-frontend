import { Trash2 } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type ConfirmDeletionModalProps = {
  onConfirm: () => Promise<boolean>;
  isPending: boolean;
  errorMessage?: string;
  description?: string;
  trigger?: React.ReactNode;
};

export default function ConfirmDeletionModal({
  onConfirm,
  isPending,
  errorMessage,
  description = "Are you sure you want to delete this item? This action cannot be reversed after confirmation.",
  trigger,
}: ConfirmDeletionModalProps) {
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    const isDeleted = await onConfirm();
    setOpen(isDeleted);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogTrigger asChild>
          {trigger ? (
            trigger
          ) : (
            <Button variant="destructive">
              <Trash2 />
            </Button>
          )}
        </DialogTrigger>

        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          <DialogFooter>
            <DialogClose asChild disabled={isPending}>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              type="button"
              onClick={handleDelete}
              disabled={isPending}
              variant="destructive"
            >
              {isPending ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
