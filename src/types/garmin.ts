export interface Message<T> {
  M: T[];
}

export interface UpdateUser {
  M: string;
  A: UpdateUserPayload[];
}

interface UpdateUserPayload {
  Locations: Location[];
}

interface Location {
  L: number;
  N: number;
  A: number;
  D: string;
}
