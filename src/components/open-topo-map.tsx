import { Layer, Source } from "react-map-gl/maplibre";

export default function OpenTopoMap({
  showOpenTopoMap,
}: {
  showOpenTopoMap: boolean;
}) {
  return (
    <Source
      type="raster"
      tiles={[
        "https://a.tile.opentopomap.org/{z}/{x}/{y}.png",
        "https://b.tile.opentopomap.org/{z}/{x}/{y}.png",
        "https://c.tile.opentopomap.org/{z}/{x}/{y}.png",
      ]}
      attribution={
        "<a href='https://wiki.openstreetmap.org/wiki/OpenTopoMap' target='_blank'>OpenTopoMap</a>"
      }
    >
      <Layer
        type="raster"
        id="open-topo-map"
        layout={{ visibility: showOpenTopoMap ? "visible" : "none" }}
      ></Layer>
    </Source>
  );
}
