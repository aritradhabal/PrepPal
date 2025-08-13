import { useContext } from "react";
import { Data_context } from "./DataContext";

export default function useDataContext() {
  const value = useContext(Data_context);
  if (value != undefined) {
    return value;
  }
}
