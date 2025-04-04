"use client";

import { IoMdSearch, IoIosHeartEmpty, IoIosHeart } from "react-icons/io";
import { GoStar, GoStarFill } from "react-icons/go";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../ReduxToolkit/CartSlice";
import { addToWishlist } from "../ReduxToolkit/WishlistSlice";
import { useEffect, useState } from "react";
import { Tooltip } from "flowbite-react";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const wishlistItems = useSelector(
    (wishlist) => wishlist.wishlist.wishlistItems
  );
  const cartItems = useSelector((cart) => cart.cart.cartItems);

  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isInCart, setIsInCart] = useState(false);

  // Handle Check Product IsIn Wishlist
  useEffect(() => {
    const status = wishlistItems.find((item) => item.id === product.id);

    setIsInWishlist(status);
  }, [wishlistItems]);

  // Handle Check Product IsIn Cart
  useEffect(() => {
    const status = cartItems.find((item) => item.id === product.id);

    setIsInCart(status);
  }, [cartItems]);

  // Handle Adding Product To Cart
  const handleAddToCart = () => {
    console.log(product);
    dispatch(addToCart({ product }));
  };

  // Handle Adding Product To Wishlist
  const handleAddToWishlist = () => {
    dispatch(addToWishlist({ product }));
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="relative flex">
          <img className="" src={product.image} alt={product.name} />
          <div className="absolute flex h-full w-full items-center justify-center gap-3 opacity-0 duration-150 hover:opacity-100">
            <Link
              href={`/product-overview/${product.category_slug}/${product.id}`}
            >
              <span className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-amber-400">
                <Tooltip content="Details" placement="bottom">
                  <IoMdSearch />
                </Tooltip>
              </span>
            </Link>
            <span
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-amber-400"
              onClick={handleAddToWishlist}
            >
              <Tooltip
                content={isInWishlist ? "Remove" : "Add"}
                placement="bottom"
              >
                {isInWishlist ? <IoIosHeart /> : <IoIosHeartEmpty />}
              </Tooltip>
            </span>
          </div>

          {product.discount_percentage >= 1 ? (
            <div className="absolute right-1 mt-3 flex items-center justify-center bg-amber-400">
              <p className="px-2 py-2 text-sm">
                {product.discount_percentage}% OFF
              </p>
            </div>
          ) : (
            ""
          )}
        </div>

        <div>
          <p className="mt-2 whitespace-nowrap overflow-hidden text-ellipsis">
            {product.name}
          </p>
          <p className="font-medium text-violet-900">
            $
            {Math.floor(
              product.price * (1 - product.discount_percentage / 100)
            )}
            {product.discount_percentage >= 1 ? (
              <span className="text-sm text-red-500 line-through ms-1">
                ${product.price}
              </span>
            ) : (
              ""
            )}
          </p>

          <div className="flex items-center">
            {[...Array(5)].map((_, i) =>
              i < Number(product.rating) ? (
                <GoStarFill key={i} className="text-[#FACC15]" />
              ) : (
                <GoStar key={i} className="text-[#E5E7EB]" />
              )
            )}
            <p className="text-sm text-gray-400">({product.rating})</p>
          </div>

          <div>
            <button
              className={`my-5 h-10 w-full  text-white ${
                product.stock > 0
                  ? isInCart
                    ? "bg-[#FBBF24] text-[#000]"
                    : "bg-violet-900"
                  : "bg-red-500 cursor-not-allowed"
              }`}
              onClick={handleAddToCart}
              disabled={product.stock > 0 ? "" : "disabled"}
            >
              {product.stock > 0
                ? isInCart
                  ? "Update Quantity"
                  : "Add to Cart"
                : "Out of Stock"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
