import ProductCard from "./ProductCard";

export default function RecommendedProducts({ products }) {
  return (
    <>
      {/* Top New Arrival Section Start  */}
      <p className="mx-auto mt-10 mb-5 max-w-[1200px] px-5">
        RECOMMENDED FOR YOU
      </p>
      {products.length <= 0 ? "" : ""}
      <section
        className={`mx-auto grid max-w-[1200px] gap-3 px-5 pb-10 ${
          products.length <= 0 ? "grid-cols-1" : "grid-cols-2 lg:grid-cols-4"
        }`}
      >
        {products.length <= 0 ? (
          <p className="text-center">No Products Available Yet!!</p>
        ) : (
          products.map((product, index) => {
            return <ProductCard key={product.id} product={product} />;
          })
        )}
      </section>
      {/* Top New Arrival Section End */}
    </>
  );
}
