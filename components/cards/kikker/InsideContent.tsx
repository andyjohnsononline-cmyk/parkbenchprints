"use client";

import { type ReactNode } from "react";

interface InsideContentProps {
  messageContent?: ReactNode;
}

export default function InsideContent({
  messageContent,
}: InsideContentProps) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  return (
    <div
      className="absolute inset-0 flex rounded-lg"
      style={{ backgroundColor: "#fffac0" }}
    >
      {/* Left half: personal message or blank */}
      <div className="flex w-1/2 items-center justify-center p-4">
        {messageContent}
      </div>

      {/* Right half: frog */}
      <div className="flex w-1/2 items-center justify-center p-4">
        <img
          src={`${basePath}/kikker/kikker-in-je-bil.svg`}
          alt="Kikker in je bil!"
          className="h-[75%] w-auto object-contain"
          draggable={false}
        />
      </div>
    </div>
  );
}
