import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout } from "./layouts";

import Login from "./views/sign/login";
import Check from "./views/sign/check";
import Menu from "./views/store/Menu";
import Store from "./views/store/Store";
import StoreLogin from "./views/store/StoreLogin";
import OrderStore from "./views/order/OrderStore";
import OrderMenu from "./views/order/OrderMenu";
import Order from "./views/order/Order";
import OrderList from "./views/order/OrderList";
import Main from "./views/main/Main"
import StoreApprove from "./views/store/StoreApprove";
import Map from "./views/Map";

export default [
  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    component: () => <Redirect to="/main" />,
  },
  {
    path: "/login",
    layout: DefaultLayout,
    component: Login,
  },
  {
    path: "/check",
    layout: DefaultLayout,
    component: Check,
  },
  {
    path: "/menu",
    layout: DefaultLayout,
    component: Menu,
  },
  {
    path: "/store",
    layout: DefaultLayout,
    component: Store,
  },
  {
    path: "/storelogin",
    layout: DefaultLayout,
    component: StoreLogin,
  },
  {
    path: "/orderstore",
    layout: DefaultLayout,
    component: OrderStore,
  },
  {
    path: "/ordermenu",
    layout: DefaultLayout,
    component: OrderMenu,
  },
  {
    path: "/order",
    layout: DefaultLayout,
    component: Order,
  },
  {
    path: "/orderlist",
    layout: DefaultLayout,
    component: OrderList,
  },
  {
    path: "/main",
    layout: DefaultLayout,
    component: Main,
  },
  {
    path: "/approve",
    layout: DefaultLayout,
    component: StoreApprove
  },
  {
    path: "/map",
    layout: DefaultLayout,
    component: Map
  },
];
