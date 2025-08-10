import React from "react";
import Header from "../_components/Header";

function layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="max-h-svh">
      <div>
        <Header />
      </div>
      <div className="h-full">{children}</div>
    </div>
  );
}

export default layout;
