import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FileUpload } from "@/components/ui/file-upload";
function SelectCategory() {
  return (
    <div className="grid grid-cols-2 my-10 mx-20 max-h-100">
      <div className="w-full">
        <FileUpload />
      </div>

      <div className="pl-10  my-5 flex flex-col max-h-100 max-w-100">
        <div className="flex flex-col gap-y-1">
          <label htmlFor="topic-input" className="text-sm font-medium">
            Which topic you want to select ?
          </label>
          <Input
            className="focus-visible:ring-0 min-w-100 placeholder:font-sans placeholder:font-normal placeholder:text-neutral-400 placeholder:dark:text-neutral-400 placeholder:text-sm"
            id="topic-input"
            type="text"
            placeholder="e.g. Hydrology from Semester 5"
          />
        </div>
        <div className="my-2 flex flex-col gap-y-1">
          <label htmlFor="topic-textarea" className="text-sm font-medium">
            Additional information (Optional)
          </label>
          <Textarea
            className="focus-visible:ring-0 min-w-100 min-h-50 max-h-50 overflow-y-auto placeholder:font-sans placeholder:font-normal placeholder:text-neutral-400 placeholder:dark:text-neutral-400 placeholder:text-sm"
            id="topic-textarea"
            placeholder="e.g. Extra focus on basic concepts"
          />
        </div>
      </div>
    </div>
  );
}

export default SelectCategory;
