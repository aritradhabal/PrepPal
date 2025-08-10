import React from "react";
import Sidebar from "./_components/Sidebar";

function DashboardLayout({ children }) {
  return (
    <div className="">
      <div className="sm:w-64 hidden md:block">
        <Sidebar />
      </div>

      <div className="min-h-svh max-h-svh md:ml-64 p-10 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}

export default DashboardLayout;
