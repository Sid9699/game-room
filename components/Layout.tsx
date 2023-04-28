import { Box } from "@mui/material";
import { FC, PropsWithChildren } from "react";
import { AppBar } from "./AppBar";

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <AppBar />
      <Box bgcolor="secondary.light" height="calc(100% - 64px)" overflow="auto">
        {children}
      </Box>
    </>
  );
};
