import * as d3 from "d3";
import { useEffect, useRef } from "react";
import * as topojson from "topojson-client";
import type { Topology, GeometryObject } from "topojson-specification";
import ch_ from "swiss-maps/2024/ch-combined.json";
const ch: Topology = ch_ as unknown as Topology;
import { useState } from "react";
import { MapTooltip } from "./MapTooltip";
import type { Transition } from "d3";

type MapProps = { longitude: number; latitude: number; location: string, width: number, height: number };
type InteractionData = {
  xPos: number;
  yPos: number;
  location: string;
};
const Map = ({ longitude, latitude, location, /*width, height  two props for future with useDimension hook*/}: MapProps) => {
  // Ref for the SVG element and the interaction data for the tooltip
  const [interactionData, setInteractionData] =
    useState<InteractionData | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);


  useEffect(() => {
    window.addEventListener("resize", () => {
      const newWidth = Math.min(window.innerWidth, 975);
      const newHeight = Math.min(window.innerHeight, 610);
      if (newWidth !== width || newHeight !== height) {
        // Update the width and height
        width = newWidth;
        height = width * 0.61803398875;

        // Update the SVG element
        svg.attr("width", width).attr("height", height);
        d3.geoMercator()
          .translate([width / 2, height / 2])
          .scale((width * height) / 600);
        
      }
    });
    let width = Math.min(window.innerWidth, 975);
    let height = Math.min(window.innerHeight, 610);

    // Define the projection and path
    const projection = d3
      .geoMercator()
      .rotate([0, 0])
      .center([8.3, 46.8])
      .scale(10000)
      .translate([width / 2, height / 2])
      .precision(0.1);
    const path = d3.geoPath().projection(projection);
    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .on("click", reset);

    // Reset the map to the original view on click
    function reset() {
      cantons.transition().style("fill", null);
      svg
        .transition()
        .duration(750)
        .call(
          zoom.transform as (transition: Transition<SVGSVGElement | null, unknown, null, undefined>, ...args: any[]) => any,
          d3.zoomIdentity,
          d3.zoomTransform(svg as any).invert([width / 2, height / 2]),
        );
    }

    // Draw the map
    const g = svg.append("g");
    g.append("path")
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
    
    // Add cantons and lakes
    const cantons = g
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
    g
      .append("path")
      .attr("fill", "#b3e6ff")
      .attr(
        "d",
        path(
          topojson.feature(
            ch as unknown as Topology,
            ch.objects.lakes as GeometryObject,
          ),
        ),
      );

    // Zoom behavior
    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([1, 8])
      .translateExtent([
        [0, 0],
        [width, height],
      ])
      .on("zoom", zoomed);

    // Zoom function
    function zoomed(event: { transform: any }) {
      const { transform } = event;
      g.attr("transform", transform);
      g.attr("stroke-width", 1 / transform.k);
    }

    // Zoom to the location on load
    const onLoadZoom = () => {
      const x0 = projection([7.147400994098687, 46.81177897206209])?.[0] ?? 0;
      const y0 = projection([7.147400994098687, 46.81177897206209])?.[1] ?? 0;
      const x1 = projection([longitude, latitude])?.[0] ?? 0;
      const y1 = projection([longitude, latitude])?.[1] ?? 0;
      svg
        .transition()
        .duration(2000)
        .call(
          zoom.transform as any,
          d3.zoomIdentity
            .translate(width / 2, height / 2)
            .scale(
              Math.min(
                8,
                0.9 / Math.max((x1 - x0) / width, (y1 - y0) / height),
              ),
            )
            .translate(-(x0 + x1) / 2, -(y0 + y1) / 2),
        );
    };
    if (svgRef.current) {
      const svg = d3.select(svgRef.current);
      svg.call(zoom);
      onLoadZoom();
    }

    // Add the location points
    g.append("circle")
      .attr("cx", projection([7.147400994098687, 46.81177897206209])?.[0] ?? 0)
      .attr("cy", projection([7.147400994098687, 46.81177897206209])?.[1] ?? 0)
      .attr("r", "1px")
      .style("fill", "red")
      .on("mouseover", () => {
        setInteractionData({
          xPos: projection([7.147400994098687, 46.81177897206209])?.[0] ?? 0,
          yPos: projection([7.147400994098687, 46.81177897206209])?.[1] ?? 0,
          location: "Av. du Général-Guisan 61a, 1700 Fribourg",
        });
      })
      .on("mouseout", () => {
        setInteractionData(null);
      });

    if (longitude === 7.147400994098687 && latitude === 46.81177897206209) {
    } else {
      const connectionSvgPath = path({
        type: "LineString",
        coordinates: [
          [7.147400994098687, 46.81177897206209],
          [longitude, latitude],
        ],
      });
      g.append("path")
        .data([connectionSvgPath])
        .attr("d", connectionSvgPath)
        .attr("fill", "none")
        .attr("stroke", "red");
      g.append("circle")
        .attr("cx", projection([longitude, latitude])?.[0] ?? 0)
        .attr("cy", projection([longitude, latitude])?.[1] ?? 0)
        .attr("r", "1px")
        .style("fill", "red")
        .on("mouseover", () => {
          setInteractionData({
            xPos: projection([longitude, latitude])?.[0] ?? 0,
            yPos: projection([longitude, latitude])?.[1] ?? 0,
            location: location,
          });
        })

        .on("mouseout", () => {
          setInteractionData(null);
        });
    }

    return () => {
      if (g) {
        g.remove();
      }
    };
  }, [latitude, longitude, location]);

  return (
    <>
      <div className="relative">
        <svg ref={svgRef} />
        <div className="absolute left-0 top-0 ml-[60px] mt-[60px]">
          <MapTooltip interactionData={interactionData} />
        </div>
      </div>
    </>
  );
};

export default Map;
