import { useRef } from "react";
import { useScroll, useTransform } from "framer-motion";
import { GoogleGeminiEffect } from "~/lib/components/ui/google-gemini-effect";

const links = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const pathLengthFirst = useTransform(scrollYProgress, [0, 0.2], [0.2, 1.2]);
  const pathLengthSecond = useTransform(scrollYProgress, [0, 0.2], [0.15, 1.2]);
  const pathLengthThird = useTransform(scrollYProgress, [0, 0.2], [0.1, 1.2]);
  const pathLengthFourth = useTransform(scrollYProgress, [0, 0.2], [0.05, 1.2]);
  const pathLengthFifth = useTransform(scrollYProgress, [0, 0.2], [0, 1.2]);

  return (
    <>
      <div
        className="relative h-[400vh] w-full overflow-clip rounded-md pt-12 md:pt-24 "
        ref={ref}
      >
        <GoogleGeminiEffect
          pathLengths={[
            pathLengthFirst,
            pathLengthSecond,
            pathLengthThird,
            pathLengthFourth,
            pathLengthFifth,
          ]}
        />
      </div>
    </>
  );
};

export default links;
