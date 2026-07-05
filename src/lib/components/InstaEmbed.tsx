"use client";

import { useRef, useState } from "react";
import { Play } from "lucide-react";

const VIDEO_SRC =
  "https://res.cloudinary.com/dpgefyzn1/video/upload/v1783291302/260219_TDB_FINAL_CSB_iz43ew.mp4";
const INSTA_URL = "https://www.instagram.com/reels/DU8pLodDEFQ/";

export default function Reel() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [state, setState] = useState<"idle" | "playing" | "paused" | "ended">(
    "idle"
  );

  const handleClick = () => {
    const video = videoRef.current;
    if (!video) return;

    if (state === "idle" || state === "paused") {
      video.play();
      setState("playing");
    } else if (state === "playing") {
      video.pause();
      setState("paused");
    } else if (state === "ended") {
      window.open(INSTA_URL, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="w-full max-w-sm">
      <div
        onClick={handleClick}
        className="relative cursor-pointer overflow-hidden rounded-xl"
      >
        <video
          ref={videoRef}
          src={VIDEO_SRC}
          playsInline
          onEnded={() => setState("ended")}
          className="aspect-[9/16] w-full object-cover"
        />

        {/* Play button (initial or paused) */}
        {(state === "idle" || state === "paused") && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition hover:bg-black/40">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-lg">
              <Play className="ml-1 h-7 w-7 text-black" fill="black" />
            </div>
          </div>
        )}

        {/* "Watch on Instagram" overlay (after video ends) */}
        {state === "ended" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/50 text-white transition hover:bg-black/60">
            <span className="text-sm font-medium">Watch on Instagram</span>
          </div>
        )}
      </div>

      <a
        href={INSTA_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 inline-flex items-center gap-1.5 text-sm text-neutral-500 transition hover:text-neutral-800"
      >
        View on Instagram
      </a>
    </div>
  );
}