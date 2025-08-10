"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { GiWhiteBook } from "react-icons/gi";
import { GiOpenFolder } from "react-icons/gi";
import { GiChoice } from "react-icons/gi";
import { RiSettings2Fill } from "react-icons/ri";
import { text } from "stream/consumers";

function CreateCourse() {
  const StepperOptions = [
    {
      id: 0,
      name: "Category",
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
  const [activeIndex, setActiveIndex] = useState(0);
  console.log(activeIndex);
  return (
    <div>
      {/* {Header} */}
      <div className="flex justify-center items-center">
        <h2 className="font-extrabold text-3xl my-8 text-black">
          Create Course
        </h2>
      </div>
      {/* {Stepper} */}
      <ul className="flex items-center justify-center gap-x-5">
        {StepperOptions.map((item) => (
          <div key={item.id} className="flex items-center gap-x-5">
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
                className={`w-[10px] md:w-[200px] border-1 transition-all duration-500 ease-in-out ${
                  activeIndex > item.id ? "border-gray-950" : "border-gray-200"
                }`}
              />
            )}
          </div>
        ))}
      </ul>
      {/* {Components} */}

      {/* {Next and Previous Burttons} */}

      <div className="flex justify-between items-center mx-20">
        <Button
          onClick={() => setActiveIndex(activeIndex - 1)}
          disabled={activeIndex < 1}
          className={`cursor-pointer rounded-sm border-1 border-[#ffec46] bg-[#ffec46] text-[#482100] hover:bg-[#fcbb00] hover:border-1 hover:border-[#fcbb00] transition-colors`}
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
  );
}

export default CreateCourse;
