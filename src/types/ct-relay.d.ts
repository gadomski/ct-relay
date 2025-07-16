export type Track = Feature<Point, { datetime: Date }>[];

export type Legs = Feature<LineString, Leg>[];

export interface Leg {
  person: Person;
  day: number;
}

export interface Handoff {
  datetime: Date;
  person: Person;
}

export type Person = "Bex" | "Kelly";
