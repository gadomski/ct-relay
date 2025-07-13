import { Box, GridItem, SimpleGrid } from "@chakra-ui/react";
import Map from "./components/map";
import Sidebar from "./components/sidebar";
import { ColorModeButton } from "./components/ui/color-mode";

export default function App() {
  return (
    <>
      <SimpleGrid columns={{ base: 2, md: 4 }} h={"100dvh"}>
        <GridItem shadow={"inset"} hideBelow={"md"}>
          <Sidebar></Sidebar>
        </GridItem>
        <GridItem colSpan={{ base: 2, md: 3 }}>
          <Map></Map>
        </GridItem>
      </SimpleGrid>
      <Box position={"absolute"} bottom={0} left={0} margin={4}>
        <ColorModeButton></ColorModeButton>
      </Box>
    </>
  );
}
