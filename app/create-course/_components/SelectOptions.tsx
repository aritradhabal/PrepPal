"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function SelectOptions() {
  return (
    <div className="max-w-svw my-7 mx-0 sm:mx-10 lg:my-8 grid grid-cols-1 sm:grid-cols-2 place-content-center gap-y-5">
      <Select>
        <SelectGroup className="flex flex-col sm:flex-row justify-center items-center">
          <SelectLabel className="text-sm font-medium text-gray-950">
            Difficulty Level
          </SelectLabel>
          <SelectTrigger className="w-[90svw] sm:w-xs">
            <SelectValue placeholder="Choose an option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="easy">Easy</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="hard">Hard</SelectItem>
          </SelectContent>
        </SelectGroup>
      </Select>
      <Select>
        <SelectGroup className="flex flex-col sm:flex-row justify-center items-center">
          <SelectLabel className="text-sm font-medium text-gray-950">
            Course Duration
          </SelectLabel>
          <SelectTrigger className="w-[90svw] sm:w-xs">
            <SelectValue placeholder="Choose an option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="short">Short (&lt; 2 hr)</SelectItem>
            <SelectItem value="normal">Medium (2–4 hr)</SelectItem>
            <SelectItem value="lengthy">Long (&gt; 4 hr)</SelectItem>
          </SelectContent>
        </SelectGroup>
      </Select>

      <Select>
        <SelectGroup className="flex flex-col sm:flex-row justify-center items-center">
          <SelectLabel className="text-sm font-medium text-gray-950">
            Include Videos
          </SelectLabel>
          <SelectTrigger className="w-[90svw] sm:w-xs">
            <SelectValue placeholder="Choose an option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="yes">Yes</SelectItem>
            <SelectItem value="no">No</SelectItem>
          </SelectContent>
        </SelectGroup>
      </Select>
      <Select>
        <SelectGroup className="flex flex-col sm:flex-row justify-center items-center">
          <SelectLabel className="text-sm font-medium text-gray-950">
            Publicly Visible
          </SelectLabel>
          <SelectTrigger className="w-[90svw] sm:w-xs">
            <SelectValue placeholder="Choose an option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="true">Yes</SelectItem>
            <SelectItem value="false">No</SelectItem>
          </SelectContent>
        </SelectGroup>
      </Select>
    </div>
  );
}

export default SelectOptions;
