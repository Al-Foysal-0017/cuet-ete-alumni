import React, { useEffect } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Container from "../../components/container/Container";
import Footer from "../../components/footer";
import PageLoader from "../../components/pageLoader";
import { getAllEvents } from "../../store/actions/eventAction";
import "./__event.scss";

const Events = () => {
  const dispatch = useDispatch();
  const { events, loading } = useSelector((state) => state.events);
  useEffect(() => {
    dispatch(getAllEvents());
  }, [dispatch]);
  return (
    <>
      <div className="signUpBanner"></div>
      <Container className="testPage">
        <span className="bgWhite mt-280">Events</span>
      </Container>
      <Container>
        {loading && <PageLoader />}
        <div className="events__cards">
          {events?.map((item, index) => (
            <div key={index} className="events__cards__item">
              <Link to={`/event/details/${item?._id}`}>
                <div className="events__cards__item__month">{item.month}</div>
                <div className="events__cards__item__date">{item.date}</div>
                <div className="events__cards__item__title">
                  {item.title}{" "}
                  <span>
                    <FaExternalLinkAlt className="events__cards__item__icon" />
                  </span>
                </div>
                <div className="events__cards__item__particularDate">
                  {item.particular_date}
                </div>
                <div className="events__cards__item__media">{item.media}</div>
                <div className="events__cards__item__organization">
                  {item.organized_by}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default Events;
