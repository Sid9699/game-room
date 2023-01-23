import { alpha, Box, CircularProgress, styled } from "@mui/material";

const LoaderContainer = styled(Box)(({ theme }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  height: "100%",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9999,
  backgroundColor: alpha(theme.palette.common.black, 0.08),
  backdropFilter: "blur(6px)",
}));

export const Loader = () => {
  return (
    <LoaderContainer>
      <CircularProgress size={64} />
    </LoaderContainer>
  );
};
