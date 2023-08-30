import useSwr from "swr";
import { IGame } from "../../interfaces";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useRouter } from "next/router";
import { Loader } from "../../components";
import { Box, Grid, Rating, Stack, Typography, styled } from "@mui/material";

const CustomImageBox = styled(Box)(({ theme }) => ({
  boxShadow: `inset 10px 50px 50px -10px ${theme.palette.primary.main}`,
  zIndex: 9999,
}));

const Game = () => {
  const { user } = useAuthContext();
  const router = useRouter();

  const { data, isLoading } = useSwr<{
    data: IGame;
  }>(user ? `/games/${router.query.id}` : null);

  console.log("data", data);

  return (
    <>
      {isLoading && <Loader />}
      {data && (
        <Grid container spacing={3} p={3}>
          <Grid item xs={12} md={5}>
            <CustomImageBox
              borderRadius={1}
              width="100%"
              sx={{
                backgroundImage: `url(${data.data.background_image})`,
                backgroundSize: "cover",
                paddingTop: "56.25%",
              }}
            />
          </Grid>
          <Grid item xs={12} md={7}>
            <Stack spacing={2}>
              <Grid container spacing={0} alignItems="center" gap={2}>
                <Typography variant="h4">{data.data.name}</Typography>
                <Rating value={data.data.rating} readOnly />
              </Grid>
              <Typography variant="body1">
                {data.data.description_raw.split("\n\n")[0]}
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Game;
