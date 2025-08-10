import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Header() {
  return (
    <div className="flex justify-between items-center m-2 mr-3">
      <Link href={"/"} className="flex justify-center items-center">
        <Image
          src={"/logo_small.png"}
          width={40}
          height={40}
          alt="Quick Thunder Logo"
        />
        <p className="font-bold">PrepPal</p>
      </Link>
      <div>
        <Button className="rounded-sm border-1 border-[#fcbb00] bg-[#fcbb00] text-[#482100] hover:bg-[#ffdd1b] hover:border-1 hover:border-[#fcbb00] transition-colors">
          Sign In
        </Button>
      </div>
    </div>
  );
}

export default Header;
