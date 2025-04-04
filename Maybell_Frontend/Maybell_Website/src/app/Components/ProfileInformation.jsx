import Breadcrumb from "./BreadCrumb";
import ProfileSidebar from "./ProfileSidebar";

export default function ProfileInformation() {
  return (
    <>
      {/* Profile Information Breadcrumb Start */}
      <Breadcrumb page={"Profile Information"} />
      {/* Profile Information Breadcrumb End */}

      {/* Profile Information Content Start */}
      <section className="container flex-grow mx-auto max-w-[1200px] border-b py-5 lg:flex lg:flex-row lg:py-10">
        {/* Profile Information Sidebar Start */}
        <ProfileSidebar />
        {/* Profile Information Sidebar End */}

        {/* Profile Information Form Start */}
        <section className="grid w-full max-w-[1200px] grid-cols-1 gap-3 px-5 pb-10">
          <div className="py-5">
            <div className="w-full">
              <h2>Avatar image</h2>
              <div className="mx-auto mb-5 flex flex-row items-center bg-neutral-100 py-5 lg:mx-0 lg:w-1/2">
                <img
                  className="ml-5 h-20 w-20 rounded-full"
                  src="/images/avatar-photo.png"
                  alt="Sarah Johnson image"
                />

                <form>
                  <div>
                    <label className="block">
                      <span className="sr-only">Choose profile photo</span>
                      <input
                        type="file"
                        className="mx-auto ml-5 flex w-full justify-center border-yellow-400 text-sm outline-none file:mr-4 file:bg-amber-400 file:py-2 file:px-4 file:text-sm file:font-semibold"
                      />
                    </label>
                  </div>
                </form>
              </div>
            </div>

            <form className="flex w-full flex-col gap-3" action="">
              <div className="flex w-full flex-col">
                <label className="flex" htmlFor="name">
                  First Name
                  <span className="block text-sm font-medium text-slate-700 after:ml-0.5 after:text-red-500 after:content-['*']"></span>
                </label>
                <input
                  className="w-full border px-4 py-2 lg:w-1/2"
                  type="text"
                  placeholder="Sarah"
                />
              </div>

              <div className="flex w-full flex-col">
                <label className="flex" htmlFor="name">
                  Last Name
                  <span className="block text-sm font-medium text-slate-700 after:ml-0.5 after:text-red-500 after:content-['*']"></span>
                </label>
                <input
                  className="w-full border px-4 py-2 lg:w-1/2"
                  type="text"
                  placeholder="Johnson"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="">Bio</label>
                <textarea
                  className="w-full border px-4 py-2 text-gray-500 outline-none lg:w-1/2"
                  name=""
                  id=""
                  cols="30"
                  rows="10"
                >
                  CEO, MayBell Inc.
                </textarea>

                <button className="mt-4 w-40 bg-violet-900 px-4 py-2 text-white">
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </section>
        {/* Profile Information Form End */}
      </section>
      {/* Profile Information Content End */}
    </>
  );
}
