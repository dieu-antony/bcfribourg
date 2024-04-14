import * as d3 from "d3";
import { useEffect, useRef } from "react";
import * as topojson from "topojson-client";
import { Topology, Objects, GeometryObject } from "topojson-specification";
import { GeoJsonProperties } from "geojson";
import ch_ from "swiss-maps/2024/ch-combined.json";
import freedom from "~/lib/data/freedom.json";
const ch: Topology = ch_ as unknown as Topology;

const Map = () => {
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
    const cantonsBg = svg
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

    const cantonBorders = svg
      .append("path")
      .attr("fill", "none")
      .attr("stroke", "lightgray")
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
  });

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
