import {
  AppBar as MuiAppBar,
  Box,
  Button,
  Toolbar,
  Typography,
} from "@mui/material";
import { useAuthContext } from "../hooks/useAuthContext";

const AppBar = () => {
  const { logout } = useAuthContext();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <MuiAppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Game Room
          </Typography>
          <Button color="inherit" onClick={logout}>
            Log Out
          </Button>
        </Toolbar>
      </MuiAppBar>
    </Box>
  );
};

export default AppBar;
