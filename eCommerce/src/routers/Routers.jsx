import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Lottie from "lottie-react";
import Error404 from "../assets/lottiefiles/not-found.json";
import loading from "../assets/lottiefiles/loading.json";
import Home from "../pages/Home";
import Shop from "../pages/Shop";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import ProductDetails from "../pages/ProductDetails";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ProtectedRoute from "./ProtectedRoute";
import AddProducts from "../admin/AddProducts";
import AllProducts from "../admin/AllProducts";
import Dashboard from "../admin/Dashboard";
const Layout = lazy(() => import("../components/Layout/Layout"));
import Users from "../admin/Users";
import Orders from "../admin/Orders";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense
        fallback={
          <div
            className="d-flex justify-content-center align-items-center "
          >
            <Lottie
              animationData={loading}
              style={{ width: "400px", marginTop: "100px" }}
            />
          </div>
        }
      >
        <Layout />
      </Suspense>
    ),
    errorElement: (
      <Lottie
        animationData={Error404}
        style={{ width: "500px", margin: "120px auto" }}
      />
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "shop",
        element: <Shop />,
      },
      {
        path: "shop/:id",
        element: <ProductDetails />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "checkout",
        element: (
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        ),
      },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "dashboard/all-products",
        element: (
          <ProtectedRoute>
            <AllProducts />
          </ProtectedRoute>
        ),
      },
      {
        path: "dashboard/add-products",
        element: (
          <ProtectedRoute>
            <AddProducts />
          </ProtectedRoute>
        ),
      },
      {
        path: "dashboard/users",
        element: (
          <ProtectedRoute>
            <Users />
          </ProtectedRoute>
        ),
      },
      {
        path: "dashboard/orders",
        element: (
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        ),
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
    ],
  },
]);
const Routers = () => {
  return <RouterProvider router={router} />;
};

export default Routers;
