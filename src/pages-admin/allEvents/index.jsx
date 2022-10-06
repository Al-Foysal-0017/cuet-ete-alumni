import React from "react";
import { useSelector } from "react-redux";
import Container from "../../components/container/Container";
import Navigation from "../../components/adminNabSidebar/Navigation";
import Table from "./Table";

const AllEventsAdmin = () => {
  const { events, loading } = useSelector((state) => state.events);
  return (
    <Navigation>
      <Container>
        <div style={{ marginTop: "3rem" }} />
        <Table events={events} />
        <div style={{ marginBottom: "7rem" }} />
        {loading && <h1>Loading...</h1>}
      </Container>
    </Navigation>
  );
};

export default AllEventsAdmin;
