import Link from "next/link";
import React from "react";
import { PiGithubLogoDuotone } from "react-icons/pi";

function Hero() {
  return (
    <section className="bg-white lg:grid lg:h-screen lg:justify-center lg:align-middle">
      <div className="mx-auto w-screen max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-prose text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            Understand Your Syllabus
            <strong className="text-[#fcbb00]"> Boost </strong>
            Your Marks
          </h1>

          <p className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed">
            Effortlessly generate learning modules from your syllabus PDFs, or
            enter any topic to create custom modules tailored to your needs.
          </p>

          <div className="mt-4 flex justify-center gap-4 sm:mt-6">
            <Link
              className="inline-block rounded-sm border-1 border-[#fcbb00] bg-[#fcbb00] px-5 py-3 font-medium text-[#482100] shadow-sm transition-colors hover:bg-[#ffdd1b] hover:border-[#fcbb00]"
              href="/home"
            >
              Get Started
            </Link>

            <Link
              className="flex items-center justify-center gap-x-1 rounded-sm border border-gray-200 px-5 py-3 font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 hover:text-gray-900"
              href="https://github.com/aritradhabal/PrepPal"
              rel="noopener noreferrer"
              target="_blank"
            >
              <PiGithubLogoDuotone className="text-[#482100]" />{" "}
              <p className="text-[#482100]">Github</p>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
