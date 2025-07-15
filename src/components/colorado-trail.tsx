import { feature, featureCollection } from "@turf/turf";
import { Layer, Source } from "react-map-gl/maplibre";
import useAppState from "../hooks/app-state";
import usePersonColors from "../hooks/person-colors";
import { useColorModeValue } from "./ui/color-mode";

export default function ColoradoTrail() {
  const primaryColor = useColorModeValue("black", "white");
  const secondaryColor = useColorModeValue("white", "black");
  const { coloradoTrail, legs } = useAppState();

  return (
    <>
      <Source
        data={feature(coloradoTrail)}
        type="geojson"
        id="colorado-trail-source"
      ></Source>
      <Source
        data={featureCollection(legs)}
        type="geojson"
        id="legs-source"
      ></Source>
      <Layer
        type="line"
        id="colorado-trail-buffer"
        source="colorado-trail-source"
        paint={{ "line-color": secondaryColor, "line-width": 8 }}
      ></Layer>
      <Layer
        type="line"
        id="legs"
        source="legs-source"
        layout={{ "line-cap": "butt", "line-join": "round" }}
        paint={{
          "line-color": usePersonColors(),
          "line-width": 8,
        }}
      ></Layer>
      <Layer
        type="line"
        id="colorado-trail"
        source="colorado-trail-source"
        paint={{ "line-color": primaryColor, "line-width": 2 }}
      ></Layer>
    </>
  );
}
