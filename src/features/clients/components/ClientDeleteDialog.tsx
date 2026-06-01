import { Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

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

import useDeleteClient from "../hooks/use-delete-client";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type ClientDeleteProps = {
  clientId: string;
};

export default function ClientDeleteDialog({ clientId }: ClientDeleteProps) {
  const [open, setOpen] = useState(false);
  const { deleteClient, isDeleting, isError } = useDeleteClient();

  const handleDelete = async () => {
    const result = await deleteClient(clientId);

    if (result.status === "success") {
      setOpen(false);
      toast.success("Client deleted successfully!");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button variant="destructive">
                <Trash2 />
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent>Delete client</TooltipContent>
        </Tooltip>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this client? This action cannot be
              reversed after confirmation.
            </DialogDescription>
          </DialogHeader>
          {isError && (
            <p className="text-red-500">Something went wrong, try again</p>
          )}
          <DialogFooter>
            <DialogClose asChild disabled={isDeleting}>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              type="button"
              onClick={handleDelete}
              disabled={isDeleting}
              variant="destructive"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
