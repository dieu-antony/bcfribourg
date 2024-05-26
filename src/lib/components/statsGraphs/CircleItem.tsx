import { animated } from "@react-spring/web";

type CircleItemProps = {
  springProps: { cx: string; cy: string };
  color: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  key: string;
};

export const CircleItem = ({
  springProps,
  color,
  onMouseEnter,
  onMouseLeave,
}: CircleItemProps) => {
  return (
    <animated.circle
      cx={springProps.cx}
      cy={springProps.cy}
      r={5}
      fill={color}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    />
  );
};
