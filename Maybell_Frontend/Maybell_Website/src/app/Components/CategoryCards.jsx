import Link from "next/link";

export default function CategoryCards({ category }) {
  return (
    <>
      {/* Category Card Start */}
      <Link href={`/catalog/${category.slug}`}>
        <div className="relative cursor-pointer">
          <img
            className="mx-auto h-auto w-auto brightness-50 duration-300 hover:brightness-100"
            src="/images/bedroom.png"
            alt="bedroom category image"
          />

          <p className="pointer-events-none absolute top-1/2 left-1/2 w-11/12 -translate-x-1/2 -translate-y-1/2 text-center text-white lg:text-xl">
            {category.name}
          </p>
        </div>
      </Link>
      {/* Category Card End */}
    </>
  );
}
