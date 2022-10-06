import SideNav from "./Sidebar";
import Topbar from "./Topbar";
import { useState } from "react";
import "./style/Navigation.css";

const Navigation = ({ children }) => {
  const [sideNavOpen, setSideNavOpen] = useState(false);

  return (
    <main>
      <section className="NavigationContainer" style={{ maxWidth: 2000 }}>
        <div className="NavigationWrapper gridCols5">
          <SideNav sideNavOpen={sideNavOpen} />
          <div className="BodyNavigation colSpan4">
            <Topbar setSideNavOpen={setSideNavOpen} sideNavOpen={sideNavOpen} />
            <div>{children}</div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Navigation;
