export const LoginPage = () => {
  const handleLoginForm = (event) => {
    event.preventDefault();

    const loginData = {
      email: event.target.email.value,
      password: event.target.password.value,
      remember: event.target.remember.checked,
    };

    event.target.reset();
    console.log(loginData);
  };

  return (
    <>
      <section className="w-full login_page">
        <div className="container mx-auto px-3">
          <div className="login_content p-[50px]">
            {/* Login Page Sidebar Start */}
            <div className="login_sidebar w-[max-content] mt-[200px] mx-[50px]">
              <div className="brand">
                <div>
                  <img
                    src="/Images/company-logo.svg"
                    alt="Login Page Logo"
                    className="w-[100px]"
                  />
                </div>
                <h2 className="m-0 mt-2 text-[36px] uppercase font-medium text-[#fff]">
                  Furniture
                </h2>
              </div>
              <p className="font-medium text-[25px] text-[#fff]">
                Explore The Fashion
              </p>
              <p className="text-[18px] text-[#fff]">
                Explore the latest fashion trends, shop accessories, and more.
              </p>
            </div>
            {/* Login Page Sidebar End */}

            {/* Login Page Form Start */}
            <div className="login_form p-[60px] py-[150px] absolute end-0 top-0 min-h-[100%] bg-[#fff] text-[#76838f]">
              <h2 className="text-[28px] text-gray-600">Login</h2>
              <p className="text-[13px] font-medium">
                Please enter your details to Login.
              </p>
              {/* Login Form Start */}
              <form
                className="w-[350px] mx-auto mt-[40px]"
                onSubmit={handleLoginForm}
              >
                <div className="mb-5">
                  <input
                    type="email"
                    id="email"
                    className="bg-green-50 border border-green-500 text-gray-900 text-sm rounded-[3px] focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-green-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                    placeholder="Email"
                    required
                  />
                </div>
                <div className="mb-5">
                  <input
                    type="password"
                    id="password"
                    className="bg-green-50 border border-green-500 text-gray-900 text-sm rounded-[3px] focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-green-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                    placeholder="Password"
                    required
                  />
                </div>
                <div className="flex items-start mb-5">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      type="checkbox"
                      name="remember"
                      className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                    />
                  </div>
                  <label
                    htmlFor="remember"
                    className="ms-2 text-sm font-medium  text-[#76838f]"
                  >
                    Remember me
                  </label>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-[#3e8ef7] hover:bg-[#589ffc] focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-[3px] text-sm px-5 py-2.5 text-center dark:bg-[#3e8ef7]-600 dark:hover:bg-blue-700 dark:focus:ring-[#247cf0] active:bg-[#247cf0]"
                >
                  Login
                </button>
              </form>
              {/* Login Form End */}
            </div>
            {/* Login Page Form End */}
          </div>
        </div>
      </section>
    </>
  );
};
