"use client";

import Image from "next/image";
import React from "react";
import { MdPublic } from "react-icons/md";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoFlash } from "react-icons/io5";
import { MdAccountCircle } from "react-icons/md";
import { IoHome } from "react-icons/io5";
import { Progress } from "@/components/ui/progress";

function Sidebar() {
  const pathname = usePathname();

  const sidebarItems = [
    { id: 1, name: "Home", icon: <IoHome />, link: "/home" },
    { id: 2, name: "Explore", icon: <MdPublic />, link: "/home/explore" },
    {
      id: 3,
      name: "Upgrade",
      icon: <IoFlash />,
      link: "/home/upgrade",
    },
    {
      id: 4,
      name: "Profile",
      icon: <MdAccountCircle />,
      link: "/home/profile",
    },
  ];

  return (
    <div className="max-w-64 h-full fixed border-1 border-gray-300 flex flex-col justify-between">
      <div className="flex flex-col justify-start items-center py-5 px-5">
        <Link href={"/"} className="flex items-center px-5">
          <Image
            src={"/logo_small.png"}
            width={40}
            height={40}
            alt="Quick Thunder Logo"
          />
          <p className="font-bold">PrepPal</p>
        </Link>
        <hr className="my-5 min-w-full border-1 border-gray-300 " />
        <ul className="w-full">
          {sidebarItems.map((item) => (
            <Link
              key={item.id}
              className="my-2 flex items-center px-5 py-3 rounded-md hover:bg-gray-100 cursor-pointer"
              href={item.link}
            >
              {
                <div
                  className={`text-2xl ${
                    pathname === item.link ? "text-[#984f08]" : ""
                  }`}
                >
                  {item.icon}
                </div>
              }
              <p
                className={`font-medium px-2 ${
                  pathname === item.link ? "font-semibold text-[#482100]" : ""
                }`}
              >
                {item.name}
              </p>
            </Link>
          ))}
        </ul>
      </div>

      <div className="p-5 border-1 border-gray-200 m-2 rounded-sm">
        <Progress value={30} />
        <p className="text-xs font-medium text-gray-700 pt-1">
          3 out of 5 Courses Created
        </p>
        <p className="text-sm font-bold text-gray-900 pt-1 overflow-y-hidden">
          Upgrade Your Plan To Create Unlimited Courses
        </p>
      </div>
    </div>
  );
}

export default Sidebar;
