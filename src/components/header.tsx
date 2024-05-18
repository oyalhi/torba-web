"use client";

import { track } from "@vercel/analytics/react";
import Image from "next/image";
import { appConfig } from "../utils/app-config";
import { trackKeys } from "../utils/constants";

export function Header() {
  return (
    <nav className="fixed top-0 z-10 w-full px-4 py-2 bg-cyan-950">
      <div className="flex flex-row items-center max-w-screen-lg mx-auto">
        <Image src="/logo.png" alt="logo" className="w-10 h-10" width={80} height={80} />
        <h1 className="ml-4 text-2xl font-bold text-white">Torba Split</h1>

        <div className="flex-grow" />

        <a
          href={appConfig.clientUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary btn-sm"
          onClick={() => {
            track(trackKeys.buttonClickTryNow, { source: "header" });
          }}>
          Try Now
        </a>
      </div>
    </nav>
  );
}
