"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

/**
 * Service-area map: AI-generated base image (public/Assets/service-area-map.jpg, 1536×1024)
 * with town labels overlaid in HTML so they stay sharp and editable.
 * Coordinates are in the image's own pixel space. The base image is stylized, not to scale,
 * so positions follow the image's landmarks (Reading/Boston dots, I-495 ring, I-95/128 ring, coast)
 * while keeping real north/south/east/west relationships between towns.
 */
const W = 1536;
const H = 1024;

type Town = { name: string; x: number; y: number; side?: "left" | "right" };

const towns: Town[] = [
  { name: "Lowell", x: 660, y: 165 },
  { name: "Lawrence", x: 955, y: 80 },
  { name: "Concord", x: 600, y: 385 },
  { name: "Lexington", x: 820, y: 405 },
  { name: "Waltham", x: 800, y: 495 },
  { name: "Cambridge", x: 1050, y: 468 },
  { name: "Newton", x: 865, y: 560 },
  { name: "Lynn", x: 1170, y: 400 },
  { name: "Marlborough", x: 300, y: 530 },
  { name: "Framingham", x: 473, y: 615, side: "left" },
  { name: "Norwood", x: 880, y: 725 },
  { name: "Quincy", x: 1215, y: 655 },
  { name: "Franklin", x: 505, y: 838 },
  { name: "Brockton", x: 1200, y: 860 },
];

export default function ServiceAreaMap({ alt }: { alt: string }) {
  const scroller = useRef<HTMLDivElement>(null);

  // On narrow screens the map scrolls sideways; start on the Boston/Reading side.
  useEffect(() => {
    const el = scroller.current;
    if (el && el.scrollWidth > el.clientWidth) el.scrollLeft = el.scrollWidth - el.clientWidth;
  }, []);

  return (
    <div ref={scroller} className="overflow-x-auto rounded-xl ring-1 ring-white/10 bg-brand-panel">
      <div className="relative min-w-[680px] w-full" style={{ aspectRatio: `${W} / ${H}` }}>
        <Image
          src="/Assets/service-area-map.jpg"
          alt={alt}
          fill
          className="object-cover saturate-[0.8]"
          sizes="(max-width: 1024px) 680px, 66vw"
        />
        {/* Pull the greens toward the site's navy */}
        <div aria-hidden="true" className="absolute inset-0 bg-brand-navy/25 mix-blend-multiply" />

        <ul aria-label="Reference towns">
          {towns.map((t) => (
            <li
              key={t.name}
              className="absolute"
              style={{ left: `${(t.x / W) * 100}%`, top: `${(t.y / H) * 100}%` }}
            >
              <span
                aria-hidden="true"
                className="absolute w-[7px] h-[7px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white ring-2 ring-brand-dark/80"
              />
              <span
                className={`absolute top-0 -translate-y-1/2 whitespace-nowrap rounded bg-brand-dark/75 px-1.5 py-0.5 text-[11px] font-semibold leading-none text-white ${
                  t.side === "left" ? "right-[8px]" : "left-[8px]"
                }`}
              >
                {t.name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
