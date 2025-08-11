import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

type dialog_props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  subjects: any;
  subject_id: number | null;
};

const Dialog_render = ({
  open,
  setOpen,
  subjects,
  subject_id,
}: dialog_props) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {subjects.find((s: any) => s.id === subject_id)?.subject_name}
          </DialogTitle>
          <DialogDescription className="flex flex-col justify-center items-start">
            {subjects
              ?.find((s: any) => s.id === subject_id)
              ?.modules?.map((module: any) => (
                <li key={module.module_id}> {module.module_name}</li>
              ))}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button className="cursor-pointer">Select</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default Dialog_render;
