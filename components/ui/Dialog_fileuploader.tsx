import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useContext } from "react";
import { Button } from "./button";
import { RiLoader2Fill } from "react-icons/ri";
import { activeIndexContext } from "@/app/create-course/page";

type props = {
  openDialog: boolean;
  disabledState: any;
  setOpenDialog: any;
};

function Dialog_fileuploader({
  openDialog,
  disabledState,
  setOpenDialog,
}: props) {
  const { activeIndex, setActiveIndex } = useContext(activeIndexContext);
  const handleClick = () => {
    setOpenDialog(false);
    setActiveIndex(activeIndex + 1);
  };

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
          <Button onClick={handleClick} disabled={disabledState}>
            Go To Next
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default Dialog_fileuploader;
