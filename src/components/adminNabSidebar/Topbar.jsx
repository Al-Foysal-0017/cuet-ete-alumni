import React from "react";
import "./style/Topbar.css";
import { Turn as Hamburger } from "hamburger-react";
import Container from "../container/Container";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../store/actions/userAction";

const Topbar = ({ sideNavOpen, setSideNavOpen }) => {
  const dispatch = useDispatch();
  const logoutSubmit = () => {
    dispatch(logout());
  };
  return (
    <>
      <div className="HeaderContainer">
        <Container>
          <div className="HeaderWrapper">
            {/* Search Box*/}
            <Link to="/admin/dashboard" className="adminTopbarLogo">
              <span style={{ color: "#05be71" }}>ETE</span>{" "}
              <span style={{ color: "#bababa", padding: "0 8px" }}>|</span>{" "}
              <span className="">ALUMNI</span>
            </Link>

            <div className="HeaderRight">
              <span className="logoutBtn" onClick={logoutSubmit}>
                Logout
              </span>
              <div style={{ marginLeft: "1rem" }} className="HeaderHamburger">
                <Hamburger
                  toggled={sideNavOpen}
                  toggle={setSideNavOpen}
                  color="#000"
                />
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Topbar;
