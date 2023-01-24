import {
  Typography,
  Button,
  Card,
  CardMedia,
  CardActionArea,
  styled,
} from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";

const CustomCard = styled(Card)(({ theme }) => ({
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
  return (
    <CustomCard sx={{ width: 220 }} elevation={0}>
      <CardActionArea>
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
