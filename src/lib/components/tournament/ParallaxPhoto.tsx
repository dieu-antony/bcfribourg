import Image from "next/image";
import { CldImage } from "next-cloudinary";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/** Local files ("/assets/…") use next/image, anything else is a Cloudinary public_id. */
export function Pic({
  src,
  alt = "",
  sizes = "100vw",
  className = "",
  priority = false,
}: {
  src: string;
  alt?: string;
  sizes?: string;
  className?: string;
  priority?: boolean;
}) {
  if (src.startsWith("/")) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={className}
      />
    );
  }
  return (
    <CldImage
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      quality="auto"
      format="auto"
      priority={priority}
      className={className}
    />
  );
}

/**
 * A wrapper whose background photo(s) move slower than the page when scrolling.
 * With several photos they crossfade every `interval` ms; with one there is no slideshow.
 */
export function ParallaxPhoto({
  photos,
  tint = "from-[#e6f4fa]/90 via-[#e6f4fa]/60 to-[#e6f4fa]/90",
  strength = 15,
  interval = 6000,
  priority = false,
  className = "",
  children,
}: {
  photos: string[];
  /** Tailwind gradient classes laid over the photo so text stays readable. */
  tint?: string;
  /** Parallax travel in percent. */
  strength?: number;
  interval?: number;
  /** Set true for the hero so the first photo loads first. */
  priority?: boolean;
  className?: string;
  children?: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [index, setIndex] = React.useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`-${strength}%`, `${strength}%`],
  );

  React.useEffect(() => {
    if (photos.length < 2) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % photos.length),
      interval,
    );
    return () => clearInterval(id);
  }, [photos.length, interval]);

  return (
    <div ref={ref} className={`relative w-full overflow-hidden ${className}`}>
      <motion.div
        style={{ y, height: `${100 + strength * 2}%`, top: `-${strength}%` }}
        className="absolute inset-x-0"
      >
        {photos.map((p, i) => (
          <motion.div
            key={p}
            className="absolute inset-0"
            initial={false}
            animate={{
              opacity: i === index ? 1 : 0,
              scale: i === index ? 1.06 : 1,
            }}
            transition={{
              opacity: { duration: 1.2 },
              scale: { duration: interval / 1000 + 1.2, ease: "linear" },
            }}
          >
            <Pic src={p} priority={priority && i === 0} className="object-cover" />
          </motion.div>
        ))}
      </motion.div>
      <div className={`absolute inset-0 bg-gradient-to-b ${tint}`} />
      <div className="relative z-10">{children}</div>
    </div>
  );
}