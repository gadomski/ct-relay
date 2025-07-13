import { useContext } from "react";
import { Context } from "../context";

export default function useAppState() {
  const context = useContext(Context);
  if (context) {
    return context;
  } else {
    throw new Error("need to use a provider");
  }
}
