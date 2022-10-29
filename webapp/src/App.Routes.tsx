import React from "react";
import Home from "./ui/pages/Home/Home";
import Create from "./ui/pages/Create/Create";

export enum RouteKey {
  Home = "/",
  Create = "/create"
}
// list of all the routes of the App
export const routes = [ {
  key: RouteKey.Home,
  protected: false,
  path: RouteKey.Home,
  component: <Home/>,
}, {
  key: RouteKey.Create,
  protected: false,
  path: RouteKey.Create,
  component: <Create />,
}]
