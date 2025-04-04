import ProductCard from "./ProductCard";

export default function RelatedProducts({ products }) {
  return (
    <>
      <p className="mx-auto mt-10 mb-5 max-w-[1200px] px-5">RELATED PRODUCTS</p>
      <section
        className={`container mx-auto grid max-w-[1200px] gap-3 px-5 pb-10 ${
          products.length <= 0 ? "grid-cols-1" : "grid-cols-2 lg:grid-cols-4"
        }`}
      >
        {products.length <= 0 ? (
          <p className="text-center">No Products Available!!</p>
        ) : (
          products.map((product) => {
            return <ProductCard key={product.id} product={product} />;
          })
        )}
      </section>
    </>
  );
}
