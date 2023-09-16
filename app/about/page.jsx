"use client";

import "@/app/globals.css";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function About() {
  const [copied, setCopied] = useState(false);

  const handleEmailClick = () => {
    navigator.clipboard.writeText("hhame4@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <div className="flex h-screen">
        <div className="grid grid-cols-1 p-4 h-5/6 content-center w-1/2 justify-items-end abg-blue-100">
          <div className="">
            <Image
              className=""
              alt="Portrait of the blogger as a young man"
              src="/img/archflick2.jpg"
              width={540}
              height={360}
            />
            <div className="p-4">
              <div className="font-mulish font-light text-center">
                A portrait of the blogger as a young man
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center p-4 pr-20 h-5/6 max-w-[50%] abg-green-100">
          <div className="font-mulish font-bold text-4xl mb-4">
            What is this place?
          </div>
          <div className="font-mulish">
            Henlighted is a sporadically-updated, questionably-populated and
            entirely improvised trainwreck of a blog that I put together in late
            2023 as a procrastination project.
          </div>
          <div className="mt-4 font-mulish font-bold text-4xl mb-4">
            Why is it here?
          </div>
          <div className="font-mulish">
            I created henlightened with two goals in mind:
          </div>
          <ul class="font-mulish list-outside list-disc list-decimal ml-12 mt-2">
            <li className="pl-2 pb-2">
              <b>Learning to blog:</b> Like many of us, I spend inordinate
              amounts of time consuming media. So I thought, why not spend a
              little time on the other side?
            </li>
            <li className="pl-2 pb-2">
              <b>Blogging to learn:</b> Learning stuff is meant to be good for
              you, right? And they say one of the best ways to learn is to
              teach.
            </li>
          </ul>
          <div className="font-mulish">
            Oh and also for fame, glory and internet immortalisation.
          </div>
          <div className="mt-4 font-mulish font-bold text-4xl mb-4 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="35"
              height="35"
              viewBox="1 1 19 19"
              className="mr-2 bgq-blue-100"
            >
              <path d="M17 7V5H5v12h2V8.414l10.293 10.293 1.414-1.414L8.414 7H17z" />
            </svg>
            <span>Who's this poser?</span>
          </div>
          <div className="font-mulish">
            I'm Henry, a 21-year old human making my clumsy way through a
            software engineering degree in Melbourne, Australia. If by some
            miracle you are not my mum or close friend and would like to chat,
            send an email to{" "}
            <div className="relative inline-block group">
              <span
                className="cursor-pointer hover:font-bold underline "
                onClick={handleEmailClick}
              >
                {" "}
                hhame4@gmail.com
              </span>
              {copied && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-black text-white text-xs rounded py-1 px-2 shadow">
                  Copied!
                </div>
              )}
            </div>
            . I'm mostly harmless :)
          </div>
        </div>
      </div>
    </>
  );
}
