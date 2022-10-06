import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import "./style/Sidebar.css";

const Sidebar = ({ sideNavOpen }) => {
  const dataForCreate = [
    {
      name: "All Requests",
      link: "/admin/all-requests",
    },
    {
      name: "Create Event",
      link: "/admin/create/event",
    },
  ];

  const dataForShow = [
    {
      name: "All User",
      link: "/admin/all/users",
    },
    {
      name: "All Events",
      link: "/admin/all-events",
    },
  ];

  return (
    <div
      className={`
            Sidebar transform transition-all duration-300
            ${sideNavOpen ? "translateForSidebar" : "translateForSidebarNeg"}
            `}
    >
      <div className="adminSidebar">
        <div className="adminSidebarLogo">
          <div className="adminTopHeader">
            <Link to="/admin/dashboard">Admin Panel</Link>
          </div>
        </div>
        <div className="backToHome">
          <Link to="/" className="backToHome">
            <BsArrowLeft size={24} style={{ marginRight: "8px" }} />
            Back To Site
          </Link>
        </div>

        <div className="ListContainerAdmin">
          <div className="ListContainerAdminTitle">Create & Post</div>
          <ul className="adminSidebarUnorderList">
            {dataForCreate.map((item, index) => (
              <Link key={index} to={item.link}>
                <li className="adminSidebarList">{item.name}</li>
              </Link>
            ))}
          </ul>
        </div>

        <div className="ListContainerAdmin">
          <div className="ListContainerAdminTitle">Visualize & Edit</div>
          <ul className="adminSidebarUnorderList">
            {dataForShow.map((item, index) => (
              <Link key={index} to={item.link}>
                <li className="adminSidebarList">{item.name}</li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
