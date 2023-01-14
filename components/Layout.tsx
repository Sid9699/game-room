import { FC, PropsWithChildren } from "react";
import AppBar from "./AppBar";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <AppBar />
      {children}
    </>
  );
};

export default Layout;
