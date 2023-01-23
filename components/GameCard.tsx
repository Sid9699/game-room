import {
  Backdrop,
  Typography,
  Card,
  CardMedia,
  CardActionArea,
  styled,
} from "@mui/material";

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
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={false}
        />
      </CardActionArea>
    </CustomCard>
  );
};
