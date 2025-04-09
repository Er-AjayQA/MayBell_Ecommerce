import { HiOutlineSlash } from "react-icons/hi2";
import { Link } from "react-router-dom";

export const BreadCrumb = ({ title, subtitle }) => {
  return (
    <>
      <div className="basis-2/4">
        <h1>{title}</h1>
        <div>
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-1 rtl:space-x-reverse">
              <li className="inline-flex items-center">
                <Link
                  to="#"
                  className="inline-flex items-center text-sm text-[#76838f] hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
                >
                  Dashboard
                </Link>
              </li>
              <HiOutlineSlash className="text-[#76838f]" />
              <li>
                <div className="flex items-center text-sm text-[#76838f]">
                  {subtitle}
                </div>
              </li>
            </ol>
          </nav>
        </div>
      </div>
    </>
  );
};
