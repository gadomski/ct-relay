import {
  ButtonGroup,
  GridItem,
  HStack,
  IconButton,
  SimpleGrid,
} from "@chakra-ui/react";
import { LuRadio } from "react-icons/lu";
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
      <HStack position={"absolute"} bottom={0} left={0} margin={4}>
        <ButtonGroup variant={"ghost"}>
          <ColorModeButton></ColorModeButton>
          <IconButton asChild>
            <a href="https://share.garmin.com/JOYQV" target="_blank">
              <LuRadio></LuRadio>
            </a>
          </IconButton>
        </ButtonGroup>
      </HStack>
    </>
  );
}
