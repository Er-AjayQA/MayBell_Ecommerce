import Banner from "./Banner";

export default function AboutUs() {
  return (
    <>
      {/* About Us Banner Section Start */}
      <Banner />
      {/* About Us Banner Section Start */}

      {/* About Us Main Content Start */}
      <section className="flex-grow">
        <div className="mt-6 flex flex-col gap-3">
          <img
            className="mx-auto w-[200px]"
            src="/images/company-logo.svg"
            alt="Maybell Logo"
          />
          <p className="text-center text-sm">Since 1999</p>
        </div>

        <div className="mx-auto my-10 flex max-w-[600px] flex-col items-center justify-center px-5">
          <h2 className="w-full text-left text-xl font-bold">Our Mission:</h2>
          <p className="py-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum
            placeat odit, est eum dolorem esse totam iusto necessitatibus
            eligendi illo doloribus vero aperiam atque tempora repudiandae
            molestiae nemo distinctio quisquam!
          </p>
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
            <img
              className="object-cover"
              src="/images/mission-family.jpg"
              alt="Family in living room"
            />
            <img
              className="object-cover"
              src="/images/mission-interior.jpg"
              alt="Interior"
            />
            <img
              className="object-cover"
              src="/images/mission-materials.jpg"
              alt="Materials"
            />
          </div>
          <p className="py-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum
            placeat odit, est eum dolorem esse totam iusto necessitatibus
            eligendi illo doloribus vero aperiam atque tempora repudiandae
            molestiae nemo distinctio quisquam!
          </p>

          <h2 className="mt-3 w-full text-left text-xl font-bold">
            Our Vision:
          </h2>
          <p className="py-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum
            placeat odit, est eum dolorem esse totam iusto necessitatibus
            eligendi illo doloribus vero aperiam atque tempora repudiandae
            molestiae nemo distinctio quisquam!
          </p>

          <h2 className="mt-3 w-full text-left text-xl font-bold">
            Our Values:
          </h2>
          <p className="py-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum
            placeat odit, est eum dolorem esse totam iusto necessitatibus
            eligendi illo doloribus vero aperiam atque tempora repudiandae
            molestiae nemo distinctio quisquam!
          </p>
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
            <img
              className="object-cover"
              src="/images/mission-family.jpg"
              alt="Family in living room"
            />
            <img
              className="object-cover"
              src="/images/mission-interior.jpg"
              alt="Interior"
            />
            <img
              className="object-cover"
              src="/images/mission-materials.jpg"
              alt="Materials"
            />
          </div>
        </div>
      </section>
      {/* About Us Main Content End */}
    </>
  );
}
