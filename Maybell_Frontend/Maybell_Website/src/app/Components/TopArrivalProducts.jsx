var $ = require("jquery");

if (typeof window !== "undefined") {
  window.$ = window.jQuery = require("jquery");
}

import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ProductCard from "./ProductCard";

export const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
  ssr: false,
});

export default function TopArrivalProduct({ products }) {
  const [topArrivalProducts, setTopArrivalProducts] = useState([]);

  // Handling Top Arrival Products API
  useEffect(() => {
    axios
      .get("https://wscubetech.co/ecommerce-api/products.php", {
        params: {
          limit: 8,
          categories: "home-decoration",
        },
      })
      .then((response) => {
        setTopArrivalProducts(response.data.data);
      })
      .catch((error) => toast.error("Something went wrong!!"));
  }, []);

  return (
    <>
      {/* Top New Arrival Section Start  */}
      <p className="mx-auto mt-10 mb-5 max-w-[1200px] px-5">TOP NEW ARRIVAL</p>
      {products.length <= 0 ? "" : ""}
      <section
        className="splide mx-auto max-w-[1200px] px-5 py-2"
        aria-label="Splide Basic HTML Example"
      >
        <div className="splide__track">
          <OwlCarousel
            loop
            margin={10}
            nav
            dots
            items={4}
            autoplay
            navText={["‹", "›"]} // Custom icons for prev/next buttons
            className="splide__list mx-auto max-w-[1200px]"
          >
            {topArrivalProducts.map((product) => {
              return (
                <div
                  key={product.id}
                  className="item splide__slide list-style-none "
                >
                  <ProductCard product={product} />
                </div>
              );
            })}
          </OwlCarousel>
        </div>
      </section>
      {/* Top New Arrival Section End */}
    </>
  );
}
