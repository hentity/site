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
        <div className="hidden lg:grid lg:grid-cols-1 lg:p-4 lg:h-5/6 slg:content-center lg:w-1/2 lg:justify-items-end">
          <div className="">
            <Image
              className=""
              alt="Portrait of the blogger as a young man"
              src="/img/archflick2.jpg"
              width={540}
              height={360}
            />
            <div className="p-4">
              <div className="font-sans text-textMuted text-center">
                A portrait of the blogger as a young man
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col p-4 h-5/6 xl:max-w-[30%] lg:max-w-[45%] abg-green-100">
          <div className="font-sans font-bold text-textPrimary text-4xl mb-4">
            What is this place?
          </div>
          <div className="font-sans text-textMuted">
            Henlighted is a sporadically-updated, questionably educational and
            entirely improvised trainwreck of a blog that I put together in late
            2023 for lack of anything better to do.
          </div>
          <div className="mt-4 font-sans font-bold text-4xl mb-4 text-textPrimary">
            Why is it here?
          </div>
          <div className="font-sans text-textMuted">
            I created henlightened with two goals in mind:
          </div>
          <ul className="font-sans text-textMuted list-outside list-disc list-decimal ml-8 mt-2">
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
          <div className="font-sans text-textMuted">
            Oh and also for fame, glory and internet immortalisation.
          </div>
          <div className="hidden lg:mt-4 lg:font-sans lg:font-bold lg:text-4xl lg:mb-4 lg:flex lg:items-center">
            {/*}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="35"
              height="35"
              viewBox="1 1 19 19"
              className="mr-2 bgq-blue-100"
            >
              <path d="M17 7V5H5v12h2V8.414l10.293 10.293 1.414-1.414L8.414 7H17z" />
            </svg>*/}
            <div className="mt-4 font-sans font-bold text-4xl mb-4 text-textPrimary">
              {"← Who's this poser?"}
            </div>
          </div>
          <div className="lg:hidden mt-4 font-sans font-bold text-4xl mb-4 flex items-center text-textPrimary">
            <span>Who's talking?</span>
          </div>
          <div className="font-sans text-textMuted">
            I'm Henry, a 21-year old software engineering student living in
            Melbourne, Australia. If by some miracle you are not my mum or close
            friend and would like to chat, send an email to{" "}
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
            {". I'm mostly harmless :)"}
          </div>
          <div className="flex flex-col pt-4 lg:hidden items-center">
            <Image
              className=""
              alt="Portrait of the blogger as a young man"
              src="/img/archflick2.jpg"
              width={540}
              height={360}
            />
            <div className="p-4">
              <div className="font-sans text-center text-textMuted">
                A portrait of the blogger as a young man
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
