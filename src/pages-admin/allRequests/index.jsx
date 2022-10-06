import React, { useEffect } from "react";
import Navigation from "../../components/adminNabSidebar/Navigation";
import Container from "../../components/container/Container";
import "./__allRequest.scss";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../store/actions/userAction";
import Table from "./Table";
import PageLoader from "../../components/pageLoader";

const AllRequestsAdmin = () => {
  const dispatch = useDispatch();
  const { users, loading } = useSelector((state) => state.usersRequest);

  const filterSubscriber = users?.filter((subs) => subs.role === "subscriber");

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);
  return (
    <>
      <Navigation>
        {users?.length === 0 && loading ? (
          <PageLoader />
        ) : (
          <div className="adminDashboard">
            <Container>
              <Table users={filterSubscriber} />
            </Container>
          </div>
        )}
      </Navigation>
    </>
  );
};

export default AllRequestsAdmin;
