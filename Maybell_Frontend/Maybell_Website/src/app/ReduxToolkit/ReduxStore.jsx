import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./CartSlice";
import wishlistSlice from "./WishlistSlice";

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    wishlist: wishlistSlice,
  },
});
