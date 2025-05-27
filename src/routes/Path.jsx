/* eslint-disable react/prop-types */
import { IconHome, IconLogin } from "@tabler/icons-react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../components/Login";
import Cookies from "js-cookie";
import { Layout } from "../components/ui/Layout";
import OrderManage from "../components/OrderManage";
import LandingManage from "../components/LandingManage";
import ProductManage from "../components/ProductManage";

const isAuthenticated = () => {
  return !!Cookies.get("auth-admin-token");
};

const ProtectedRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/login" replace />;
};

const PublicRoute = ({ element }) => {
  return !isAuthenticated() ? element : <Navigate to="/dashboard" replace />;
};

const Path = () => {
  const privateRoutes = [
    // {
    //   path: "/dashboard",
    //   element: <Dashboard />,
    //   icon: <IconHome />,
    // },
    {
      path: "/dashboard/landing-manage",
      element: <LandingManage />,
      icon: <IconHome />,
    },
    {
      path: "/dashboard/order-manage",
      element: <OrderManage />,
      icon: <IconHome />,
    },
    {
      path: "/dashboard/product-manage",
      element: <ProductManage />,
      icon: <IconHome />,
    },
  ];

  const publicRoutes = {
    path: "/login",
    element: <Login />,
    icon: <IconLogin />,
  };

  return (
    <Routes>
      {/* Redirect root to the appropriate route based on authentication status */}
      <Route
        path="/"
        element={
          isAuthenticated() ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* Public Route - Only accessible if not authenticated */}
      <Route
        path={publicRoutes.path}
        element={<PublicRoute element={publicRoutes.element} />}
      />

      {/* Private Routes - Only accessible if authenticated */}
      {privateRoutes.map((rt) => (
        <Route
          key={rt.path}
          path={rt.path}
          element={
            <Layout>
              <ProtectedRoute element={rt.element} />
            </Layout>
          }
        />
      ))}

      {/* Fallback Route: Redirect any unknown route to the appropriate page */}
      <Route
        path="*"
        element={
          isAuthenticated() ? (
            <Navigate to="/dashboard/landing-manage" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
    </Routes>
  );
};

export default Path;
