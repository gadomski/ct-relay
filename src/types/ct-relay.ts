export interface Checkin {
  person: Person;
  datetime: Date;
}

export interface CheckinRange {
  person: Person;
  startDatetime: Date;
  endDatetime: Date;
}

export type Person = "Bex" | "Kelly";
