import {
  AppBar as MuiAppBar,
  Box,
  Button,
  Toolbar,
  Typography,
  InputBase,
  alpha,
  styled,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { useAuthContext } from "../hooks/useAuthContext";
import { useRouter } from "next/router";
import { debounce } from "lodash";
import { ChangeEvent } from "react";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(4),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export const AppBar = () => {
  const { logout } = useAuthContext();
  const router = useRouter();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  const handleSearch = debounce(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      router.push(`/?search=${event.target.value}`);
    },
    400
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <MuiAppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div">
            Game Room
          </Typography>
          {router.pathname === "/" && matches && (
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase placeholder="Search…" onChange={handleSearch} />
            </Search>
          )}
          <Box sx={{ flexGrow: 1 }} />
          <Button color="inherit" onClick={logout}>
            Log Out
          </Button>
        </Toolbar>
      </MuiAppBar>
    </Box>
  );
};
