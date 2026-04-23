import { useContext } from "react";
import { AppContext } from "./AppContext";

export const useProvider = () => {
  const context = useContext(AppContext);
  return context;
};