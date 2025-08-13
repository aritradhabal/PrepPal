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
import { activeIndexContext } from "@/app/create-course/_Context/DataContext";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

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
          <DialogTitle className="w-full gap-x-2 flex items-center">
            <div className="w-7 h-7">
              <DotLottieReact
                src="https://lottie.host/1da7f0ba-91d3-4b37-a16f-8029d9972b20/WCIVF56TWm.lottie"
                loop
                autoplay
              />
            </div>
            <p>Processing your file</p>
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
