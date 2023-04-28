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

  const router = useRouter();

  const onCardClick = (id: number) => {
    router.push({
      pathname: `/game/${id}`,
    });
  };

  return (
    <CustomCard sx={{ width: 220 }} elevation={0}>
      <CardActionArea onClick={() => onCardClick(id)}>
        <CustomCardMedia sx={{ height: 220 }} image={background} title={name} />
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
      <Button fullWidth color="warning" endIcon={<ShoppingCart />}>
        Add to cart
      </Button>
    </CustomCard>
  );
};
