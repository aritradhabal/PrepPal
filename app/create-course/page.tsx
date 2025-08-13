"use client";
import { Button } from "@/components/ui/button";
import React, { useState, useContext } from "react";
import { GiWhiteBook } from "react-icons/gi";
import { GiOpenFolder } from "react-icons/gi";
import { GiChoice } from "react-icons/gi";
import { RiSettings2Fill } from "react-icons/ri";
import { text } from "stream/consumers";
import SelectCategory from "./_components/SelectCategory";
import SelectTopic from "./_components/SelectTopic";
import SelectOptions from "./_components/SelectOptions";
import { Data_context, DataShape } from "./_Context/DataContext";
import { createContext } from "react";

export const activeIndexContext = createContext<{
  activeIndex: number;
  setActiveIndex: (value: number) => void;
}>({
  activeIndex: 0,
  setActiveIndex: () => {}, // Default no-op function
});
function CreateCourse() {
  const [value, setValue] = useState<DataShape>({ subjects: [] });

  const [activeIndex, setActiveIndex] = useState(0);

  const StepperOptions = [
    {
      id: 0,
      name: "Syllabus",
      icon: <GiWhiteBook />,
    },
    {
      id: 1,
      name: "Topics",
      icon: <GiOpenFolder />,
    },
    {
      id: 2,
      name: "Options",
      icon: <RiSettings2Fill />,
    },
  ];

  return (
    <Data_context.Provider value={{ value, setValue }}>
      <div className="h-full">
        {/* {Header} */}
        <div className="flex justify-center items-center">
          <h2 className="font-extrabold text-3xl my-8 text-black">
            Create Course
          </h2>
        </div>
        {/* {Stepper} */}
        <ul className="flex items-center justify-center gap-x-2 md:gap-x-5">
          {StepperOptions.map((item) => (
            <div
              key={item.id}
              className="text-xs md:text-base flex items-center gap-x-2 md:gap-x-5"
            >
              <div className="flex justify-center items-center gap-x-1">
                <div
                  className={`bg-gray-200 text-gray-500 rounded-full p-1
                ${activeIndex >= item.id ? "text-stone-900" : ""}`}
                >
                  {item.icon}
                </div>
                <div
                  className={`text-sm font-semibold text-gray-600 
                ${activeIndex >= item.id ? "text-gray-950" : ""}`}
                >
                  {item.name}
                </div>
              </div>
              {item.id < 2 && (
                <hr
                  className={`w-5 md:w-[200px] border-1 transition-all duration-500 ease-in-out ${
                    activeIndex > item.id
                      ? "border-gray-950"
                      : "border-gray-200"
                  }`}
                />
              )}
            </div>
          ))}
        </ul>

        {/* {Components} */}
        <activeIndexContext.Provider value={{ activeIndex, setActiveIndex }}>
          {activeIndex == 0 ? <SelectCategory /> : null}
          {activeIndex == 1 ? <SelectTopic /> : null}
          {activeIndex == 2 ? <SelectOptions /> : null}
          {/* {Next and Previous Burttons} */}
        </activeIndexContext.Provider>
        <div className="mx-5 mb-2 md:mx-20 flex justify-between items-center ">
          <Button
            onClick={() => setActiveIndex(activeIndex - 1)}
            disabled={activeIndex < 1}
            variant={"outline"}
            className={`cursor-pointer rounded-sm border-1 text-[#482100] hover:bg-[#fcbb00] hover:border-1 hover:border-[#fcbb00] transition-colors`}
          >
            Previous
          </Button>
          <Button
            hidden={activeIndex > 1}
            onClick={() => setActiveIndex(activeIndex + 1)}
            className="cursor-pointer rounded-sm border-1 border-[#ffec46] bg-[#ffec46] text-[#482100] hover:bg-[#fcbb00] hover:border-1 hover:border-[#fcbb00] transition-colors"
          >
            Next
          </Button>
          <Button
            hidden={activeIndex < 2}
            onClick={() => console.log(activeIndex)}
            className="cursor-pointer rounded-sm border-1 border-[#ffec46] bg-[#ffec46] text-[#482100] hover:bg-[#fcbb00] hover:border-1 hover:border-[#fcbb00] transition-colors"
          >
            Generate
          </Button>
        </div>
      </div>
    </Data_context.Provider>
  );
}

export default CreateCourse;
