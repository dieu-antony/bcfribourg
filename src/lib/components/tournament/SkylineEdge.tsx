import { motion } from "framer-motion";

const SRC = "/assets/tournament/outline.svg";
const GROUND = "90%";
const baseMask = {
  WebkitMaskImage: `url(${SRC})`,
  maskImage: `url(${SRC})`,
  WebkitMaskRepeat: "repeat-x",
  maskRepeat: "repeat-x",
  WebkitMaskSize: "auto 100%",
  maskSize: "auto 100%",
} as const;

const frontMask = {
  ...baseMask,
  WebkitMaskPosition: "var(--sky-px) bottom",
  maskPosition: "var(--sky-px) bottom",
} as const;

const backMask = {
  ...baseMask,
  WebkitMaskPosition: "calc(var(--sky-px) + var(--sky-dx)) bottom",
  maskPosition: "calc(var(--sky-px) + var(--sky-dx)) bottom",
} as const;

export default function SkylineEdge({
  frontColor = "#166081", // must equal the colour of the section below
  backColor = "#00afef",
  className = "",
}: {
  frontColor?: string;
  backColor?: string;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      style={{
        height: "var(--sky-h)",
        marginTop: "calc(var(--sky-h) * -1)",
        clipPath: "inset(-50% 0 0 0)", // clips the bottom only, so the rise-in stays hidden
      }}
      className={`
        pointer-events-none relative z-10 -mb-px w-full overflow-x-clip
        [--sky-h:11rem] [--sky-px:100%]
        sm:[--sky-h:clamp(8rem,13.89vw,20rem)]
        lg:[--sky-px:50%]
        ${className}
      `}
    >
      {/* back layer: same shape, lighter, nudged up (transform) and sideways (mask position) */}
      <motion.div
        className="absolute inset-0 opacity-40"
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 1.5 }}
      >
        {/* shifted up as one piece, so the rectangle always starts at the silhouette's ground line */}
        <div className="absolute inset-0 -translate-y-3 [--sky-dx:8px] sm:-translate-y-5 sm:[--sky-dx:16px]">
          <div
            className="absolute inset-0"
            style={{ backgroundColor: backColor, ...backMask }}
          />
          <div
            className="absolute inset-x-0 -bottom-8"
            style={{ top: GROUND, backgroundColor: backColor }}
          />
        </div>
      </motion.div>

      {/* front layer */}
      <motion.div
        className="absolute inset-0"
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 1.3 }}
      >
        <div
          className="absolute inset-0"
          style={{ backgroundColor: frontColor, ...frontMask }}
        />
      </motion.div>
    </div>
  );
}
