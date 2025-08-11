import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Cards from "./Cards";
function SelectTopic() {
  return (
    <div className="md:border-1 grid my-2 mx-2 md:my-10 md:mx-20 ">
      <Cards/>
      <div className="my-5 flex flex-col  ">
        <div className="flex flex-col gap-y-1">
          <label htmlFor="topic-input" className="text-sm font-medium">
            Which category you want to pick ?
          </label>
          <Input
            className="focus-visible:ring-0 placeholder:font-sans placeholder:font-normal placeholder:text-neutral-400 placeholder:dark:text-neutral-400 placeholder:text-sm"
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
            className="focus-visible:ring-0  overflow-y-auto placeholder:font-sans placeholder:font-normal placeholder:text-neutral-400 placeholder:dark:text-neutral-400 placeholder:text-sm"
            id="topic-textarea"
            placeholder="e.g. Extra focus on basic concepts"
          />
        </div>
      </div>
    </div>
  );
}

export default SelectTopic;
