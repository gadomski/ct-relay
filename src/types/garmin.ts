export interface Track {
  M: Message[];
}

interface Message {
  A: Payload[];
}

interface Payload {
  Locations: Location[];
}

interface Location {
  L: number;
  N: number;
  D: string;
}
