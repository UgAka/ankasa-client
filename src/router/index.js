import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SearchFlight from "../pages/SearchFlight";
import TicketDetail from "../pages/TicketDetail";
import BookingDetail from "../pages/BookingDetail";
import ForgotPassword from "../pages/ForgotPassword";
import Landing from "../pages/Landing";
import Profile from "../pages/Profile";
import MyBooking from "../pages/MyBooking";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import Register from "../pages/Register";
import Reset from "../pages/Reset";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");

  if (token) {
    return children;
  }
  return <Navigate to="/login" />;
}

function PublicRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return children;
  }
  return <Navigate to="/" />;
}

export default function router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/search" element={<SearchFlight />} />
        <Route
          path={"/ticket-detail/:id"}
          element={
            <PrivateRoute>
              <TicketDetail />
            </PrivateRoute>
          }
        />
        <Route path="/">
          <Route index element={<Landing />} />
        </Route>
        <Route path="/profile">
          <Route
            index
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
        </Route>
        <Route path="/mybooking">
          <Route
            index
            element={
              <PrivateRoute>
                <MyBooking />
              </PrivateRoute>
            }
          />
        </Route>
        <Route path="*" element={<NotFound />} />
        <Route
          path="/detail/:id"
          element={
            <PrivateRoute>
              <BookingDetail />
            </PrivateRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/reset"
          element={
            <PublicRoute>
              <Reset />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/auth/reset/:token"
          element={
            <PublicRoute>
              <ForgotPassword />
            </PublicRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
