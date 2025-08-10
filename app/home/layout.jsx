import React from "react";
import Sidebar from "./_components/Sidebar";

function DashboardLayout({ children }) {
  return (
    <div>
      <div className="sm:w-64 hidden md:block">
        <Sidebar />
      </div>

      {/* {<div>{children}</div>} */}
    </div>
  );
}

export default DashboardLayout;
