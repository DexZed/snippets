import { Link } from "react-router";

type Props = {};

function Nav({}: Props) {
  const links = (
    <>
      <li>
        <Link to={"/"}>All Books</Link>
      </li>

      <li>
        <Link to={"/create-book"}>Add Book</Link>
      </li>

      <li>
        <Link to={"/borrow-summary"}>Borrow Summary</Link>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <div className="flex">
          <img src="/logo.jpg" alt="logo" className="w-10 rounded-full" />
          <a className="btn btn-ghost text-xl">PirateLib</a>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end"></div>
    </div>
  );
}

export default Nav;
