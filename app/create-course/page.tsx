import React from "react";
import { GiWhiteBook } from "react-icons/gi";
import { GiOpenFolder } from "react-icons/gi";
import { GiChoice } from "react-icons/gi";
import { RiSettings2Fill } from "react-icons/ri";

function CreateCourse() {
  const StepperOptions = [
    {
      id: 1,
      name: "Category",
      icon: <GiWhiteBook />,
    },
    {
      id: 2,
      name: "Topics",
      icon: <GiOpenFolder />,
    },
    {
      id: 3,
      name: "Options",
      icon: <RiSettings2Fill />,
    },
  ];

  return (
    <div>
      <div className="flex justify-center items-center">
        <h2 className="font-bold text-3xl my-8">Create Course</h2>
      </div>
      <ul className="flex items-center justify-center gap-x-5">
        {StepperOptions.map((item, id) => (
          <div key={item.id} className="flex items-center gap-x-5">
            <div className="flex justify-center items-center gap-x-1">
              <div className="bg-gray-200 text-gray-800 rounded-full p-1">{item.icon}</div>
              <div className="text-sm font-medium text-gray-800">{item.name}</div>
            </div>
            {item.id <= 2 && (
              <hr className="w-[10px] md:w-[200px] border-1 border-gray-500" />
            )}
          </div>
        ))}
      </ul>
    </div>
  );
}

export default CreateCourse;
