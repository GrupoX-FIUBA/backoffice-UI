import React from "react";
import NavBar from "../../components/Common/NavBar";
import SideMenu from "../../components/Common/SideMenu";

export default function PrivatePage({children, menu}) {

  return (
  <div className="bg-spotiblue h-full bg-spotifyblue" style={{'backgroundSize': '100% 100%',
  'backgroundPosition': '46% 4%', }}>
    <NavBar handlerMenu={menu.toggleMenu}/>
    <SideMenu showMenu={menu.showMenu}/>    
    <div className={`w-full inline-block float-right transition-all ease-in-out duration-100 p-10 bg-edrans-dark pt-20 pt md:pt-20 px-4 text-white overflow-y-auto no-scrollbar ${menu.showMenu ? "md:width-sidebar-show" : "md:width-min-sidebar-show"}`}>            
        {children}
    </div>
  </div>);
};