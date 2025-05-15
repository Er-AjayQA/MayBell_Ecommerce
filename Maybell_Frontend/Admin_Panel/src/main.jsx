import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./assets/css/style.css";
import { LoginPage } from "./Components/Pages/Login";
import { Home } from "./Components/Pages/Home";
import { MainLayout } from "./Components/Layouts/MainLayout";
import { CommonContext } from "./Context/CommonContext";
import { Admins } from "./Components/Pages/Admins";
import { Users } from "./Components/Pages/Users";
import { Countries } from "./Components/Pages/Countries";
import { PageNotFound } from "./Components/UI/PageNotFound";
import { Sliders } from "./Components/Pages/Sliders";
import { Testimonials } from "./Components/Pages/Testimonials";
import { WhyChooseUs } from "./Components/Pages/WhyChooseUs";
import { Coupons } from "./Components/Pages/Coupons";
import { Products } from "./Components/Pages/Products";
import { Enquiry } from "./Components/Pages/Enquiry";
import { Newsletters } from "./Components/Pages/Newsletters";
import { PaymentGateways } from "./Components/Pages/PaymentGateways";
import { Configurations } from "./Components/Pages/Configurations";
import { Faq } from "./Components/Pages/Faq";
import { CmsPages } from "./Components/Pages/CmsPages";
import { BodyLayout } from "./Components/Layouts/BodyLayout";
import { MaterialTableListing } from "./Components/Pages/Materials/MaterialListing";
import { MaterialContext } from "./Context/MaterialsContext";
import { ColorsTableListing } from "./Components/Pages/Colors/ColorsListing";
import { ColorsContext } from "./Context/ColorsContext";
import { CategoryContext } from "./Context/CategoryContext";
import { CategoryTableListing } from "./Components/Pages/Category/CategoryListing";
import { SubCategoryContext } from "./Context/SubCategoryContext";
import { SubCategoryTableListing } from "./Components/Pages/SubCategory/SubCategoryListing";
import { UomContext } from "./Context/UomContext";
import { UomTableListing } from "./Components/Pages/Uom/UomListing";
import { BrandsContext } from "./Context/BrandsContext";
import { BrandsTableListing } from "./Components/Pages/Brands/BrandsListing";
import { ProductsContext } from "./Context/ProductsContext";
import { ProductTableListing } from "./Components/Pages/Products/ProductsListing";
import { CreateProductPage } from "./Components/Pages/Products/CreateProducts";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <CommonContext>
      <Routes>
        <Route path="/furniture/admin-panel/login" element={<LoginPage />} />
        <Route element={<MainLayout />}>
          <Route element={<BodyLayout />}>
            <Route path="/furniture/admin-panel" element={<Home />} />
            <Route path="/furniture/admin-panel/admins" element={<Admins />} />
            <Route path="/furniture/admin-panel/users" element={<Users />} />
            <Route
              path="/furniture/admin-panel/countries"
              element={<Countries />}
            />
            <Route
              path="/furniture/admin-panel/sliders"
              element={<Sliders />}
            />
            <Route
              path="/furniture/admin-panel/testimonials"
              element={<Testimonials />}
            />
            <Route
              path="/furniture/admin-panel/why-choose-us"
              element={<WhyChooseUs />}
            />
            <Route
              path="/furniture/admin-panel/coupons"
              element={<Coupons />}
            />

            {/* Category Route Start */}
            <Route path="/furniture/admin-panel/category">
              <Route
                path="create"
                element={
                  <CategoryContext>
                    <CategoryTableListing />
                  </CategoryContext>
                }
              />
              <Route
                path="update/:id"
                element={
                  <CategoryContext>
                    <CategoryTableListing />
                  </CategoryContext>
                }
              />
              <Route
                path=""
                element={
                  <CategoryContext>
                    <CategoryTableListing />
                  </CategoryContext>
                }
              />
            </Route>
            {/* Category Route End */}

            {/* SubCategory Route Start */}
            <Route path="/furniture/admin-panel/sub-category">
              <Route
                path="create"
                element={
                  <SubCategoryContext>
                    <SubCategoryTableListing />
                  </SubCategoryContext>
                }
              />
              <Route
                path="update/:id"
                element={
                  <SubCategoryContext>
                    <SubCategoryTableListing />
                  </SubCategoryContext>
                }
              />
              <Route
                path=""
                element={
                  <SubCategoryContext>
                    <SubCategoryTableListing />
                  </SubCategoryContext>
                }
              />
            </Route>
            {/* SubCategory Route End */}

            {/* Colors Route Start */}
            <Route path="/furniture/admin-panel/colors">
              <Route
                path="create"
                element={
                  <ColorsContext>
                    <ColorsTableListing />
                  </ColorsContext>
                }
              />
              <Route
                path="update/:id"
                element={
                  <ColorsContext>
                    <ColorsTableListing />
                  </ColorsContext>
                }
              />
              <Route
                path=""
                element={
                  <ColorsContext>
                    <ColorsTableListing />
                  </ColorsContext>
                }
              />
            </Route>
            {/* Colors Route End */}

            {/* Materials Route Start */}
            <Route path="/furniture/admin-panel/materials">
              <Route
                path="create"
                element={
                  <MaterialContext>
                    <MaterialTableListing />
                  </MaterialContext>
                }
              />
              <Route
                path="update/:id"
                element={
                  <MaterialContext>
                    <MaterialTableListing />
                  </MaterialContext>
                }
              />
              <Route
                path=""
                element={
                  <MaterialContext>
                    <MaterialTableListing />
                  </MaterialContext>
                }
              />
            </Route>
            {/* Materials Route End */}

            {/* UOM Route Start */}
            <Route path="/furniture/admin-panel/uom">
              <Route
                path="create"
                element={
                  <UomContext>
                    <UomTableListing />
                  </UomContext>
                }
              />
              <Route
                path="update/:id"
                element={
                  <UomContext>
                    <UomTableListing />
                  </UomContext>
                }
              />
              <Route
                path=""
                element={
                  <UomContext>
                    <UomTableListing />
                  </UomContext>
                }
              />
            </Route>
            {/* UOM Route End */}

            {/* Brands Route Start */}
            <Route path="/furniture/admin-panel/brands">
              <Route
                path="create"
                element={
                  <BrandsContext>
                    <BrandsTableListing />
                  </BrandsContext>
                }
              />
              <Route
                path="update/:id"
                element={
                  <BrandsContext>
                    <BrandsTableListing />
                  </BrandsContext>
                }
              />
              <Route
                path=""
                element={
                  <BrandsContext>
                    <BrandsTableListing />
                  </BrandsContext>
                }
              />
            </Route>
            {/* Brands Route End */}

            {/* Products Route Start */}
            <Route path="/furniture/admin-panel/products">
              <Route
                path="create"
                element={
                  <ProductsContext>
                    <CreateProductPage />
                  </ProductsContext>
                }
              />
              <Route
                path="update/:id"
                element={
                  <ProductsContext>
                    <ProductTableListing />
                  </ProductsContext>
                }
              />
              <Route
                path=""
                element={
                  <ProductsContext>
                    <ProductTableListing />
                  </ProductsContext>
                }
              />
            </Route>
            {/* Products Route End */}

            <Route
              path="/furniture/admin-panel/products"
              element={<Products />}
            />
            <Route
              path="/furniture/admin-panel/enquiry"
              element={<Enquiry />}
            />
            <Route
              path="/furniture/admin-panel/newsletters"
              element={<Newsletters />}
            />
            <Route
              path="/furniture/admin-panel/payment-gateways"
              element={<PaymentGateways />}
            />
            <Route
              path="/furniture/admin-panel/configurations"
              element={<Configurations />}
            />
            <Route path="/furniture/admin-panel/faq" element={<Faq />} />
            <Route
              path="/furniture/admin-panel/cms-pages"
              element={<CmsPages />}
            />
            <Route path="/furniture/admin-panel/*" element={<PageNotFound />} />
          </Route>
        </Route>
      </Routes>
    </CommonContext>
  </BrowserRouter>
);
