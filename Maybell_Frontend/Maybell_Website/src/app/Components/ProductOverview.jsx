"use client";

import { useEffect, useState } from "react";
import Breadcrumb from "./BreadCrumb";
import RelatedProducts from "./RelatedProducts";
import { GoStar, GoStarFill } from "react-icons/go";
import { BsBagCheck } from "react-icons/bs";
import { IoMdSearch, IoIosHeartEmpty, IoIosHeart } from "react-icons/io";
import { toast } from "react-toastify";
import axios from "axios";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  removeFromCart,
  updateQuantity,
} from "../ReduxToolkit/CartSlice";
import { addToWishlist } from "../ReduxToolkit/WishlistSlice";

export default function ProductOverview() {
  const wishlistitems = useSelector(
    (wishlist) => wishlist.wishlist.wishlistItems
  );
  const cartItems = useSelector((cart) => cart.cart.cartItems);

  const dispatch = useDispatch();
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [productDetails, setProductDetails] = useState(null);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const [productQuantity, setProductQuantity] = useState(1);

  const param = useParams();

  // Get Product Details
  useEffect(() => {
    axios
      .get("https://wscubetech.co/ecommerce-api/productdetails.php", {
        params: {
          id: param.id[1],
        },
      })
      .then((result) => {
        setProductDetails(result.data.product);
      })
      .catch((error) => {
        toast.error("Something went wrong!!");
      });
  }, []);

  // Get Top Arrival Products
  useEffect(() => {
    axios
      .get("https://wscubetech.co/ecommerce-api/products.php", {
        params: {
          limit: 4,
          categories: param.id[0],
        },
      })
      .then((result) => {
        setRelatedProducts(result.data.data);
      })
      .catch((error) => {
        toast.error("Something went wrong !!");
      });
  }, [param.id]);

  const [mainImage, setMainImage] = useState(null);

  // Handle Change Current Image
  const handleCurrentImage = (image) => {
    setMainImage(image);
  };

  // Handle Add To Cart
  const handleAddToCart = () => {
    dispatch(addToCart({ product: productDetails }));
  };

  // Handle Add To Wishlist
  const handleAddToWishlist = () => {
    dispatch(addToWishlist({ product: productDetails }));
  };

  // Handle Check Product IsIn in Wishlist
  useEffect(() => {
    if (productDetails) {
      const checkInWishlist = wishlistitems.find(
        (item) => item.id === productDetails.id
      );

      if (checkInWishlist) {
        setIsInWishlist(true);
      } else {
        setIsInWishlist(false);
      }
    }
  }, [productDetails, wishlistitems]);

  // Handle Check Product IsIn in Cart
  useEffect(() => {
    if (productDetails) {
      const checkInCart = cartItems.find(
        (item) => item.id === productDetails.id
      );

      if (checkInCart) {
        setIsInCart(true);
      } else {
        setIsInCart(false);
      }
    }
  }, [productDetails, cartItems]);

  // Handle Product Current Quantity
  useEffect(() => {
    if (productDetails) {
      const getProduct = cartItems.find(
        (item) => item.id === productDetails.id
      );

      if (getProduct) {
        setProductQuantity(getProduct.quantity);
      } else {
        setProductQuantity(1);
      }
    }
  }, [productDetails, cartItems]);

  // Handle Product quantity Update
  const handleProdQuantity = (product, type, stock) => {
    const productInCart = cartItems.find((item) => item.id === product.id);

    // If the product is already in the cart
    if (productInCart) {
      if (type === "decrease") {
        if (productInCart.quantity === 1) {
          dispatch(removeFromCart({ id: productInCart.id }));
        } else {
          setProductQuantity((prev) => prev - 1);
          dispatch(updateQuantity({ id: productInCart.id, type, stock }));
        }
      } else if (type === "increase") {
        dispatch(updateQuantity({ id: productInCart.id, type, stock }));
      }
    }

    // If the product is not in the cart
    else if (!productInCart) {
      if (type === "decrease") {
        if (productQuantity > 1) {
          setProductQuantity((prev) => prev - 1);
          dispatch(addToCart({ product }));
        } else {
          toast.error("Add minimum 1 quantity");
        }
      } else {
        if (productQuantity < product.stock) {
          setProductQuantity((prev) => prev + 1);
          dispatch(addToCart({ product }));
        } else {
          toast.error("Maximum stock reached");
        }
      }
    }
  };

  return (
    <>
      {/* Product Overview Breadcrumb Start */}
      <Breadcrumb />
      {/* Product Overview Breadcrumb End */}

      {/* Product Overview Start */}
      {productDetails ? (
        <>
          <section className="container flex-grow mx-auto max-w-[1200px] border-b py-5 lg:grid lg:grid-cols-2 lg:py-10">
            {/* Image Gallery Start */}
            <div className="container mx-auto px-4">
              <img
                className="w-full"
                src={mainImage ? mainImage : productDetails.image}
                alt="Sofa image"
              />

              <div className="mt-3 grid grid-cols-4 gap-4">
                {productDetails?.multiple_images?.length >= 1
                  ? productDetails?.multiple_images?.map((image, index) => {
                      return (
                        <div
                          key={index}
                          onClick={() => handleCurrentImage(image)}
                        >
                          <img
                            className="cursor-pointer"
                            src={image}
                            alt="kitchen image"
                          />
                        </div>
                      );
                    })
                  : ""}
              </div>
            </div>
            {/* Image Gallery End */}

            {/* Description Start */}
            <div className="mx-auto px-5 lg:px-5">
              <h2 className="pt-3 text-2xl font-bold lg:pt-0 uppercase">
                {productDetails.name}
              </h2>
              <div className="mt-1">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) =>
                    i < productDetails.rating ? (
                      <GoStarFill className="text-[#FACC15]" key={i} />
                    ) : (
                      <GoStar className="text-[#FACC15]" key={i} />
                    )
                  )}

                  <p className="ml-3 text-sm text-gray-400">
                    ({productDetails.rating})
                  </p>
                </div>
              </div>

              <p className="mt-5 font-bold">
                Availability:
                {productDetails.stock <= 0 ? (
                  <span className="text-red-600 ms-2">Out of Stock</span>
                ) : (
                  <span className="text-green-600 ms-2">In Stock</span>
                )}
              </p>
              <p className="font-bold">
                Brand:
                <span className="font-normal">{productDetails.brand}</span>
              </p>
              <p className="font-bold">
                Category:
                <span className="font-normal ms-1">
                  {productDetails.category}
                </span>
              </p>
              <p className="font-bold">
                SKU:
                <span className="font-normal">
                  {productDetails.sku ? productDetails.sku : "-/NIL"}
                </span>
              </p>

              <p className="mt-4 text-4xl font-bold text-violet-900">
                {productDetails.discount_percentage > 0 ? (
                  <span className="me-2">
                    $
                    {Math.floor(
                      productDetails.price *
                        (1 - productDetails.discount_percentage / 100)
                    )}
                  </span>
                ) : (
                  ""
                )}
                <span
                  className={`${
                    productDetails.discount_percentage > 0
                      ? "line-through opacity-50 text-red-400"
                      : ""
                  }`}
                >
                  {productDetails.price}
                </span>
              </p>

              <p className="pt-5 text-sm leading-5 text-gray-500">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem
                exercitationem voluptate sint eius ea assumenda provident eos
                repellendus qui neque! Velit ratione illo maiores voluptates
                commodi eaque illum, laudantium non!
              </p>

              <div className="mt-6">
                <p className="pb-2 text-xs text-gray-500">Size</p>

                <div className="flex gap-1">
                  <div className="flex h-8 w-8 cursor-pointer items-center justify-center border duration-100 hover:bg-neutral-100 focus:ring-2 focus:ring-gray-500 active:ring-2 active:ring-gray-500">
                    XS
                  </div>
                  <div className="flex h-8 w-8 cursor-pointer items-center justify-center border duration-100 hover:bg-neutral-100 focus:ring-2 focus:ring-gray-500 active:ring-2 active:ring-gray-500">
                    S
                  </div>
                  <div className="flex h-8 w-8 cursor-pointer items-center justify-center border duration-100 hover:bg-neutral-100 focus:ring-2 focus:ring-gray-500 active:ring-2 active:ring-gray-500">
                    M
                  </div>

                  <div className="flex h-8 w-8 cursor-pointer items-center justify-center border duration-100 hover:bg-neutral-100 focus:ring-2 focus:ring-gray-500 active:ring-2 active:ring-gray-500">
                    L
                  </div>

                  <div className="flex h-8 w-8 cursor-pointer items-center justify-center border duration-100 hover:bg-neutral-100 focus:ring-2 focus:ring-gray-500 active:ring-2 active:ring-gray-500">
                    XL
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <p className="pb-2 text-xs text-gray-500">Color</p>

                <div className="flex gap-1">
                  <div className="h-8 w-8 cursor-pointer border border-white bg-gray-600 focus:ring-2 focus:ring-gray-500 active:ring-2 active:ring-gray-500"></div>
                  <div className="h-8 w-8 cursor-pointer border border-white bg-violet-900 focus:ring-2 focus:ring-gray-500 active:ring-2 active:ring-gray-500"></div>
                  <div className="h-8 w-8 cursor-pointer border border-white bg-red-900 focus:ring-2 focus:ring-gray-500 active:ring-2 active:ring-gray-500"></div>
                </div>
              </div>

              <div className="mt-6">
                <p className="pb-2 text-xs text-gray-500">Quantity</p>

                <div className="flex">
                  <button
                    className="flex h-8 w-8 cursor-pointer items-center justify-center border duration-100 hover:bg-neutral-100 focus:ring-2 focus:ring-gray-500 active:ring-2 active:ring-gray-500"
                    onClick={() =>
                      handleProdQuantity(
                        productDetails,
                        "decrease",
                        productDetails.stock
                      )
                    }
                  >
                    &minus;
                  </button>
                  <div className="flex h-8 w-8 cursor-text items-center justify-center border-t border-b active:ring-gray-500">
                    {productQuantity}
                  </div>
                  <button
                    className="flex h-8 w-8 cursor-pointer items-center justify-center border duration-100 hover:bg-neutral-100 focus:ring-2 focus:ring-gray-500 active:ring-2 active:ring-gray-500"
                    onClick={() =>
                      handleProdQuantity(
                        productDetails,
                        "increase",
                        productDetails.stock
                      )
                    }
                  >
                    &#43;
                  </button>
                </div>
              </div>

              <div className="mt-7 flex flex-row items-center gap-6">
                <button
                  className={`flex h-12 w-1/3 items-center justify-center text-white duration-100 hover:bg-blue-800 ${
                    isInCart
                      ? "bg-[#FBBF24] text-[#000] hover:text-[#fff]"
                      : "bg-violet-900"
                  }`}
                  onClick={() => handleAddToCart(productDetails)}
                >
                  <BsBagCheck />
                  {isInCart ? "Update Quantity" : "Add to cart"}
                </button>
                <button
                  className="flex h-12 w-1/3 items-center justify-center bg-amber-400 duration-100 hover:bg-yellow-300"
                  onClick={() => handleAddToWishlist(productDetails)}
                >
                  {isInWishlist ? <IoIosHeart /> : <IoIosHeartEmpty />}
                  Wishlist
                </button>
              </div>
            </div>
            {/* Description End */}
          </section>

          {/* Product Details Start */}
          <section className="container mx-auto max-w-[1200px] px-5 py-5 lg:py-10">
            <h2 className="text-xl">Product details</h2>
            <p className="mt-4 lg:w-3/4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
              consequatur temporibus deserunt id labore. Et, iusto nostrum
              repellat laudantium iure fuga quibusdam laborum laboriosam earum.
              Fugit possimus impedit harum dolor? <br />
              Laboriosam quo impedit, reprehenderit eum eaque eius tempore non
              blanditiis, labore quibusdam nesciunt atque doloribus cum autem?
              <br />
              Autem magni ullam alias pariatur corporis officiis animi neque,
              quo, ab aperiam ratione! Similique deserunt dolore dignissimos,
              iure quisquam mollitia perferendis pariatur reprehenderit dolorem,
              cum enim aut ad amet in ducimus sint, commodi neque quis saepe
              libero dolor dolores. Sequi voluptas adipisci minus!
            </p>

            <table className="mt-7 w-full table-auto divide-x divide-y lg:w-1/2">
              <tbody className="divide-x border">
                <tr>
                  <td className="border pl-4 font-bold">Color</td>
                  <td className="border pl-4">Black, Brown, Red</td>
                </tr>

                <tr>
                  <td className="border pl-4 font-bold">Material</td>
                  <td className="border pl-4">Latex</td>
                </tr>

                <tr>
                  <td className="border pl-4 font-bold">Weight</td>
                  <td className="border pl-4">55 Kg</td>
                </tr>
              </tbody>
            </table>
          </section>
          {/* Product Details End */}

          {/* Related Products Start */}
          <RelatedProducts products={relatedProducts} />
          {/* Related Products End */}
        </>
      ) : (
        <p className="text-center">No Such Product!!</p>
      )}
      {/* Product Overview End */}
    </>
  );
}
