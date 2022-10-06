import React from "react";
import Navigation from "../../components/adminNabSidebar/Navigation";
import Container from "../../components/container/Container";
import DataAndChart from "../../layout-admin/dashboard/dataAndchart";
import "./__dashboard.scss";

const DashboardAdmin = () => {
  return (
    <Navigation>
      <div className="adminDashboard">
        <Container>
          <h1>DASHBOARD</h1>
          <section className="adminDashboardSection">
            <div className="adminDashboard__topBox">
              <div className="adminDashboard__topBox__title">Requested</div>
              <div className="adminDashboard__topBox__subtitle">24</div>
            </div>
            <div className="adminDashboard__topBox">
              <div className="adminDashboard__topBox__title">Active Users</div>
              <div className="adminDashboard__topBox__subtitle">15</div>
            </div>
            <div className="adminDashboard__topBox">
              <div className="adminDashboard__topBox__title">Total Events</div>
              <div className="adminDashboard__topBox__subtitle">04</div>
            </div>
          </section>
          <section className="adminDashboardChart">
            <div className="adminDashboardChart__header">
              Number of Events (in a year)
            </div>
            <DataAndChart />
          </section>
        </Container>
      </div>
    </Navigation>
  );
};

export default DashboardAdmin;
