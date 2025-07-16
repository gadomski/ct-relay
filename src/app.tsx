import { GridItem, SimpleGrid } from "@chakra-ui/react";
import Info from "./components/info";
import Map from "./components/map";
import useData from "./hooks/data";

export default function App() {
  const { coloradoTrail, legs, segments, track } = useData();

  return (
    <SimpleGrid columns={{ base: 1, md: 3 }} h={"100dvh"}>
      <GridItem shadow={"inset"} hideBelow={"md"}>
        <Info coloradoTrail={coloradoTrail} legs={legs} track={track}></Info>
      </GridItem>
      <GridItem colSpan={{ base: 1, md: 2 }}>
        <Map
          coloradoTrail={coloradoTrail}
          legs={legs}
          track={track}
          segments={segments}
        ></Map>
      </GridItem>
    </SimpleGrid>
  );
}
