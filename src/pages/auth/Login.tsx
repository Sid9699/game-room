import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
  Link,
} from "@mui/material";

const Login = () => {
  return (
    <Box
      sx={(theme) => ({
        height: "100%",
        background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.primary.dark})` /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */,
      })}
    >
      <Container
        maxWidth="xs"
        sx={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Stack
          bgcolor="whitesmoke"
          spacing={4}
          p={4}
          borderRadius={2}
          boxShadow={3}
          sx={{ width: "100%" }}
        >
          <Typography variant="h4" textAlign="center">
            Log In
          </Typography>
          <TextField label="Email" />
          <TextField label="Password" type="password" />
          <Button variant="contained">Log In</Button>
          <Typography variant="body1" textAlign="center">
            Don't have an account?{" "}
            <Link href="/auth/register">Sign Up now</Link>
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
};

export default Login;
