import { Link } from "react-router";

export const Footer = () => {
  return (
    <>
      <section className="p-[20px] flex justify-between">
        <div>
          <p className="text-[14px]">
            <span> © 2025 </span>
            <Link
              to="/furniture/admin-panel"
              className="text-[#3e8ef7] hover:underline"
            >
              Furniture
            </Link>
          </p>
        </div>
        <div>
          <p className="text-[14px]">
            <span> Designed & Development by </span>
            <Link
              to="/furniture/admin-panel"
              className="text-[#3e8ef7] hover:underline"
            >
              Furniture
            </Link>
          </p>
        </div>
      </section>
    </>
  );
};
