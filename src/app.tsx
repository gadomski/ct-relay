import { GridItem, SimpleGrid } from "@chakra-ui/react";
import Map from "./components/map";
import Sidebar from "./components/sidebar";

export default function App() {
  return (
    <>
      <SimpleGrid columns={4}>
        <GridItem shadow={"inset"}>
          <Sidebar></Sidebar>
        </GridItem>
        <GridItem colSpan={3} h={"100dvh"}>
          <Map></Map>
        </GridItem>
      </SimpleGrid>
    </>
  );
}
