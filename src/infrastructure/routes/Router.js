import React, { useState }  from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import MainLayout from "../../application/layout/MainLayout";
import Routes from "./routes";

const Router = () => {

  const [showMenu, setShowMenu] = useState(window.matchMedia("(min-width: 640px)").matches)

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
            {Routes.map((route, index) => {
              return (
                <Route
                  exact
                  path={route.path}
                  component={() => <route.component menu={menuState} children={<route.children />}/>}
                  key={index}
                />
              );
            })}
          </MainLayout>
        </Switch>
      </BrowserRouter>
  );
};

export default Router;
