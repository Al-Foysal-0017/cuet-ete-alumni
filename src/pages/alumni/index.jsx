import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "../../components/container/Container";
import PageLoader from "../../components/pageLoader";
import { getAllUsers } from "../../store/actions/userAction";
import QuickView from "./QuickView";
import RawView from "./RawView";
import "./__findAlumni.scss";
import "./_quickView.scss";

const Alumni = () => {
  const dispatch = useDispatch();
  const { users, loading } = useSelector((state) => state.usersRequest);

  const [showQuickView, setShowQuickView] = useState(false);
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

          <div className="findAlumnitop">
            <div
              className="findAlumnitop__left"
              onClick={() => {
                setShowQuickView(true);
              }}
              style={{
                background: showQuickView ? "#05be71" : "",
                color: showQuickView ? "#fff" : "#000",
              }}
            >
              Quick View
            </div>
            <div
              className="findAlumnitop__right"
              onClick={() => {
                setShowQuickView(false);
              }}
              style={{
                background: !showQuickView ? "#05be71" : "",
                color: !showQuickView ? "#fff" : "#000",
              }}
            >
              Raw View
            </div>
          </div>

          {showQuickView ? (
            <QuickView alumni={filterAlimni} />
          ) : (
            <RawView
              search={search}
              setSearch={setSearch}
              filterSearch={filterSearch}
            />
          )}
        </>
      )}
    </Container>
  );
};

export default Alumni;
