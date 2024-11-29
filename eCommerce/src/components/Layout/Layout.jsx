import React from "react";
import Header from "../Header/header";
import Footer from "../Footer/footer";
import AdminNav from "../../admin/AdminNav";
import { Outlet, useLocation } from "react-router-dom";
const Layout = () => {
  const location = useLocation();
  return (
    <>
      {location.pathname.startsWith("/dashboard") ? <AdminNav /> : <Header />}
      <div>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
