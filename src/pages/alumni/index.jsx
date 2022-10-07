import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Container from "../../components/container/Container";
import PageLoader from "../../components/pageLoader";
import { getAllUsers } from "../../store/actions/userAction";

const Alumni = () => {
  const dispatch = useDispatch();
  const { users, loading } = useSelector((state) => state.usersRequest);

  const [search, setSearch] = useState("");

  const filterAlimni = users?.filter((item) => item?.role === "alumni");

  const filterSearch = filterAlimni?.filter(
    (item) =>
      item.student_id.toLowerCase().includes(search.toLowerCase()) ||
      item.firstName.toLowerCase().includes(search.toLowerCase()) ||
      item.lastName.toLowerCase().includes(search.toLowerCase()) ||
      item.batch.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <Container>
      {loading ? (
        <PageLoader />
      ) : (
        <>
          <div className="communityDetails__head">Find Alumni</div>

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
  );
};

export default Alumni;
