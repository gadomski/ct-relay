import { Layer, Source } from "react-map-gl/maplibre";
import useAppState from "../hooks/app-state";

export default function OpenTopoMap() {
  const { showOpenTopoMap } = useAppState();

  return (
    <Source
      type="raster"
      tiles={[
        "https://a.tile.opentopomap.org/{z}/{x}/{y}.png",
        "https://b.tile.opentopomap.org/{z}/{x}/{y}.png",
        "https://c.tile.opentopomap.org/{z}/{x}/{y}.png",
      ]}
      attribution={"OpenTopoMap"}
    >
      <Layer
        type="raster"
        layout={{ visibility: showOpenTopoMap ? "visible" : "none" }}
      ></Layer>
    </Source>
  );
}
