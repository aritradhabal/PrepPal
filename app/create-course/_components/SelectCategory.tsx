import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FileUpload } from "@/components/ui/file-upload";
function SelectCategory() {
  return (
    <div className="grid my-2 mx-2 md:my-10 md:mx-20">
      <div className="py-5 w-full rounded-lg">
        <FileUpload />
      </div>
    </div>
  );
}

export default SelectCategory;
