import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useTodoContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useTodoContext must be within TodoProvider");
  }
  return context;
};
