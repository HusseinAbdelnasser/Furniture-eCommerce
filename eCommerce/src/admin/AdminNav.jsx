import React from "react";
import { Container, Row } from "reactstrap";
import UseAuth from "../custom-hooks/useAuth";
import "../styles/admin-nav.css";
import { NavLink } from "react-router-dom";
import Lottie from "lottie-react";
import error from "../assets/lottiefiles/not-found.json";
import { Link } from "react-router-dom";

const admin__nav = [
  {
    display: "Dashboard",
    path: "/dashboard",
  },
  {
    display: "All-Products",
    path: "/dashboard/all-products",
  },
  {
    display: "Orders",
    path: "/dashboard/orders",
  },
  {
    display: "Users",
    path: "/dashboard/users",
  },
];
const AdminNav = () => {
  const { currentUser } = UseAuth();

  if (currentUser?.email === "husseinkhaled9847@gmail.com") {
    return (
      <>
        <header className="admin__header">
          <div className="admin__nav-top">
            <Container>
              <div className="admin__nav-wrapper-top">
                <div className="logo">
                  <Link to='/'>Multimart</Link>
                </div>

                <div className="search__box">
                  <input type="text" placeholder="Search...." />
                  <span>
                    <i className="ri-search-line"></i>
                  </span>
                </div>

                <div className="admin__nav-top-right">
                  <span>
                    <i className="ri-notification-3-line"></i>
                  </span>
                  <span>
                    <i className="ri-settings-2-line"></i>
                  </span>
                  <span>
                    <img src={currentUser.photoURL} alt="user image" />
                  </span>
                </div>
              </div>
            </Container>
          </div>
        </header>

        <section className="admin__menu p-0">
          <Container>
            <Row>
              <div className="admin__navigation">
                <ul className="admin__menu-list">
                  {admin__nav.map((item, index) => (
                    <li className="admin__menu-item" key={index}>
                      <NavLink
                        to={item.path}
                        className={(navClass) =>
                          navClass.isActive ? "active__admin-menu" : ""
                        }
                      >
                        {item.display}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            </Row>
          </Container>
        </section>
      </>
    );
  } else {
    return (
      <div className="d-flex justify-content-center align-items-center ">
        <Lottie
          animationData={error}
          style={{ width: "400px", marginTop: "100px" }}
        />
      </div>
    );
  }
};

export default AdminNav;
