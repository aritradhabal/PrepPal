import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { IoCreate } from "react-icons/io5";

function CoursesHome() {
  return (
    <div className="h-auto">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">Hello Ankita,</h2>
          <p>
            Create Ai-curated study material for your exams and share it with
            your friends.
          </p>
        </div>
        <Link href={"/create-course"}>
          <Button className="cursor-pointer rounded-sm border-1 border-[#fcbb00] bg-[#fcbb00] text-[#482100] hover:bg-[#ffdd1b] hover:border-1 hover:border-[#fcbb00] transition-colors">
            <IoCreate />
            Create
          </Button>
        </Link>
      </div>

      <div>
        <p className="mt-10 mb-2 text-md font-medium">Your Courses</p>
        <hr className="border-1 border-gray-200" />
      </div>
    </div>
  );
}

export default CoursesHome;
