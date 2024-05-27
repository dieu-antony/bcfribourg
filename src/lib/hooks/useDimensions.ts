import { useState, useEffect, useLayoutEffect, useCallback } from "react";

export const useDimensions = (targetRef: React.RefObject<HTMLDivElement>) => {

  const getDimensions = () => {
    return {
      width: targetRef.current ? targetRef.current.offsetWidth : 0,
      height: targetRef.current ? targetRef.current.offsetHeight : 0,
    };
  };

  const [dimensions, setDimensions] = useState(getDimensions);

  const handleResize = useCallback(() => {
    setDimensions(getDimensions());
  }, [setDimensions, getDimensions]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  useLayoutEffect(() => {
    handleResize();
  }, [handleResize]);

  return dimensions;
}