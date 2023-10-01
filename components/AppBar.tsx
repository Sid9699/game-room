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
  Badge,
} from "@mui/material";
import { Search as SearchIcon, ShoppingCart } from "@mui/icons-material";
import { useAuthContext, useCart, useDebounce } from "../hooks";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";

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
  const [search, setSearch] = useState("");

  const { logout } = useAuthContext();
  const router = useRouter();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const { count } = useCart();

  const debouncedHandleSearch = useDebounce(() => {
    router.push(`/${search ? `?search=${search}` : ""}`);
  }, 400);

  const handleSearch = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearch(event.target.value);
    debouncedHandleSearch();
  };

  const handleRouteToCart = () => {
    router.push("/cart");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <MuiAppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="a"
            color="white"
            onClick={() => {
              setSearch("");
              debouncedHandleSearch();
            }}
          >
            Game Room
          </Typography>
          {router.pathname === "/" && matches && (
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                value={search}
                onChange={handleSearch}
              />
            </Search>
          )}
          <Box sx={{ flexGrow: 1 }} />
          <Badge
            badgeContent={count}
            sx={{ color: "white", mr: 3, cursor: "pointer" }}
            showZero
            onClick={handleRouteToCart}
          >
            <ShoppingCart sx={{ color: "white" }} />
          </Badge>
          <Button color="inherit" onClick={logout}>
            Log Out
          </Button>
        </Toolbar>
      </MuiAppBar>
    </Box>
  );
};
