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
import { Materials } from "./Components/Pages/Materials";
import { Products } from "./Components/Pages/Products";
import { Enquiry } from "./Components/Pages/Enquiry";
import { Newsletters } from "./Components/Pages/Newsletters";
import { PaymentGateways } from "./Components/Pages/PaymentGateways";
import { Configurations } from "./Components/Pages/Configurations";
import { Faq } from "./Components/Pages/Faq";
import { CmsPages } from "./Components/Pages/CmsPages";
import { BodyLayout } from "./Components/Layouts/BodyLayout";
import { Colors } from "./Components/Pages/Colors";
import { Category } from "./Components/Pages/Category";
import { SubCategory } from "./Components/Pages/SubCategory";

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
            <Route path="/furniture/admin-panel/">
              <Route path="categories" element={<Category />} />
              <Route path="categories/create" element={<Category />} />
              <Route path="categories/update/:id" element={<Category />} />
            </Route>
            {/* Category Route End */}

            {/* SubCategory Route Start */}
            <Route path="/furniture/admin-panel/">
              <Route path="sub-categories" element={<SubCategory />} />
              <Route path="sub-categories/create" element={<SubCategory />} />
              <Route
                path="sub-categories/update/:id"
                element={<SubCategory />}
              />
            </Route>
            {/* SubCategory Route End */}

            {/* Colors Route Start */}
            <Route path="/furniture/admin-panel/">
              <Route path="colors" element={<Colors />} />
              <Route path="colors/create" element={<Colors />} />
              <Route path="colors/update/:id" element={<Colors />} />
            </Route>
            {/* Colors Route End */}

            {/* Materials Route Start */}
            <Route path="/furniture/admin-panel/">
              <Route path="materials" element={<Materials />} />
              <Route path="materials/create" element={<Materials />} />
              <Route path="materials/update/:id" element={<Materials />} />
            </Route>
            {/* Materials Route End */}

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
