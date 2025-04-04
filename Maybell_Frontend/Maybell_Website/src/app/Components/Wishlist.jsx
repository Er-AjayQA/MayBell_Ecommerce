import Breadcrumb from "./BreadCrumb";
import WishlistProdListing from "./WishlistProdListing";
import ProfileSidebar from "./ProfileSidebar";

export default function Wishlist() {
  return (
    <>
      {/* Breadcrumb Start */}
      <Breadcrumb page={"My Wishlist"} />
      {/* Breadcrumb End */}

      <section className="container flex-grow mx-auto max-w-[1200px] border-b py-5 lg:flex lg:flex-row lg:py-10">
        {/* Profile Sidebar Start */}
        <ProfileSidebar />
        {/* Profile Sidebar End */}

        {/* Wishlist Product List Start */}
        <WishlistProdListing />
        {/* Wishlist Product List End */}
      </section>
    </>
  );
}
