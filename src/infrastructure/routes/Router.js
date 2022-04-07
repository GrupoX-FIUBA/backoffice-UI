import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import MainLayout from "../../application/layout/MainLayout";
import Routes from "./routes";

const Router = () => {

  return (
      <BrowserRouter>
        <Switch>
          <MainLayout>
            {Routes.map((route, index) => {
              return (
                <Route
                  exact
                  path={route.path}
                  component={route.component}
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
