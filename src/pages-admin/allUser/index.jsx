import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Navigation from "../../components/adminNabSidebar/Navigation";
import Container from "../../components/container/Container";
import PageLoader from "../../components/pageLoader";

const AllUser = () => {
  const { users, loading } = useSelector((state) => state.usersRequest);

  const [search, setSearch] = useState("");

  const filterApproveAlumni = users?.filter((item) => item.role === "alumni");

  const filterSearch = filterApproveAlumni?.filter(
    (item) =>
      item.student_id.toLowerCase().includes(search.toLowerCase()) ||
      item.firstName.toLowerCase().includes(search.toLowerCase()) ||
      item.lastName.toLowerCase().includes(search.toLowerCase()) ||
      item.batch.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <Navigation>
      {users?.length === 0 && loading ? (
        <PageLoader />
      ) : (
        <div className="adminDashboard">
          <Container>
            {loading ? (
              <PageLoader />
            ) : (
              <>
                <div className="communityDetails__head">All Approval User</div>

                <div className="inputFieldCommunityDetailsCont">
                  <input
                    className="inputFieldCommunityDetails"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                    placeholder="Search by name, batch, id...."
                  />
                </div>

                <div className="communityDetails__container">
                  {filterSearch?.length === 0 && (
                    <div className="NoAlumniFound">No alumni found!!!</div>
                  )}
                  {filterSearch.map((item, index) => (
                    <div className="communityDetails__box" key={index}>
                      <img
                        className="communityDetails__img"
                        src={item?.avatar?.url}
                        alt=""
                      />
                      <div className="communityDetails__box__right">
                        <div className="communityDetails__name">
                          {item.firstName} {item?.lastName}
                        </div>
                        <div className="">Batch: {item.batch}</div>
                        <div className="">ID: {item.student_id}</div>

                        <Link to={`/user/details/${item._id}`}>
                          <button className="communityDetails__button">
                            Details
                          </button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </Container>
        </div>
      )}
    </Navigation>
  );
};

export default AllUser;
