import useSwr from "swr";
import { Typography, Stack, Card, CardMedia, CardContent } from "@mui/material";
import { GameCard, Layout, Loader } from "../components";
import { IGame } from "../interfaces";

const Home = () => {
  const { data, isLoading, error } = useSwr<{
    count: number;
    games: IGame[];
  }>("/games");

  if (error) return <Typography variant="h6">{error}</Typography>;

  return (
    <Layout>
      {isLoading && <Loader />}
      <Stack
        p={4}
        direction="row"
        flexWrap="wrap"
        justifyContent="space-evenly"
        gap={4}
        bgcolor="secondary.light"
      >
        {!!data &&
          data.games.map((game) => (
            <GameCard
              key={game.id}
              background={game.background_image}
              id={game.id}
              name={game.name}
            />
          ))}
      </Stack>
    </Layout>
  );
};

export default Home;
