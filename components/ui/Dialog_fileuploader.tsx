import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";
import { Button } from "./button";
import { RiLoader2Fill } from "react-icons/ri";
import Link from "next/link";

type props = {
  openDialog: boolean;
  disabledState: any;
};

function Dialog_fileuploader({ openDialog, disabledState }: props) {
  return (
    <Dialog open={openDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex gap-x-2">
            <RiLoader2Fill />
            Processing your file
          </DialogTitle>
        </DialogHeader>

        <DialogFooter>
          <Button disabled={disabledState}>Go To Next</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default Dialog_fileuploader;
