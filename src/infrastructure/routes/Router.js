import React, { useState }  from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import MainLayout from "../../application/layout/MainLayout";
import { useAuth } from "../../context/authContext";
import Routes from "./routes";


const Router = () => {

  const [showMenu, setShowMenu] = useState(window.matchMedia("(min-width: 640px)").matches)

  const {user} = useAuth();

  const toggleMenu = () => {
    if(showMenu)
      setShowMenu(false);
    else
      setShowMenu(true);
  }

  const menuState = {
    showMenu,
    toggleMenu
  }

  return (
      <BrowserRouter>
        <Switch>
            <MainLayout>
              {
              // eslint-disable-next-line array-callback-return
              Routes.map((route, index) => {
                if(route.children && (route.type === 'public' || user != null)){
                  return (
                  <Route
                    exact
                    path={route.path}
                    component={() => <route.component menu={menuState} children={<route.children />}/>}
                    key={index}
                  />
                );
                }
                if(route.type === 'public' || user != null){
                  return (
                    <Route
                      exact
                      path={route.path}
                      component={() => <route.component/>}
                      key={index}
                    />
                  )
                }
              })}
            </MainLayout>
        </Switch>
      </BrowserRouter>
  );
};

export default Router;
