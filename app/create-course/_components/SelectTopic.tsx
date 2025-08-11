import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Cards from "./ui/Cards";
function SelectTopic() {
  return (
    <div className="grid my-8 md:my-5 mx-5 md:mx-20 gap-y-5">
      <div className="flex flex-col gap-y-1">
        <label htmlFor="topic-input" className="text-sm font-medium">
          Search
        </label>
        <Input
          className="focus-visible:ring-0 placeholder:font-sans placeholder:font-normal placeholder:text-neutral-400 placeholder:dark:text-neutral-50 placeholder:text-sm"
          id="topic-input"
          type="text"
          placeholder="e.g. Metrology & Instrumentation"
        />
      </div>

      <Cards />

      <div className="flex flex-col  ">
        <div className="flex flex-col gap-y-1">
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
