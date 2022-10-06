import React from "react";
import { Link } from "react-router-dom";
import { Squash as Hamburger } from "hamburger-react";
import { BsArrowRight } from "react-icons/bs";
import { navRoutes } from "./NavLinks";
import "./Sidebar.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/actions/userAction";

const Sidebar = ({ openSidebar, setOpenSidebar }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const logoutSubmit = () => {
    dispatch(logout());
    setOpenSidebar(!openSidebar);
  };
  return (
    <div
      style={{
        width: "320px",
        background: "#fff",
        // height: "100%",
        minHeight: "100vh",
        padding: "4px 0 40px 0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Hamburger toggle={setOpenSidebar} toggled={openSidebar} color="#000" />
      </div>
      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <div className="sidebarTop">
            <div className="sidebarTopLeft">
              <Link
                to="/"
                className=""
                onClick={() => {
                  setOpenSidebar(!openSidebar);
                }}
              >
                <span style={{ color: "#05BE71" }}>ETE</span>{" "}
                <span style={{ color: "#bababa" }}>|</span>{" "}
                <span className="">ALUMNI</span>
              </Link>
            </div>
          </div>
          <div className="sidebarAuth-Container">
            {user && (
              <div className="sidebarAuth">
                {user.role === "admin" && (
                  <>
                    <Link
                      style={{
                        fontWeight: "500",
                        fontSize: "12px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                      to="/admin/dashboard"
                      onClick={() => {
                        setOpenSidebar(!openSidebar);
                      }}
                    >
                      <img
                        className="sidebarAuth-avatar"
                        src={user?.avatar}
                        alt="avatar"
                      />
                      <div
                        style={{
                          paddingTop: "8px",
                          fontWeight: "500",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        Go to Admin Panel{" "}
                        <BsArrowRight size={13} style={{ marginLeft: "4px" }} />
                      </div>
                    </Link>
                  </>
                )}
                {user.role !== "admin" && (
                  <Link
                    style={{
                      fontWeight: "500",
                      fontSize: "12px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                    to="/profile"
                    onClick={() => {
                      setOpenSidebar(!openSidebar);
                    }}
                  >
                    <img
                      className="sidebarAuth-avatar"
                      src={user?.avatar}
                      alt="avatar"
                    />
                    <div
                      style={{
                        paddingTop: "8px",
                        fontWeight: "500",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {user?.firstName + " " + user?.lastName}
                    </div>
                  </Link>
                )}
              </div>
            )}
          </div>
          <ul className="SidebarItems">
            {navRoutes.map((item) => (
              <li key={item.name} className="SidebarItem">
                <Link
                  onClick={() => {
                    setOpenSidebar(!openSidebar);
                  }}
                  className="sidebar-link"
                  to={item.route}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <ul className="SidebarItemsBottom">
          {!user ? (
            <>
              <li className="SidebarItem">
                <Link
                  onClick={() => {
                    setOpenSidebar(!openSidebar);
                  }}
                  className="lin"
                  to="/sign-in"
                >
                  Sign in
                </Link>
              </li>
              <li className="SidebarItem">
                <span style={{ padding: "0 8px", fontWeight: "bold" }}>/</span>
              </li>

              <li className="SidebarItem">
                <Link
                  onClick={() => {
                    setOpenSidebar(!openSidebar);
                  }}
                  className="lin"
                  to="sign-up"
                >
                  Sign up
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="SidebarItem">
                {/* <Link className="lin" to="sign-up"> */}
                <div onClick={logoutSubmit} style={{ cursor: "pointer" }}>
                  Logout
                </div>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
