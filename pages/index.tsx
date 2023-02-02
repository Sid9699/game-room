import useSwr from "swr";
import {
  Stack,
  Pagination,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { GameCard, Layout, Loader } from "../components";
import { IGame, IGenre } from "../interfaces";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const Home = () => {
  const [page, setPage] = useState(1);
  const [genre, setGenre] = useState<string>();
  const router = useRouter();

  const { user } = useAuthContext();

  const { data, isLoading } = useSwr<{
    count: number;
    games: IGame[];
  }>(
    user
      ? `/games?page=${page}${
          router.query.search ? `&search=${router.query.search}` : ""
        }${genre ? `&genres=${genre}` : ""}`
      : null
  );

  const { data: genresData } = useSwr<{
    count: number;
    genres: IGenre[];
  }>(user ? `/games/genres` : null);

  const handlePageChange = (value: number) => setPage(value);

  return (
    <Layout>
      {isLoading && <Loader />}
      <Box bgcolor="secondary.light" minHeight="100%">
        <Box display="flex" justifyContent="flex-end" pt={2} mr={7}>
          {!!genresData && (
            <FormControl size="small" sx={{ width: 220 }}>
              <InputLabel>Genre</InputLabel>
              <Select
                value={genre}
                onChange={(event) => setGenre(event.target.value)}
                label="Genre"
              >
                {genresData.genres.map((genre) => (
                  <MenuItem key={genre.id} value={genre.id}>
                    {genre.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </Box>
        <Stack
          px={4}
          py={2}
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
        <Box display="flex" justifyContent="center" alignItems="center" pb={2}>
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
        </Box>
      </Box>
    </Layout>
  );
};

export default Home;
