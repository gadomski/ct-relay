import {
  GridItem,
  Heading,
  SimpleGrid,
  Span,
  Stack,
  Text,
} from "@chakra-ui/react";
import Map from "./components/map";

export default function App() {
  return (
    <>
      <SimpleGrid columns={4}>
        <GridItem shadow={"inset"}>
          <Stack p={4} gap={4}>
            <Heading size={"2xl"}>A Colorado Trail relay</Heading>
            <Text>
              Brought to you by{" "}
              <Span
                fontWeight="bold"
                bg="green.emphasized"
                color="green.fg"
                px="0.5"
              >
                Bex
              </Span>{" "}
              and{" "}
              <Span
                fontWeight={"bold"}
                bg="blue.emphasized"
                color="blue.fg"
                px="0.5"
              >
                Kelly
              </Span>
            </Text>
          </Stack>
        </GridItem>
        <GridItem colSpan={3} h={"100dvh"}>
          <Map></Map>
        </GridItem>
      </SimpleGrid>
    </>
  );
}
