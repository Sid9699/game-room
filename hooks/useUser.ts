import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useUser = () => {
  const authContext = useContext(AuthContext);
  if (authContext) {
    return authContext.user;
  }
  return null;
};
