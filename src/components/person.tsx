import { Avatar } from "@chakra-ui/react";
import bexSrc from "../img/bex.jpg";
import kellySrc from "../img/kelly.jpg";
import type { Person } from "../types/ct-relay";

export function PersonAvatar({ person }: { person: Person }) {
  const src = person === "Bex" ? bexSrc : kellySrc;

  return (
    <Avatar.Root>
      <Avatar.Fallback name={person}></Avatar.Fallback>
      <Avatar.Image src={src}></Avatar.Image>
    </Avatar.Root>
  );
}
