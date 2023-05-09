import { Box, Link, Typography } from "@mui/material";

export const Footer = () => {
  return (
    <Box flexGrow={1} bgcolor="primary.main" textAlign="center" p={2}>
      <Typography variant="h6" component="div" color="white">
        <Link href="https://github.com/Sid9699/game-room" target="_blank" color="secondary.main">
          Open source code
        </Link>{" "}
        by Siddharth
      </Typography>
    </Box>
  );
};
