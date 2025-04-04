"use client";

import { useDispatch, useSelector } from "react-redux";
import { WishlistDesktopCard } from "./WishlistDesktopCard";
import { WishlistMobileCard } from "./WishlistMobileCard";
import { addToCart } from "../ReduxToolkit/CartSlice";
import { removeFromWishlist } from "../ReduxToolkit/WishlistSlice";

export default function WishlistProdListing() {
  const dispatch = useDispatch();
  const wishlistItems = useSelector(
    (wishlist) => wishlist.wishlist.wishlistItems
  );

  // Handle Add Product to Cart
  const handleAddToCart = (product) => {
    dispatch(addToCart({ product }));
  };

  // Handle Remove Product from Wishlist
  const handleRemoveFromWishlist = (id) => {
    dispatch(removeFromWishlist({ id }));
  };

  return (
    <>
      {/* Option Cards Start */}

      <div className="mb-5 flex items-center justify-between px-5 lg:hidden">
        <div className="flex gap-3">
          <div className="py-5">
            <div className="flex items-center">
              <img
                width="40px"
                height="40px"
                className="rounded-full object-cover"
                src="/images/avatar-photo.png"
                alt="Red woman portrait"
              />
              <div className="ml-5">
                <p className="font-medium text-gray-500">Hello,</p>
                <p className="font-bold">Sarah Johnson</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Product Cards Start */}
      <section className="mx-auto container grid grid-cols-2 gap-5 px-5 pb-10 md:hidden">
        {wishlistItems.length >= 1 ? (
          wishlistItems.map((product) => {
            return (
              <WishlistMobileCard
                key={product.id}
                product={product}
                handleAddToCart={handleAddToCart}
                handleRemoveFromWishlist={handleRemoveFromWishlist}
              />
            );
          })
        ) : (
          <p className="text-center">Your wishlist is empty!!</p>
        )}
      </section>
      {/* Mobile Product Cards End */}

      {/* Desktop Product Cards Start */}
      <section className="hidden w-full max-w-[1200px] grid-cols-1 gap-8 px-5 pb-10 md:grid">
        {wishlistItems.length >= 1 ? (
          wishlistItems.map((product) => {
            return (
              <WishlistDesktopCard
                key={product.id}
                product={product}
                handleAddToCart={handleAddToCart}
                handleRemoveFromWishlist={handleRemoveFromWishlist}
              />
            );
          })
        ) : (
          <p className="text-center">Your wishlist is empty!!</p>
        )}
      </section>
      {/* Desktop Product Cards End */}

      {/* Option Cards End */}
    </>
  );
}
