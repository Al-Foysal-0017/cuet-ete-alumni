import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PageLoader from "../../components/pageLoader";
import Container from "../../components/container/Container";
import moment from "moment";
import { getEventDetails } from "../../store/actions/eventAction";

const EventDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { event, loading } = useSelector((state) => state.eventDetails);

  useEffect(() => {
    dispatch(getEventDetails(id));
  }, [dispatch, id]);
  return (
    <>
      <Container>
        {loading ? (
          <PageLoader />
        ) : (
          <div className="storyDetails">
            <Link to="/events">{"<--"} Back</Link>
            <div style={{ marginTop: "2rem" }}>
              <div className="storyDetails__postedBy__title styleTxt">
                Posted At-
              </div>
              <span>{moment(event?.createdAt).format("MMM Do YY")}</span>
            </div>
            <img
              className="storyDetails__banner"
              src={event?.img?.url}
              alt=""
            />

            <div className="storyDetails__content">
              <div className="storyDetails__content__title">{event?.title}</div>
              <div className="storyDetails__content__organized">
                {event?.organized_by}
              </div>
              <div className="storyDetails__content__desc">{event?.desc}</div>
            </div>
            <div style={{ marginBottom: "7rem" }} />
          </div>
        )}
      </Container>
    </>
  );
};

export default EventDetails;
