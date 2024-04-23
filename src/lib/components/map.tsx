import * as d3 from "d3";
import { useEffect, useRef } from "react";
import * as topojson from "topojson-client";
import { Topology, GeometryObject } from "topojson-specification";
import ch_ from "swiss-maps/2024/ch-combined.json";
const ch: Topology = ch_ as unknown as Topology;

type MapProps = { longitude: number; latitude: number };

const Map = ({longitude, latitude }: MapProps) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  useEffect(() => {
    const projection = d3
      .geoMercator()
      .rotate([0, 0])
      .center([8.3, 46.8])
      .scale(10000)
      .translate([975 / 2, 610 / 2])
      .precision(0.1);

    const width = 975;
    const height = 610;
    const path = d3.geoPath(projection);
    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    svg
      .append("path")
      .attr("fill", "#ddd")
      .attr(
        "d",
        path(
          topojson.feature(
            ch as unknown as Topology,
            ch.objects.country as GeometryObject,
          ),
        ),
      );

    svg
      .append("path")
      .attr("fill", "none")
      .attr("stroke", "gray")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr(
        "d",
        path(
          topojson.mesh(
            ch as unknown as Topology,
            ch.objects.cantons as GeometryObject,
            (a, b) => a !== b,
          ),
        ),
      );

    const addPointsAndAnimate = () => {
      const svg = d3.select(svgRef.current);

      // Add the first point
      const startPoint = projection([7.147458293631302, 46.81178223185225]);
      svg
      .append("circle")
      .attr("cx", startPoint ? startPoint[0] : 0) // Add null check for startPoint
      .attr("cy", startPoint ? startPoint[1] : 0) // Add null check for startPoint
      .attr("r", 5)
      .attr("fill", "red");

      // Add the second point based on props
      const endPoint = projection([longitude, latitude]);
      svg
      .append("circle")
      .attr("cx", endPoint ? endPoint[0]: 0)
      .attr("cy", endPoint ? endPoint[1]: 0)
      .attr("r", 5)
      .attr("fill", "blue");

      // Trace a line from the first point to the second point with animation
      svg
      .append("line")
      .attr("x1", startPoint ? startPoint[0] : 0) // Add null check for startPoint
      .attr("y1", startPoint ? startPoint[1] : 0) // Add null check for startPoint
      .attr("x2", startPoint ? startPoint[0] : 0) // Add null check for startPoint
      .attr("y2", startPoint ? startPoint[1] : 0) // Add null check for startPoint
      .attr("stroke", "black")
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", "5 5")
      .transition()
      .duration(1000)
      .attr("x2", endPoint ? endPoint[0] : 0) // Add null check for endPoint
      .attr("y2", endPoint ? endPoint[1] : 0); // Add null check for endPoint

      // Zoom to the extent of the two points
      const bounds = d3.geoBounds({
      type: "LineString",
      coordinates: [
        [7.147458293631302, 46.81178223185225],
        [longitude, latitude],
      ],
      });
      const dx = bounds[1][0] - bounds[0][0];
      const dy = bounds[1][1] - bounds[0][1];
      const x = (bounds[0][0] + bounds[1][0]) / 2;
      const y = (bounds[0][1] + bounds[1][1]) / 2;
      const scale = Math.max(1, Math.min(8, 0.9 / Math.max(dx / width, dy / height)));
      const translate = [width / 2 - scale * x, height / 2 - scale * y];

      svg
      .transition()
      .duration(1000)
      .call(() => d3.zoomIdentity.translate(translate[0] || 0, translate[1] || 0).scale(scale));
    };

    
      addPointsAndAnimate();
  }, []); // Add empty dependency array to useEffect

 
  return (
    <>
      <div>
        <h1>Swiss Map</h1>
        <svg ref={svgRef} />
      </div>
    </>
  );
};

export default Map;
