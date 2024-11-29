import React, { useRef, useEffect } from "react";
import "./header.css";
import { Container, Row } from "reactstrap";
import logo from "../../assets/images/eco-logo.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import UseAuth from "../../custom-hooks/useAuth";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase.config";
import { toast } from "react-toastify";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, query } from "firebase/firestore";
import { db } from "../../firebase.config";
import UseGetData from "../../custom-hooks/useGetData";
const Header = () => {
  const { currentUser } = UseAuth();
  const [value, loading, error] = useCollection(
    query(collection(db, `cart ${currentUser?.uid}`))
  );

  const logout = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logged Out");
        navigate("/");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const nav__link = [
    {
      path: "/",
      display: "Home",
    },
    {
      path: "shop",
      display: "Shop",
    },
    {
      path: "cart",
      display: "Cart",
    },
  ];

  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const stickyHeaderFunc = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("sticky__header");
      } else {
        headerRef.current.classList.remove("sticky__header");
      }
    });
  };

  useEffect(() => {
    stickyHeaderFunc();
    return () => window.removeEventListener("scroll", stickyHeaderFunc);
  });

  const menuToggle = () => menuRef.current.classList.toggle("active__menu");

 

  
    return (
      <div className="header" ref={headerRef}>
        <Container>
          <Row>
            <div className="nav__wrapper">
              <div className="logo">
                <img src={logo} alt="logo" />
                <div>
                  <h1>Multimart</h1>
                </div>
              </div>

              <div className="navigation" ref={menuRef} onClick={menuToggle}>
                <ul className="menu">
                  {nav__link.map((item, index) => (
                    <li className="nav__item" key={index}>
                      <NavLink
                        to={item.path}
                        className={(navClass) =>
                          navClass.isActive ? "nav__active" : ""
                        }
                      >
                        {item.display}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="nav__icons">
                <span className="fav__icon">
                  <i className="ri-heart-line"></i>
                  <span className="badge">0</span>
                </span>
                <span className="cart__icon" onClick={() => navigate("/cart")}>
                  <i className="ri-shopping-bag-line"></i>
                  <span className="badge">{value  ? value.docs.length : 0}</span>
                </span>
                <div className="profile">
                  {currentUser ? (
                    <>
                      <span className="mx-3">
                        <img src={currentUser.photoURL} alt="user image" />
                      </span>
                      <motion.span
                        whileTap={{ scale: 1.1 }}
                        className="hover"
                        onClick={logout}
                      >
                        Logout
                      </motion.span>
                    </>
                  ) : (
                    <>
                      <motion.span
                        whileTap={{ scale: 1.1 }}
                        className="mx-3 hover"
                      >
                        <Link to="/signup">Signup</Link>
                      </motion.span>
                      <motion.span whileTap={{ scale: 1.1 }} className="hover">
                        <Link to="/login">Login</Link>
                      </motion.span>
                      {/* 
                      <motion.span whileTap={{ scale: 1.1 }} className="hover">
                        <Link to="/dashboard">Dashboard</Link>
                      </motion.span>
                      */}
                    </>
                  )}
                </div>
                <div className="mobile__menu">
                  <span onClick={menuToggle}>
                    <i className="ri-menu-line"></i>
                  </span>
                </div>
              </div>
            </div>
          </Row>
        </Container>
      </div>
    );
};

export default Header;
