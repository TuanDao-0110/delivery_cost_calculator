import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import logo from '../assets/Wolt-Logo.png'
const Template = () => {
  return (
    <div>
      <nav className="bg-white shadow-lg">
        <div className="md:flex items-center justify-between py-2 px-8 md:px-12">
          <div className="flex justify-between items-center">
            <div className=" md:text-3xl flex justify-center items-center gap-5">
              <Link to={"/"}>
                <img src={logo} width={80} height={80} alt="" />
              </Link>
              <Link to={"/"}>{/* <img src={solitaLogo} width={80} height={80} alt="" /> */}</Link>
            </div>
            <div className="md:hidden">
              <button type="button" className="block text-gray-800 hover:text-gray-700 focus:text-gray-700 focus:outline-none">
                <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                  <path
                    className="hidden"
                    d="M16.24 14.83a1 1 0 0 1-1.41 1.41L12 13.41l-2.83 2.83a1 1 0 0 1-1.41-1.41L10.59 12 7.76 9.17a1 1 0 0 1 1.41-1.41L12 10.59l2.83-2.83a1 1 0 0 1 1.41 1.41L13.41 12l2.83 2.83z"
                  />
                  <path d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" />
                </svg>
              </button>
            </div>
          </div>
          <div className="flex flex-col md:flex-row hidden md:block -mx-2 justify-center items-center">
            <NavLink to={"/"}>
              <button className="ml-3 inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white">Calculate</button>
            </NavLink>
            <NavLink to={"venuelist"}>
              <button className="ml-3 inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white">list</button>
            </NavLink>
          </div>
        </div>
      </nav>
      {/* <div></div> */}
      <Outlet />
    </div>
  );
};

export default Template;
