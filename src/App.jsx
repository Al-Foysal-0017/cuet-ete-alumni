import React from "react";
import NavAndSidebar from "./components/navbar/NavAndSidebar";
import { Route, Routes, useLocation } from "react-router-dom";
import "./_app.scss";
import Home from "./pages/home";
import SignUp from "./pages/signup";
import SignIn from "./pages/signin";
import Contact from "./pages/contact";
import Stories from "./pages/stories";
import About from "./pages/about";
import OurMission from "./pages/ourMission";
import Community from "./pages/community";
import Events from "./pages/events";
import ScrollToTop from "./components/scrollToTop";
import ScrollToTopBtn from "./components/scrollToTopBtn";
import Profile from "./pages/profile";
import Admin from "./pages-admin/dashboard";
import AllRequestsAdmin from "./pages-admin/allRequests";
import ProtectedRoute from "./components/private/ProtectedRoute";
import PublicRoute from "./components/private/PublicRoute";
import AdminRoute from "./components/private/AdminRoute";
import { positions, transitions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import AllEventsAdmin from "./pages-admin/allEvents";
import ApprovalMsg from "./components/approvalMsg";
import OtpVerify from "./pages/signup/OtpVerify";
import OtpPassword from "./pages/signup/SetOtpPassword";
import UpdateProfile from "./pages/profileUpdate";
import SetProfile from "./pages/signup/SetProfile";
import ToSetProfileRoute from "./components/private/ToSetProfile";
import UserDetailsAdmin from "./pages-admin/userDetails";
import UserDetails from "./pages/userDetails";
import CreateStory from "./pages/createStory";
import StoryDetails from "./pages/storyDetails";
import Alumni from "./pages/alumni";
import Engage from "./pages/engage";
import Gallary from "./pages/gallary";
import CommunityDetails from "./pages/communityDetrails";
import CreateEvent from "./pages-admin/createEvent";
import AllUser from "./pages-admin/allUser";
import EventDetails from "./pages/eventDetails";
import AdminEventDetails from "./pages-admin/eventDetails";
import Messages from "./pages/messages";
import TermsUse from "./pages/termsUse";
import Privacy from "./pages/privacy";

const options = {
  timeout: 5000,
  position: positions.TOP_RIGHT,
  transition: transitions.SCALE,
};

const App = () => {
  const { pathname } = useLocation();
  return (
    <div>
      <AlertProvider template={AlertTemplate} {...options}>
        <>
          {pathname !== "/set/profile" && <ApprovalMsg />}
          <ScrollToTop />
          <ScrollToTopBtn />
          {pathname !== "/admin/dashboard" &&
            pathname !== "/admin/all/users" &&
            pathname !== "/admin/create/event" &&
            pathname !== "/admin/all-events" &&
            pathname !== "/admin/all-requests" && <NavAndSidebar />}
          <Routes>
            <Route index element={<Home />} />
            <Route
              path="sign-up"
              element={
                <PublicRoute>
                  <SignUp />
                </PublicRoute>
              }
            />
            <Route
              path="sign-in"
              element={
                <PublicRoute>
                  <SignIn />
                </PublicRoute>
              }
            />
            <Route path="signup/set/otp/password" element={<OtpPassword />} />
            <Route
              path="signup/otp/verify"
              element={
                <ToSetProfileRoute>
                  <OtpVerify />
                </ToSetProfileRoute>
              }
            />
            <Route path="contact" element={<Contact />} />
            <Route path="stories" element={<Stories />} />
            <Route path="story/details/:id" element={<StoryDetails />} />
            <Route path="about" element={<About />} />
            <Route path="our-mission" element={<OurMission />} />
            <Route path="engage" element={<Engage />} />
            <Route path="gallary" element={<Gallary />} />
            <Route path="community" element={<Community />} />
            <Route path="community/details" element={<CommunityDetails />} />
            <Route path="events" element={<Events />} />
            <Route path="event/details/:id" element={<EventDetails />} />
            <Route path="alumni" element={<Alumni />} />
            <Route path="privacy" element={<Privacy />} />
            <Route path="terms/use" element={<TermsUse />} />
            <Route
              path="profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="profile/update"
              element={
                <ProtectedRoute>
                  <UpdateProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="messages"
              element={
                <ProtectedRoute>
                  <Messages />
                </ProtectedRoute>
              }
            />
            <Route
              path="set/profile"
              element={
                <ProtectedRoute>
                  <SetProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="create/story"
              element={
                <ProtectedRoute>
                  <CreateStory />
                </ProtectedRoute>
              }
            />
            <Route
              path="admin/dashboard"
              element={
                <AdminRoute>
                  <Admin />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/user/details/:id"
              element={
                <AdminRoute>
                  <UserDetailsAdmin />
                </AdminRoute>
              }
            />
            <Route path="/user/details/:id" element={<UserDetails />} />
            <Route
              path="admin/all-requests"
              element={
                <AdminRoute>
                  <AllRequestsAdmin />
                </AdminRoute>
              }
            />
            <Route
              path="admin/create/event"
              element={
                <AdminRoute>
                  <CreateEvent />
                </AdminRoute>
              }
            />
            <Route
              path="admin/all/users"
              element={
                <AdminRoute>
                  <AllUser />
                </AdminRoute>
              }
            />
            <Route
              path="admin/all-events"
              element={
                <AdminRoute>
                  <AllEventsAdmin />
                </AdminRoute>
              }
            />
            <Route
              path="admin/event/details/:id"
              element={
                <AdminRoute>
                  <AdminEventDetails />
                </AdminRoute>
              }
            />
          </Routes>
        </>
      </AlertProvider>
    </div>
  );
};

export default App;
