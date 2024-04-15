import React from "react";
import Particles from "./particles";
import { Link } from "react-router-dom";

export default function GuestView() {
  return (
    <div className="relative max-w-6xl min-h-screen px-4 mx-auto sm:px-6 flex flex-col items-center justify-center">
      <Particles />
      <div className="pt-32 pb-16 md:pt-52 md:pb-32 text-center">
        <div className="mb-6">
          <div className="relative inline-flex before:absolute before:inset-0">
            <Link
              className="bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-zinc-200 rounded-full py-2 px-4 transition duration-150 ease-in-out"
              to="https://github.com/HimanshuSinghBhandari/WhiteBoard"
              target="_blank"
            >
              <span className="relative inline-flex items-center">Whiteboard is Open Source</span>
            </Link>
          </div>
        </div>
        <h1 className="pb-4 font-extrabold text-3xl sm:text-5xl md:text-3xl lg:text-7xl leading-tight text-transparent bg-clip-text bg-gradient-to-r from-zinc-200/60 via-zinc-200 to-zinc-200/60">
          Digital whiteboard
          <span className="text-lg sm:text-2xl md:text-xl lg:text-2xl block">
            Visualize your thoughts and ideas
          </span>
        </h1>
        <p className="mb-8 text-lg text-zinc-300 animate-fade">
          <span className="inline-block px-2 py-1 rounded-md">Draw your ideas</span>
        </p>
      </div>
    </div>
  );
}