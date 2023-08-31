import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
  Link,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import { useForm, Controller, FieldValues } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuthContext } from "../../hooks";

const schema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password should have minimum 8 characters"),
});

const Login = () => {
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });
  const { login } = useAuthContext();

  const handleLogin = async (values: FieldValues) => {
    try {
      setLoading(true);
      await login(values.email, values.password);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

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
        component="form"
        onSubmit={handleSubmit(handleLogin)}
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
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Email"
                fullWidth
                value={
                  typeof field.value === "number" && field.value === 0
                    ? ""
                    : field.value
                }
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Password"
                type="password"
                fullWidth
                value={
                  typeof field.value === "number" && field.value === 0
                    ? ""
                    : field.value
                }
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
          <Button variant="contained" type="submit" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : "Log In"}
          </Button>
          <Typography variant="body1" textAlign="center">
            Don&apos;t have an account?{" "}
            {loading ? (
              "Sign Up now"
            ) : (
              <Link href="/auth/register">Sign Up now</Link>
            )}
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
};

export default Login;
