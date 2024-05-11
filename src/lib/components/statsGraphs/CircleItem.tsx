import { useSpring, animated } from "@react-spring/web";

export type CircleItemProps = {
  cx: number;
  cy: number;
  color: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

export const CircleItem = ({
  cx,
  cy,
  color,
  onMouseEnter,
  onMouseLeave,
}: CircleItemProps) => {
  const springProps = useSpring({
    to: {
      cx,
      cy,
      color,
    },
    config: {
      friction: 100,
    },
  });

  return (
    <animated.circle
      cx={springProps.cx}
      cy={springProps.cy}
      r={5}
      fill="#00afef"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    />
  );
};
