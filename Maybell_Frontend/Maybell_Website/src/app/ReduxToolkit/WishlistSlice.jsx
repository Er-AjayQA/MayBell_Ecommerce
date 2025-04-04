import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

var getWishlistFromLocal = [];

// Get the Cart Value from Local Storage
if (typeof window !== "undefined") {
  getWishlistFromLocal = JSON.parse(localStorage.getItem("wishlist"));
  getWishlistFromLocal = getWishlistFromLocal ? getWishlistFromLocal : [];
}

const initialState = {
  wishlistItems: getWishlistFromLocal ? getWishlistFromLocal : [],
};

export const wishlistSlice = createSlice({
  name: "wishlistAllItems",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const { product } = action.payload;

      const checkIfAlreadyExist = state.wishlistItems.find(
        (item) => item.id === product.id
      );

      if (checkIfAlreadyExist) {
        const finalData = state.wishlistItems.filter((item) => {
          return item.id !== product.id;
        });

        state.wishlistItems = finalData;
        localStorage.setItem("wishlist", JSON.stringify(state.wishlistItems));
        toast.success("Removed from wishlist!!");
      } else {
        const data = {
          id: product.id,
          name: product.name,
          image: product.image,
          price: product.price,
          categorySlug: product.category_slug,
          discount: product.discount_percentage,
          discountedPrice:
            product.discounted_price > 0
              ? Math.floor(
                  product.price * (1 - product.discount_percentage / 100)
                )
              : product.price,
          stock: product.stock,
        };
        const finalData = [...state.wishlistItems, data];
        state.wishlistItems = finalData;
        localStorage.setItem("wishlist", JSON.stringify(state.wishlistItems));
        toast.success("Add to wishlist!!");
      }
    },
    removeFromWishlist: (state, action) => {
      const { id } = action.payload;
      const finalData = state.wishlistItems.filter((item) => item.id !== id);

      state.wishlistItems = finalData;
      localStorage.setItem("wishlist", JSON.stringify(state.wishlistItems));
    },
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
