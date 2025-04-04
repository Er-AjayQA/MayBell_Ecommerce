import Breadcrumb from "./BreadCrumb";
import OrderSummary from "./OrderSummary";
import ProfileSidebar from "./ProfileSidebar";

export default function OrderOverview() {
  return (
    <>
      {/* Order Overview Breadcrumb Start */}
      <Breadcrumb page={"Order Overview"} />
      {/* Order Overview Breadcrumb End */}

      {/* Order Overview Content Start */}
      <section className="container flex-grow mx-auto max-w-[1200px] border-b py-5 lg:flex lg:flex-row lg:py-10">
        {/* Sidebar Start */}
        <ProfileSidebar />
        {/* Sidebar End */}

        {/* Mobile Product Table Start */}
        <section className="container mx-auto my-3 flex w-full flex-col gap-3 px-4 md:hidden">
          <div className="flex w-full border px-4 py-4">
            <img
              className="self-start object-contain"
              width="90px"
              src="/images/bedroom.png"
              alt="bedroom image"
            />
            <div className="ml-3 flex w-full flex-col justify-center">
              <div className="flex items-center justify-between">
                <p className="text-xl font-bold">ITALIAN BED</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path d="M9.653 16.915l-.005-.003-.019-.01a20.759 20.759 0 01-1.162-.682 22.045 22.045 0 01-2.582-1.9C4.045 12.733 2 10.352 2 7.5a4.5 4.5 0 018-2.828A4.5 4.5 0 0118 7.5c0 2.852-2.044 5.233-3.885 6.82a22.049 22.049 0 01-3.744 2.582l-.019.01-.005.003h-.002a.739.739 0 01-.69.001l-.002-.001z" />
                </svg>
              </div>
              <p className="text-sm text-gray-400">Size: XL</p>
              <p className="py-3 text-xl font-bold text-violet-900">$320</p>
              <div className="mt-2 flex w-full items-center justify-between">
                <div className="flex items-center justify-center">
                  <div className="flex cursor-text items-center justify-center active:ring-gray-500">
                    Quantity: 1
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex w-full border px-4 py-4">
            <img
              className="self-start object-contain"
              width="90px"
              src="/images/product-chair.png"
              alt="Chair image"
            />
            <div className="ml-3 flex w-full flex-col justify-center">
              <div className="flex items-center justify-between">
                <p className="text-xl font-bold">GUYER CHAIR</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path d="M9.653 16.915l-.005-.003-.019-.01a20.759 20.759 0 01-1.162-.682 22.045 22.045 0 01-2.582-1.9C4.045 12.733 2 10.352 2 7.5a4.5 4.5 0 018-2.828A4.5 4.5 0 0118 7.5c0 2.852-2.044 5.233-3.885 6.82a22.049 22.049 0 01-3.744 2.582l-.019.01-.005.003h-.002a.739.739 0 01-.69.001l-.002-.001z" />
                </svg>
              </div>
              <p className="text-sm text-gray-400">Size: XL</p>
              <p className="py-3 text-xl font-bold text-violet-900">$320</p>
              <div className="mt-2 flex w-full items-center justify-between">
                <div className="flex items-center justify-center">
                  <div className="flex cursor-text items-center justify-center active:ring-gray-500">
                    Quantity: 1
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex w-full border px-4 py-4">
            <img
              className="self-start object-contain"
              width="90px"
              src="/images/outdoors.png"
              alt="Outdoor chair image"
            />
            <div className="ml-3 flex w-full flex-col justify-center">
              <div className="flex items-center justify-between">
                <p className="text-xl font-bold">OUTDOOR CHAIR</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path d="M9.653 16.915l-.005-.003-.019-.01a20.759 20.759 0 01-1.162-.682 22.045 22.045 0 01-2.582-1.9C4.045 12.733 2 10.352 2 7.5a4.5 4.5 0 018-2.828A4.5 4.5 0 0118 7.5c0 2.852-2.044 5.233-3.885 6.82a22.049 22.049 0 01-3.744 2.582l-.019.01-.005.003h-.002a.739.739 0 01-.69.001l-.002-.001z" />
                </svg>
              </div>
              <p className="text-sm text-gray-400">Size: XL</p>
              <p className="py-3 text-xl font-bold text-violet-900">$320</p>
              <div className="mt-2 flex w-full items-center justify-between">
                <div className="flex items-center justify-center">
                  <div className="flex cursor-text items-center justify-center active:ring-gray-500">
                    Quantity: 1
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex w-full border px-4 py-4">
            <img
              className="self-start object-contain"
              width="90px"
              src="/images/matrass.png"
              alt="Matrass image"
            />
            <div className="ml-3 flex w-full flex-col justify-center">
              <div className="flex items-center justify-between">
                <p className="text-xl font-bold">MATRASS COMFORT &plus;</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path d="M9.653 16.915l-.005-.003-.019-.01a20.759 20.759 0 01-1.162-.682 22.045 22.045 0 01-2.582-1.9C4.045 12.733 2 10.352 2 7.5a4.5 4.5 0 018-2.828A4.5 4.5 0 0118 7.5c0 2.852-2.044 5.233-3.885 6.82a22.049 22.049 0 01-3.744 2.582l-.019.01-.005.003h-.002a.739.739 0 01-.69.001l-.002-.001z" />
                </svg>
              </div>
              <p className="text-sm text-gray-400">Size: XL</p>
              <p className="py-3 text-xl font-bold text-violet-900">$320</p>
              <div className="mt-2 flex w-full items-center justify-between">
                <div className="flex items-center justify-center">
                  <div className="flex cursor-text items-center justify-center active:ring-gray-500">
                    Quantity: 1
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Mobile Product Table End */}

        {/* Product Table Start */}
        <section className="w-full max-w-[1200px] gap-3 px-5 pb-10">
          {/* Products Listing Start */}
          <table className="hidden w-full md:table">
            <thead className="h-16 bg-neutral-100">
              <tr>
                <th>ITEM</th>
                <th>PRICE</th>
                <th>QUANTITY</th>
                <th>TOTAL</th>
              </tr>
            </thead>
            <tbody>
              <tr className="h-[100px] border-b">
                <td className="align-middle">
                  <div className="flex">
                    <img
                      className="w-[90px]"
                      src="/images/bedroom.png"
                      alt="bedroom image"
                    />
                    <div className="ml-3 flex flex-col justify-center">
                      <p className="text-xl font-bold">ITALIAN BED</p>
                      <p className="text-sm text-gray-400">Size: XL</p>
                    </div>
                  </div>
                </td>
                <td className="mx-auto text-center">&#36;320</td>
                <td className="text-center align-middle">1</td>
                <td className="mx-auto text-center">&#36;320</td>
              </tr>

              <tr className="h-[100px] border-b">
                <td className="align-middle">
                  <div className="flex">
                    <img
                      className="w-[90px]"
                      src="/images/product-chair.png"
                      alt="Chair Image"
                    />
                    <div className="ml-3 flex flex-col justify-center">
                      <p className="text-xl font-bold">GUYER CHAIR</p>
                      <p className="text-sm text-gray-400">Size: XL</p>
                    </div>
                  </div>
                </td>
                <td className="mx-auto text-center">&#36;320</td>
                <td className="text-center align-middle">1</td>
                <td className="mx-auto text-center">&#36;320</td>
              </tr>

              <tr className="h-[100px] border-b">
                <td className="align-middle">
                  <div className="flex">
                    <img
                      className="w-[90px]"
                      src="/images/outdoors.png"
                      alt="Outdoor furniture"
                    />
                    <div className="ml-3 flex flex-col justify-center">
                      <p className="text-xl font-bold">OUTDOOR CHAIR</p>
                      <p className="text-sm text-gray-400">Size: XL</p>
                    </div>
                  </div>
                </td>
                <td className="mx-auto text-center">&#36;320</td>
                <td className="text-center align-middle">1</td>
                <td className="mx-auto text-center">&#36;320</td>
              </tr>

              <tr className="h-[100px]">
                <td className="align-middle">
                  <div className="flex">
                    <img
                      className="w-[90px]"
                      src="/images/matrass.png"
                      alt="Matrass Image"
                    />
                    <div className="ml-3 flex flex-col justify-center">
                      <p className="text-xl font-bold">
                        MATRASS COMFORT &plus;
                      </p>
                      <p className="text-sm text-gray-400">Size: XL</p>
                    </div>
                  </div>
                </td>
                <td className="mx-auto text-center">&#36;320</td>
                <td className="text-center align-middle">1</td>
                <td className="mx-auto text-center">&#36;320</td>
              </tr>
            </tbody>
          </table>
          {/* Products Listing End */}

          {/* Summary Start */}
          <section className="my-5 flex w-full flex-col gap-4 lg:flex-row">
            <OrderSummary />

            {/* Address Info Start */}
            <div className="lg:w-1/2">
              <div className="border py-5 px-4 shadow-md">
                <p className="font-bold">ORDER INFORMATION</p>

                <div>
                  <p>Order &num;1245</p>
                </div>

                <div className="flex flex-col border-b py-5">
                  <p>
                    Status:
                    <span className="font-bold text-green-600">Delivered</span>
                  </p>

                  <p>Date: 20/12/2023</p>
                </div>

                <div></div>

                <div className="flex flex-col border-b py-5">
                  <p className="font-bold">ADDRESS INFORMATION</p>
                  <p>Country: Serbia</p>
                  <p>City: Belgrade</p>
                  <p>Zip-Code: 125647</p>
                  <p>Delivery: UPS</p>
                </div>

                <div className="flex flex-col py-5">
                  <p className="font-bold">PAYMENT INFORMATION</p>
                  <p>Payment method: Credit Card</p>
                  <p>Card Holder: Sarah Johnson</p>
                  <p>Card number: &bull;&bull;&bull;&bull; 4214</p>
                </div>
              </div>
            </div>
            {/* Address Info End */}
          </section>
          {/* Summary End */}
        </section>
        {/* Product Table End */}
      </section>
      {/* Order Overview Content End */}
    </>
  );
}
