import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-auto border-t border-gray-200 bg-[#fffeea] px-4 py-2 text-gray-900">
      <p className="text-center font-medium">
        Test Your Preparation{" "}
        <Link
          href="https://quizflow.me/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block underline"
        >
          Take Quiz Now!
        </Link>
      </p>
    </div>
  );
}
export default Footer;
