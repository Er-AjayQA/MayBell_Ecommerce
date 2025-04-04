import Link from "next/link";

export default function Footer() {
  return (
    <>
      {/* Desktop Footer start  */}
      <footer className="mx-auto w-full max-w-[1200px] justify-between pb-10 flex flex-col lg:flex-row">
        <div className="ml-5">
          <img
            className="mt-10 mb-5"
            src="/images/company-logo.svg"
            alt="company logo"
          />
          <p className="pl-0">
            Lorem ipsum dolor sit amet consectetur <br />
            adipisicing elit.
          </p>
          <div className="mt-10 flex gap-3">
            <a href="https://github.com/bbulakh">
              <img
                className="h-5 w-5 cursor-pointer"
                src="/images/github.svg"
                alt="github icon"
              />
            </a>
            <a href="https://t.me/b_bulakh">
              <img
                className="h-5 w-5 cursor-pointer"
                src="/images/telegram.svg"
                alt="telegram icon"
              />
            </a>
            <a href="https://www.linkedin.com/in/bogdan-bulakh-393284190/">
              <img
                className="h-5 w-5 cursor-pointer"
                src="/images/linkedin.svg"
                alt="twitter icon"
              />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="mx-5 mt-10">
            <p className="font-medium text-gray-500">FEATURES</p>
            <ul className="text-sm leading-8">
              <li>
                <Link href="/marketing">Marketing</Link>
              </li>
              <li>
                <Link href="/commerce">Commerce</Link>
              </li>
              <li>
                <Link href="/analytic">Analytics</Link>
              </li>
              <li>
                <Link href="/merchandise">Merchandise</Link>
              </li>
            </ul>
          </div>

          <div className="mx-5 mt-10">
            <p className="font-medium text-gray-500">SUPPORT</p>
            <ul className="text-sm leading-8">
              <li>
                <Link href="/pricing">Pricing</Link>
              </li>
              <li>
                <Link href="/docs">Docs</Link>
              </li>
              <li>
                <Link href="/audition">Audition</Link>
              </li>
              <li>
                <Link href="art-status">Art Status</Link>
              </li>
            </ul>
          </div>

          <div className="mx-5 mt-10">
            <p className="font-medium text-gray-500">DOCUMENTS</p>
            <ul className="text-sm leading-8">
              <li>
                <Link href="/terms">Terms</Link>
              </li>
              <li>
                <Link href="/conditions">Conditions</Link>
              </li>
              <li>
                <Link href="/privacy">Privacy</Link>
              </li>
              <li>
                <Link href="/licenses">License</Link>
              </li>
            </ul>
          </div>

          <div className="mx-5 mt-10">
            <p className="font-medium text-gray-500">DELIVERY</p>
            <ul className="text-sm leading-8">
              <li>
                <Link href="/countries-list">List of countries</Link>
              </li>
              <li>
                <Link href="/special-info">Special information</Link>
              </li>
              <li>
                <Link href="/restrictions">Restrictions</Link>
              </li>
              <li>
                <Link href="/payments">Payment</Link>
              </li>
            </ul>
          </div>
        </div>
      </footer>
      {/* Desktop Footer End  */}

      {/* Payment and Copyright Start */}
      <section className="h-11 bg-amber-400">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-4 pt-2">
          <p>&copy; Bogdan Bulakh, 2023</p>
          <div className="flex items-center space-x-3">
            <img
              className="h-8"
              src="https://cdn-icons-png.flaticon.com/512/5968/5968299.png"
              alt="Visa icon"
            />
            <img
              className="h-8"
              src="https://cdn-icons-png.flaticon.com/512/349/349228.png"
              alt="AE icon"
            />
            <img
              className="h-8"
              src="https://cdn-icons-png.flaticon.com/512/5968/5968144.png"
              alt="Apple pay icon"
            />
          </div>
        </div>
      </section>
      {/* Payment and Copyright End */}
    </>
  );
}
