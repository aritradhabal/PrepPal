import { activeIndexContext } from "@/app/create-course/page";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useContext } from "react";

export function AlertUserDialog({
  open,
  setlargefile,
  fileInputRef,
}: {
  open: boolean;
  setlargefile: any;
  fileInputRef: any;
}) {
  return (
    <AlertDialog open={open}>
      <AlertDialogTrigger>Open</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Please upload PDF smaller than 2MB
          </AlertDialogTitle>
          <AlertDialogDescription>
            You can optionally upload PDF files. You can always create Ai
            Generated Modules with only your topics, in the next step.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button
            onClick={() => {
              setlargefile((prev: any) => !prev);
              if (fileInputRef.current) {
                fileInputRef.current.value = "";
              }
            }}
          >
            Cancel
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
