import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
function SelectCategory() {
  return (
    <div className="grid mx-10 my-10 space-y-2 w-auto border-1 place-items-center">
      <div>
        <Input type="text" placeholder="Enter a Topic" />
      </div>
      <div>
        <Textarea placeholder="Type your message here." />
      </div>
    </div>
  );
}

export default SelectCategory;
