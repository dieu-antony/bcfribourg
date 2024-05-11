import { useSpring, animated } from "@react-spring/web";

 export type LineItemProps = {
    path: string;
    color: string;
  };
  
  export const LineItem = ({ path, color }: LineItemProps) => {
    const springProps = useSpring({
      to: {
        path,
        color,
      },
      config: {
        friction: 100,
      },
    });
  
    return (
      <animated.path
        d={springProps.path}
        fill={"none"}
        stroke={color}
        strokeWidth={2}
      />
    );
  };
  