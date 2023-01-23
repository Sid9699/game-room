import { FC, PropsWithChildren } from "react";
import { AppBar } from "./AppBar";

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <AppBar />
      {children}
    </>
  );
};
