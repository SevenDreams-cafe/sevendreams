import { Dispatch, type SetStateAction } from "react";
import { Button } from "@components/shadcn/Button";
import { Input } from "@components/shadcn/Input";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@components/shadcn/Dialog";

interface EditCategoriModalProps {
  editOpen: boolean;
  setEditOpen: Dispatch<SetStateAction<boolean>>;
}

export function EditCategoriModal({
  editOpen = false,
  setEditOpen,
}: EditCategoriModalProps) {
  return (
    <Dialog open={editOpen} onOpenChange={setEditOpen}>
      <DialogContent className="bg-neutral-50">
        <DialogHeader>
          <DialogTitle>Buat Kategori Baru</DialogTitle>
        </DialogHeader>
        <div className="mt-5">
          <form className="flex flex-col gap-y-4">
            <Input placeholder="Masukkan nama kategori..." />
            <div className="flex justify-end gap-x-3 items-center">
              <DialogClose
                type="button"
                className="border border-red-600 bg-red-600 hover:bg-red-500 text-neutral-50 w-min py-2 px-4 text-sm rounded-md"
              >
                Closed
              </DialogClose>
              <Button
                type="button"
                variant="secondary"
                className="border border-blue-600 bg-blue-600 hover:bg-blue-500 text-neutral-50 w-min py-2"
              >
                Buat Kategori Baru
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
