import { Box } from "@chakra-ui/react";
import { ResponsiveLine } from "@nivo/line";
import { distance } from "@turf/turf";
import useAppState from "../hooks/app-state";
import { BEX_SOLID, KELLY_SOLID } from "../hooks/person-colors";
import { useColorModeValue } from "./ui/color-mode";

export default function Elevation() {
  const { coloradoTrail, legs } = useAppState();
  const primaryColor = useColorModeValue("black", "white");

  let d = 0;
  let minElevation = Infinity;
  let maxElevation = -Infinity;
  let maxLegDistance = 0;

  const legsData = legs.map((leg, i) => {
    if (leg.properties.endDistance > maxLegDistance) {
      maxLegDistance = leg.properties.endDistance;
    }
    let d = 0;
    return {
      id: `leg-${i}`,
      color: leg.properties.person == "Bex" ? BEX_SOLID : KELLY_SOLID,
      data: decimate(
        leg.geometry.coordinates
          .map((coordinate) => {
            const c = {
              x: d,
              y: coordinate[2],
            };
            if (i < leg.geometry.coordinates.length - 1) {
              d += distance(coordinate, leg.geometry.coordinates[i + 1], {
                units: "miles",
              });
            }
            return c;
          })
          .filter((c) => !!c.y)
      ),
    };
  });
  const coloradoTrailData = decimate(
    coloradoTrail.coordinates
      .map((coordinate, i) => {
        if (coordinate[2] > maxElevation) {
          maxElevation = coordinate[2];
        }
        if (coordinate[2] < minElevation) {
          minElevation = coordinate[2];
        }
        const c = {
          x: d,
          y: coordinate[2],
        };
        if (i < coloradoTrail.coordinates.length - 1) {
          d += distance(coordinate, coloradoTrail.coordinates[i + 1], {
            units: "miles",
          });
        }
        if (c.x < maxLegDistance) {
          return null;
        } else {
          return c;
        }
      })
      .filter((c) => !!c)
  );
  legsData.forEach((legData, i) => {
    if (i + 1 < legsData.length) {
      const nextLegData = legsData[i + 1].data;
      legData.data.push(nextLegData[0]);
    }
  });
  legsData[legsData.length - 1].data.push(coloradoTrailData[0]);

  const data = [
    ...legsData,
    {
      id: "colorado-trail",
      color: primaryColor,
      data: coloradoTrailData,
    },
  ];

  return (
    <Box h={"100px"} position={"absolute"} bottom={0} left={0} w={"100%"}>
      <ResponsiveLine
        data={data}
        enableGridX={false}
        enableGridY={false}
        enableArea={true}
        enablePoints={false}
        colors={{ datum: "color" }}
        areaOpacity={0.6}
        yScale={{ min: minElevation, max: maxElevation, type: "linear" }}
      ></ResponsiveLine>
    </Box>
  );
}

function decimate(data: { x: number; y: number }[]) {
  return data.filter((_, i) => i % 80 == 0);
}
