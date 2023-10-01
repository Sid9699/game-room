import {
  Box,
  Button,
  IconButton,
  Rating,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import { useCart } from "../hooks";
import { Delete } from "@mui/icons-material";
import { useState } from "react";
import axios from "axios";
import { Loader } from "../components";

const CustomImageBox = styled(Box)(({ theme }) => ({
  boxShadow: `inset 10px 50px 50px -10px ${theme.palette.primary.main}`,
  zIndex: 9999,
}));

const Cart = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const { cartItems, refetch, count } = useCart();

  const handleRemoveFromCart = async (id: string) => {
    try {
      setLoading(true);
      await axios.delete(`/cart-items/${id}`);
      await refetch();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loader />}
      <Box display="flex" flexDirection="column" sx={{ gap: 3 }} p={3}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h4">Cart Items</Typography>
          <Box display="flex" alignItems="center" sx={{ gap: 3 }}>
            <Typography variant="h5">Total: {count * 10}$</Typography>
            <Button variant="contained">Proceed to Checkout</Button>
          </Box>
        </Box>
        <Stack spacing={2}>
          {cartItems.map((item) => (
            <Box display="flex" key={item._id} sx={{ gap: 2 }}>
              <CustomImageBox
                borderRadius={1}
                width={240}
                height={160}
                sx={{
                  backgroundImage: `url(${item.image})`,
                  backgroundSize: "cover",
                }}
              />
              <Typography pt={1} variant="h5">
                {item.name}
              </Typography>
              <Rating value={item.rating} readOnly sx={{ mt: "4px", pt: 1 }} />
              <Box pt="4px">
                <IconButton
                  color="error"
                  onClick={() => handleRemoveFromCart(item._id)}
                >
                  <Delete />
                </IconButton>
              </Box>
              <Box flexGrow="1" />
              <Box display="flex" alignItems="center">
                <Typography variant="h5" sx={{ pt: 1 }} textAlign="right">
                  $10
                </Typography>
              </Box>
            </Box>
          ))}
        </Stack>
      </Box>
    </>
  );
};

export default Cart;
