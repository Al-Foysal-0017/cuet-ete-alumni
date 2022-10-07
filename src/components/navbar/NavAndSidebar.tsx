import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Squash as Hamburger } from "hamburger-react";
import "./NavAndSidebar.css";
import { navRoutes } from "./NavLinks";
import Container from "../container/Container";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";
import { RiMessage3Fill } from "react-icons/ri";

const MobileNav = () => {
  const { pathname } = useLocation();
  const { user } = useSelector((state: any) => state.user);
  const [openSidebar, setOpenSidebar] = useState<boolean>(false);

  return (
    <Container className="navbarAndSidebar">
      {/* Navbar Top */}
      <div className="navbarTop">
        {user ? (
          <div className="navbarTopItem">
            {user.role === "admin" && (
              <>
                <Link
                  style={{
                    fontWeight: "600",
                    display: "flex",
                    alignItems: "center",
                  }}
                  to="/admin/dashboard"
                >
                  Admin Panel
                  <img
                    className="navbarTopItem-avatar"
                    src={user?.avatar?.url}
                    alt=""
                  />
                </Link>
              </>
            )}
            {user.role !== "admin" && (
              <>
                <Link
                  style={{
                    fontWeight: "600",
                    display: "flex",
                    alignItems: "center",
                  }}
                  to="/profile"
                >
                  {user?.firstName + " " + user?.lastName}
                  <img
                    className="navbarTopItem-avatar"
                    src={user?.avatar?.url}
                    alt=""
                  />
                </Link>
                {user?.role === "alumni" && (
                  <Link
                    to="/messages"
                    style={{
                      borderRadius: "50%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      paddingBottom: "0",
                      marginLeft: "1rem",
                      width: "34px",
                      height: "34px",
                    }}
                  >
                    <RiMessage3Fill color="#05BE71" size={32} />
                  </Link>
                )}
              </>
            )}
          </div>
        ) : (
          <div className="navbarTopItem">
            <Link
              style={{
                fontWeight: "600",
                color: pathname === "/sign-in" ? "#05BE71" : "#000",
              }}
              to="/sign-in"
            >
              Sign in
            </Link>
            <span style={{ padding: "0 8px", fontWeight: "bold" }}>/</span>
            <Link
              style={{
                fontWeight: "600",
                color: pathname === "/sign-up" ? "#05BE71" : "#000",
              }}
              to="/sign-up"
            >
              Sign up
            </Link>
          </div>
        )}
      </div>
      {/* NAVBAR PART */}
      <nav className="navbarContainer">
        <div className="navbarContainerWrapper">
          {/* LEFT NAVBAR */}
          <div className="navbarContainerLeft">
            <div className="navbarContainerHamburger">
              <Hamburger
                toggle={setOpenSidebar}
                toggled={openSidebar}
                color="#000"
              />
            </div>
            <div className="navbarContainerLogo">
              <Link to="/" className="">
                <span style={{ color: "#05BE71" }}>ETE</span>{" "}
                <span style={{ color: "#bababa" }}>|</span>{" "}
                <span className="">ALUMNI</span>
              </Link>
            </div>
          </div>
          {/* RIGHT NAVBAR */}
          <div className="navbarContainerRightItems">
            {navRoutes.map((item) => (
              <div key={item.name} className="navbarContainerRightItem">
                <Link
                  className={
                    pathname === item.route ? "link activeNavLink" : "link"
                  }
                  to={item.route}
                >
                  {item.name}
                </Link>
              </div>
            ))}
            <div className="">
              <Link
                className={
                  pathname === "/contact"
                    ? "rightMostNavLink activeNavLink"
                    : "rightMostNavLink"
                }
                to="/contact"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>
      {/* SIDEBAR PART */}
      <div className={openSidebar ? "SidebarBackground" : ""}>
        <div
          className={`
                ${
                  openSidebar ? "translateForSidebar" : "translateForSidebarNeg"
                }
                setSidebarForToggle transform transition-all duration-300`}
        >
          <Sidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
        </div>
      </div>
    </Container>
  );
};

export default MobileNav;
