import { type SpringValue, animated } from "@react-spring/web";

type CircleItemProps = {
  springProps: { cx: SpringValue<number>; cy: SpringValue<number> };
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
