import { useEffect, useRef } from "react";
import * as d3 from "d3";

// TODO: Finish the timeline component, most likely without D3
const EventTimeline = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  useEffect(() => {
    d3.select(svgRef.current)?.select("svg").remove();

    if (svgRef.current) {
      d3.select(svgRef.current)
        .append("svg")
        .attr("width", 100)
        .attr("height", 100);
    }
  });
  return <div>eventTimeline</div>;
};

export default EventTimeline;
