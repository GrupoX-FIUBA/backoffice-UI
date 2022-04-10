import React from "react";
import Routes from "../../../infrastructure/routes/routes";
import { NavLink } from "react-router-dom";

const showFullMenu = (full = true, toggleMenu) => (
  <>
    {Routes.map((route,index) => {
      if (route.type === "private") 
      return (
        <NavLink key={index} onClick={() => menuSelect(toggleMenu)} exact to={{ pathname: route.path }} className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-900 hover:text-white">
          <i className="pr-2">{route.icon}</i>{full ? route.title : ""}
        </NavLink>
      );
    })}
  </> 
);

const menuSelect = (toggleMenu) => {
  if(!window.matchMedia("(min-width: 640px)").matches){
    toggleMenu();
  }
}

const showFullLogout = (full = true) => {

	return (
		<React.Fragment>
			<ul className="text-white font-bold absolute bottom-0 left-0 w-full">
				<li className="py-4 cursor-pointer text-center">

					<button>
						{full ? "Logout" : ""}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className={`inline-block h-6 w-6 "ml-2"}`}
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
							/>
						</svg>
					</button>
				</li>
			</ul>
		</React.Fragment>
	)
};

const SideMenu = ({ showMenu, handlerMenu }) => {

  const headerIn = `transform ${
    !showMenu ? "-translate-x-full" : ""
  } translate-x-0 transition duration-200 ease-in-out`;
  const headerOut = `transform ${
    showMenu ? "-translate-x-full" : ""
  } translate-x-0 transition duration-200 ease-in-out`;

	return (
    <>
      <div
        className={`text-2xl md:text-base z-10 block sidebar bg-black text-blue-100 w-4/5 md:w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 shadow-white md:shadow-none ${headerIn}`}
      >
        <nav className="pt-32 md:pt-14 shadow-sm">				
          {showFullMenu(true, handlerMenu)}
          {showFullLogout(true)}
        </nav>
      </div>  
      <div
        className={`hidden md:block sidebar bg-black text-blue-100 w-13 space-y-6 py-7 px-2 absolute inset-y-0 left-0 ${headerOut}`}
      >
        <nav className={`pt-14 shadow-sm`}>
          {showFullMenu(false, handlerMenu)}
          {showFullLogout(false)}
        </nav>
      </div>
    </>
  );
};

export default SideMenu;
