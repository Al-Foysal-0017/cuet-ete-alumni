import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Container from "../../components/container/Container";
import Footer from "../../components/footer";
import PageLoader from "../../components/pageLoader";
import LikeStory from "../../layout/story/like";
import { getAllStories } from "../../store/actions/storyAction";
import "./__stories.scss";

const Stories = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { stories, loading } = useSelector((state) => state.stories);
  useEffect(() => {
    dispatch(getAllStories());
  }, [dispatch]);
  return (
    <>
      <div className="signUpBanner"></div>
      <Container className="testPage">
        <span className="bgWhite mt-280">Stories</span>
      </Container>
      <Container>
        {loading && <PageLoader />}
        {!loading && user && (
          //  {  }
          <div className="createStoryLinkBox">
            <div className="createStoryLinkBox__ques">What's on your mind?</div>
            {user?.role !== "subscriber" ? (
              <button className="createStoryLinkBox__create">
                <Link to="/create/story">Create Story</Link>
              </button>
            ) : (
              <div className="storiesNoApproval">
                You can not create story. Because you have no approval.
              </div>
            )}
          </div>
        )}
        <div className="events__cards">
          {stories?.map((item, index) => (
            <LikeStory item={item} key={index} />
          ))}
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default Stories;
