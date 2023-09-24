import { useEffect, useState, createContext } from "react";
import axios from "axios";
import { ICartItem } from "../interfaces";

type CartContextType = {
  cartItems: Array<ICartItem>;
  count: number;
  refetch: () => Promise<void>;
};

export const CartContext = createContext<CartContextType>({
  cartItems: [],
  count: 0,
  refetch: async () => {},
});

interface Props {
  [propName: string]: any;
}

const CartContextProvider = (props: Props) => {
  const [cartItems, setCartItems] = useState<Array<ICartItem>>([]);
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    refetch();
  }, []);

  const refetch = async () => {
    try {
      const response = await axios.get("/cart-items");
      const { items, count } = response.data;
      setCartItems(items);
      setCount(count);
    } catch (error) {}
  };

  const value = {
    cartItems,
    count,
    refetch,
  };

  return <CartContext.Provider value={value} {...props} />;
};

export default CartContextProvider;
