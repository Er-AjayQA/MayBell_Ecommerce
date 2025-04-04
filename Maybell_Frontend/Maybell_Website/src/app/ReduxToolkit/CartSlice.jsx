import { toast } from "react-toastify";

const { createSlice } = require("@reduxjs/toolkit");

var getCartData = [];

// Get the Cart Value from Local Storage
if (typeof window !== "undefined") {
  getCartData = JSON.parse(localStorage.getItem("cartItems"));
  getCartData = getCartData ? getCartData : [];
}

const initialState = {
  cartItems: getCartData ? getCartData : [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      let { product } = action.payload;

      // Check if the item is already in cart
      const existingItem = state.cartItems.find(
        (item) => item.id === product.id
      );

      if (existingItem) {
        if (existingItem.quantity >= product.stock) {
          toast.error("Cannot add more than available stock!!");
        } else {
          existingItem.quantity += 1;
          toast.success("Updating item quantity!!");
        }
      } else {
        const data = {
          id: product.id,
          name: product.name,
          image: product.image,
          price: product.price,
          categorySlug: product.category_slug,
          discountedPrice:
            product.discounted_price > 0
              ? Math.floor(
                  product.price * (1 - product.discount_percentage / 100)
                )
              : product.price,
          stock: product.stock,
        };
        const finalData = [...state.cartItems, { ...data, quantity: 1 }];
        state.cartItems = finalData;
        toast.success("Successfully added to cart!!");
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action) => {
      const { id } = action.payload;
      const finalData = state.cartItems.filter((item) => item.id != id);
      state.cartItems = finalData;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      toast.success("Removed from cart!!");
    },
    updateQuantity: (state, action) => {
      const { id, type, stock } = action.payload;

      state.cartItems = state.cartItems.map((item) => {
        if (item.id === id) {
          if (type === "decrease") {
            return { ...item, quantity: item.quantity - 1 };
          }

          if (type === "increase") {
            if (item.quantity >= stock) {
              toast.error("Cannot select more than stock availability!!");
              return item; // Return the item unchanged
            } else {
              return { ...item, quantity: item.quantity + 1 };
            }
          }
        }
        return item;
      });

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
