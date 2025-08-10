import React from "react";
import Header from "../_components/Header";

function layout({ children }: Readonly<{ children: React.ReactNode }>) {
    
  return (
    <div>
      <div>
        <Header />
      </div>
      <div>{children}</div>
    </div>
  );
}

export default layout;
