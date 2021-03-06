import React, { useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { useAuth } from "../../../context/authContext";
import NavBar from "../../components/Common/NavBar";
import SideMenu from "../../components/Common/SideMenu";
import { verifyIfUserIsAdmin } from "../../repository/users";

export default function PrivatePage({children, menu}) {

  const {user, logout, notAdmin} = useAuth();
  const history = useHistory();

  useEffect(() => {
    const removeIfNotAdmin = async () => {
      if (!(await verifyIfUserIsAdmin(user.accessToken))) {
        notAdmin();
        await logout();
        history.push('/');
      } 
    }
    removeIfNotAdmin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])
  

  return (
  <div className="bg-spoticeleste h-full overflow-y-scroll" style={{'backgroundSize': '100% 100%',
  'backgroundPosition': '46% 4%', }}>
    <NavBar handlerMenu={menu.toggleMenu}/>
    <SideMenu showMenu={menu.showMenu} handlerMenu={menu.toggleMenu}/>    
    <div className={`w-full inline-block float-right transition-all ease-in-out duration-100 p-10 pt-20 md:pt-20 px-4 text-white overflow-y-auto no-scrollbar ${menu.showMenu ? "md:width-sidebar-show" : "md:width-min-sidebar-show"}`}>            
        {children}
    </div>
  </div>);
};