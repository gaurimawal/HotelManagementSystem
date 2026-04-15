import { Navigate, useRoutes } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import ProtectedRoute from "./components/common/ProtectedRoute";
import LoginPage from "./pages/common/LoginPage";
import RegisterPage from "./pages/common/RegisterPage";
import ForgotPasswordPage from "./pages/common/ForgotPasswordPage";
import ProfilePage from "./pages/common/ProfilePage";
import NotFoundPage from "./pages/common/NotFoundPage";
import CustomerDashboardPage from "./pages/customer/CustomerDashboardPage";
import RoomListingPage from "./pages/customer/RoomListingPage";
import RoomDetailsPage from "./pages/customer/RoomDetailsPage";
import BookingPage from "./pages/customer/BookingPage";
import BookingHistoryPage from "./pages/customer/BookingHistoryPage";
import StaffDashboardPage from "./pages/staff/StaffDashboardPage";
import RoomStatusManagementPage from "./pages/staff/RoomStatusManagementPage";
import BookingManagementPage from "./pages/staff/BookingManagementPage";
import ServiceRequestsPage from "./pages/staff/ServiceRequestsPage";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import RoomManagementPage from "./pages/admin/RoomManagementPage";
import UserManagementPage from "./pages/admin/UserManagementPage";
import BookingOverviewPage from "./pages/admin/BookingOverviewPage";
import AnalyticsPage from "./pages/admin/AnalyticsPage";

export default function AppRoutes() {
  return useRoutes([
    {
      element: <AuthLayout />,
      children: [
        { path: "/login", element: <LoginPage /> },
        { path: "/register", element: <RegisterPage /> },
        { path: "/forgot-password", element: <ForgotPasswordPage /> }
      ]
    },
    {
      element: <ProtectedRoute />,
      children: [{ element: <DashboardLayout />, children: [{ path: "/profile", element: <ProfilePage /> }] }]
    },
    {
      path: "/customer",
      element: <ProtectedRoute allowedRoles={["customer"]} />,
      children: [
        { element: <DashboardLayout />, children: [
          { index: true, element: <CustomerDashboardPage /> },
          { path: "rooms", element: <RoomListingPage /> },
          { path: "rooms/:roomId", element: <RoomDetailsPage /> },
          { path: "book/:roomId", element: <BookingPage /> },
          { path: "bookings", element: <BookingHistoryPage /> }
        ] }
      ]
    },
    {
      path: "/staff",
      element: <ProtectedRoute allowedRoles={["staff"]} />,
      children: [
        { element: <DashboardLayout />, children: [
          { index: true, element: <StaffDashboardPage /> },
          { path: "rooms", element: <RoomStatusManagementPage /> },
          { path: "bookings", element: <BookingManagementPage /> },
          { path: "requests", element: <ServiceRequestsPage /> }
        ] }
      ]
    },
    {
      path: "/admin",
      element: <ProtectedRoute allowedRoles={["admin"]} />,
      children: [
        { element: <DashboardLayout />, children: [
          { index: true, element: <AdminDashboardPage /> },
          { path: "rooms", element: <RoomManagementPage /> },
          { path: "users", element: <UserManagementPage /> },
          { path: "bookings", element: <BookingOverviewPage /> },
          { path: "analytics", element: <AnalyticsPage /> }
        ] }
      ]
    },
    { path: "/", element: <Navigate to="/login" replace /> },
    { path: "*", element: <NotFoundPage /> }
  ]);
}
