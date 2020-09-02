import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout } from "./layouts";

// Route Views
import BlogOverview from "./views/BlogOverview";
import UserProfileLite from "./views/UserProfileLite";
import AddNewPost from "./views/AddNewPost";
import Errors from "./views/Errors";
import ComponentsOverview from "./views/ComponentsOverview";
import Tables from "./views/Tables";
import BlogPosts from "./views/BlogPosts";
//여기부터 우리가 추가한 거
import KAS from "./views/KAS"
import Login from "./views/sign/login"
import Check from "./views/sign/check"
import Menu from "./views/Menu";
import Store from "./views/Store";
import Transfer from "./views/Transfer";
import Coffee from "./views/coffee";
import myStore from "./views/myStore";
import myCoupon from "./views/myCoupon";

export default [
  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    component: () => <Redirect to="/blog-overview" />
  },
  {
    path: "/blog-overview",
    layout: DefaultLayout,
    component: BlogOverview
  },
  {
    path: "/user-profile-lite",
    layout: DefaultLayout,
    component: UserProfileLite
  },
  {
    path: "/add-new-post",
    layout: DefaultLayout,
    component: AddNewPost
  },
  {
    path: "/errors",
    layout: DefaultLayout,
    component: Errors
  },
  {
    path: "/components-overview",
    layout: DefaultLayout,
    component: ComponentsOverview
  },
  {
    path: "/tables",
    layout: DefaultLayout,
    component: Tables
  },
  {
    path: "/blog-posts",
    layout: DefaultLayout,
    component: BlogPosts
  },
  {
    path: "/KAS",
    layout: DefaultLayout,
    component: KAS
  },
  {
    path: "/login",
    layout: DefaultLayout,
    component: Login
  },
  {
    path: "/check",
    layout: DefaultLayout,
    component: Check
  },
  {
    path: "/menu",
    layout: DefaultLayout,
    component: Menu
  },
  {
    path: "/store",
    layout: DefaultLayout,
    component: Store
  },
  {
    path: "/Transfer",
    layout: DefaultLayout,
    component: Transfer
  },
  {
    path: "/coffee",
    layout: DefaultLayout,
    component: Coffee
  },
  {
    path: "/mystore",
    layout: DefaultLayout,
    component: myStore
  },
  {
    path: "/mycoupon",
    layout: DefaultLayout,
    component: myCoupon
  }
];
