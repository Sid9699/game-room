import { Box } from "@mui/material";
import { FC, PropsWithChildren } from "react";
import { AppBar } from "./AppBar";
import { useRouter } from "next/router";
import { Footer } from "./Footer";

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();

  if (router.pathname.includes("auth")) return <>{children}</>;

  return (
    <>
      <AppBar />
      <Box bgcolor="secondary.light" minHeight="calc(100% - 64px)" overflow="auto">
        {children}
      </Box>
      <Footer />
    </>
  );
};
