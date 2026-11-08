import { motion, useScroll, useTransform } from "framer-motion";

const TRACK_A = "M120 0 V170 C120 250 84 270 84 350 C84 430 120 450 120 530 V700";
const TRACK_B = "M120 0 V170 C120 250 156 270 156 350 C156 430 120 450 120 530 V700";

function Cabin({
  path,
  progress,
}: {
  path: string;
  progress: ReturnType<typeof useTransform<number, string>>;
}) {
  return (
    <motion.div
      className="absolute left-[0.6rem] top-0"
      style={{
        offsetPath: `path("${path}")`,
        offsetRotate: "0deg",
        offsetDistance: progress,
      }}
    >
      {/* centred on the track: 40 wide, 72 long */}
      <div className="relative -ml-5 -mt-9 h-[72px] w-10 rounded-md bg-[#166081]">
        <div className="absolute inset-x-1.5 top-2 h-5 rounded-sm bg-[#ffd1e1]" />
        <div className="absolute inset-x-1.5 top-9 h-5 rounded-sm bg-[#ffd1e1]/80" />
        <div className="absolute inset-x-0 -bottom-1.5 h-2 rounded-b-md bg-[#166081]" />
      </div>
    </motion.div>
  );
}

export default function FunicularBackground() {
  const { scrollYProgress } = useScroll();
  const down = useTransform(scrollYProgress, [0, 1], ["5%", "95%"]);
  const up = useTransform(scrollYProgress, [0, 1], ["95%", "5%"]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed right-4 top-[4vh] z-0 hidden h-[700px] w-[240px] origin-top-right scale-y-[1.3] opacity-30 lg:block"
    >
      <svg viewBox="0 0 240 700" className="absolute inset-0 h-full w-full">
        <defs>
          {/* knocks the inside out of each thick line, which leaves two rails */}
          <mask id="funi-rails" maskUnits="userSpaceOnUse" x="0" y="0" width="240" height="700">
            <rect width="240" height="700" fill="white" />
            <path d={TRACK_A} stroke="black" strokeWidth="9" fill="none" />
            <path d={TRACK_B} stroke="black" strokeWidth="9" fill="none" />
          </mask>
        </defs>

        {/* sleepers */}
        <g stroke="#166081" strokeOpacity="0.6" fill="none">
          <path d={TRACK_A} strokeWidth="30" strokeDasharray="3 14" />
          <path d={TRACK_B} strokeWidth="30" strokeDasharray="3 14" />
        </g>

        {/* rails */}
        <g mask="url(#funi-rails)" stroke="#166081" fill="none" strokeWidth="17">
          <path d={TRACK_A} />
          <path d={TRACK_B} />
        </g>
      </svg>

      {/* top station: flat gate; bottom station: gabled roof, as in the photo */}
      <div className="absolute left-1/2 top-0 h-4 w-28 -translate-x-1/2 rounded-sm bg-[#166081]" />
      <div
        className="absolute bottom-0 left-1/2 h-14 w-32 -translate-x-1/2 bg-[#166081]"
        style={{ clipPath: "polygon(0 100%, 0 45%, 50% 0, 100% 45%, 100% 100%)" }}
      />

      {/* the two cabins always move in opposite directions */}
      <Cabin path={TRACK_A} progress={down} />
      <Cabin path={TRACK_B} progress={up} />
    </div>
  );
}