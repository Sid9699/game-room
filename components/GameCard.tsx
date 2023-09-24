import {
  Typography,
  Button,
  Card,
  CardMedia,
  CardActionArea,
  styled,
} from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import { useRouter } from "next/router";
import axios from "axios";
import { useCart } from "../hooks";
import { useMemo, useState } from "react";
import { Loader } from "./Loader";

const CustomCard = styled(Card)(() => ({
  position: "relative",

  "&:hover h6": {
    display: "block",
  },
}));

const CustomCardMedia = styled(CardMedia)(({ theme }) => ({
  boxShadow: `inset 10px 50px 50px -10px ${theme.palette.primary.main}`,
}));

interface Props {
  id: number;
  name: string;
  background: string;
}

export const GameCard = (props: Props): JSX.Element => {
  const { background, name, id } = props;

  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();
  const { refetch, cartItems } = useCart();

  const cartItem = useMemo(
    () => cartItems.find((item) => +item.gameId === id),
    [cartItems, id]
  );

  const onCardClick = (id: number) => {
    router.push({
      pathname: `/game/${id}`,
    });
  };

  const onAddToCartClick = async (id: number) => {
    try {
      setLoading(true);
      if (cartItem) {
        await axios.delete(`/cart-items/${cartItem._id}`);
      } else {
        await axios.post(`/cart-items/${id}`);
      }
      await refetch();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loader />}
      <CustomCard sx={{ width: 220 }} elevation={0}>
        <CardActionArea onClick={() => onCardClick(id)}>
          <CustomCardMedia
            sx={{ height: 220 }}
            image={background}
            title={name}
          />
          <Typography
            variant="subtitle1"
            color="white"
            display="none"
            sx={{
              position: "absolute",
              left: 10,
              bottom: 10,
            }}
          >
            {name}
          </Typography>
        </CardActionArea>
        <Button
          fullWidth
          color={cartItem ? "error" : "warning"}
          endIcon={<ShoppingCart />}
          onClick={() => onAddToCartClick(id)}
        >
          {!!cartItem ? "Remove from cart" : "Add to cart"}
        </Button>
      </CustomCard>
    </>
  );
};
