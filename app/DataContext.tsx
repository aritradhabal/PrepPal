import { createContext } from "react";

export const Data_context = createContext(null);

export function getData() {
  if (Data_context != null) {
    return Data_context;
  }
}
