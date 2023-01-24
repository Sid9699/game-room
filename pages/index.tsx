import useSwr from "swr";
import { Typography, Stack, Pagination } from "@mui/material";
import { GameCard, Layout, Loader } from "../components";
import { IGame } from "../interfaces";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import { useState } from "react";

const Home = () => {
  const [page, setPage] = useState(1);
  const router = useRouter();

  const { data, isLoading, error } = useSwr<{
    count: number;
    games: IGame[];
  }>(
    `/games?page=${page}${
      router.query.search ? `&search=${router.query.search}` : ""
    }`
  );

  const handlePageChange = (value: number) => setPage(value);

  if (error) return <Typography variant="h6">{error}</Typography>;

  return (
    <Layout>
      {isLoading && <Loader />}
      <Box bgcolor="secondary.light">
        <Stack
          p={4}
          direction="row"
          flexWrap="wrap"
          justifyContent="space-evenly"
          gap={4}
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
        <Stack alignItems="center" py={4}>
          {!!data && (
            <Pagination
              count={Math.floor(data?.count / 20)}
              color="primary"
              variant="text"
              shape="rounded"
              page={page}
              onChange={(event, page) => handlePageChange(page)}
            />
          )}
        </Stack>
      </Box>
    </Layout>
  );
};

export default Home;
