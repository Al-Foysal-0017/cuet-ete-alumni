import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThreeCircles } from "react-loader-spinner";
import Container from "../../components/container/Container";
import { clearMessage, logout } from "../../store/actions/userAction";
import { useAlert } from "react-alert";
import "./__profile.scss";
import { Link } from "react-router-dom";
import Footer from "../../components/footer";
import { getAsingleUserStories } from "../../store/actions/storyAction";
import moment from "moment";
import Title from "../../components/title";
import PageLoader from "../../components/pageLoader";

const Profile = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { user, loading, message } = useSelector((state) => state.user);
  const logoutSubmit = async () => {
    dispatch(logout());
  };
  const { aUserStories } = useSelector((state) => state.aUserAllStory);
  const aUserStoriesState = useSelector((state) => state.aUserAllStory);

  useEffect(() => {
    if (message) {
      alert.success(message);
      dispatch(clearMessage());
    }
    dispatch(getAsingleUserStories(user?._id));
  }, [dispatch, message, alert, user?._id]);
  return (
    <>
      <div className="signInBanner"></div>
      <Container className="testPage">
        <span className="bgWhite mt-280">My Profile</span>
      </Container>
      {loading ? (
        <PageLoader />
      ) : (
        <Container>
          <section className="profile">
            {/* LEFT */}
            <section className="profile__left">
              <img
                style={{ objectFit: "cover" }}
                src={user.avatar?.url}
                alt=""
              />
              <div>
                <div className="profile__right__top__name">
                  <span>{user.firstName}</span>
                  <span style={{ paddingLeft: "1rem" }}>{user.lastName}</span>
                </div>
                <div className="profile__right__top__id">
                  ID: {user.student_id}
                </div>
              </div>
              <button disabled={loading ? true : false} onClick={logoutSubmit}>
                {loading ? "Loading..." : "LOGOUT"}
              </button>
              <Link className="profile__left__link" to="/profile/update">
                Update Profile
              </Link>
              <section className="profileDetails">
                <hr />
                <div className="profileDetails__contr">
                  <div className="profileDetails__title">Department</div>
                  <div className="profileDetails__value">{user.department}</div>
                </div>
                <hr />
                <div className="profileDetails__contr">
                  <div className="profileDetails__title">Batch</div>
                  <div className="profileDetails__value">{user.batch}</div>
                </div>
                <hr />
                <div className="profileDetails__contr">
                  <div className="profileDetails__title">Graduation Year</div>
                  <div className="profileDetails__value">
                    {user.graduation_year}
                  </div>
                </div>
                <hr />
                <div className="profileDetails__contr">
                  <div className="profileDetails__title">Mobile</div>
                  <div className="profileDetails__value">{user.number}</div>
                </div>
                <hr />
                <div className="profileDetails__contr">
                  <div className="profileDetails__title">Email</div>
                  <div className="profileDetails__value">{user?.email}</div>
                </div>
                <hr />
                <div className="profileDetails__contr">
                  <div className="profileDetails__title">Blood Group</div>
                  <div className="profileDetails__value">{user.blood}</div>
                </div>
                <hr />
                <div className="profileDetails__contr">
                  <div className="profileDetails__title">
                    Previous working position
                  </div>
                  <div className="profileDetails__value">
                    {user?.previous_working_position}
                  </div>
                </div>
                <hr />
                <div className="profileDetails__contr">
                  <div className="profileDetails__title">
                    Present working position
                  </div>
                  <div className="profileDetails__value">
                    {user?.present_working_position}
                  </div>
                </div>
                <hr />
                <div className="profileDetails__contr">
                  <div className="profileDetails__title">Present country</div>
                  <div className="profileDetails__value">{user?.country}</div>
                </div>
                <hr />
                <div className="profileDetails__contr">
                  <div className="profileDetails__title">Facebook Link</div>
                  <div className="profileDetails__value">
                    {user?.facebook_link}
                  </div>
                </div>
                <hr />
                <div className="profileDetails__contr">
                  <div className="profileDetails__title">LinkedIn Link</div>
                  <div className="profileDetails__value">
                    {user.linkedin_link}
                  </div>
                </div>
                <hr />
                <div className="profileDetails__contr">
                  <div className="profileDetails__title">Registration ID</div>
                  <div className="profileDetails__value">{user._id}</div>
                </div>
                <hr />
              </section>
            </section>
            <section className="allStoriesInProfContianer">
              <Title>My Stories</Title>
              <section className="createStoryLinkBoxInProfile">
                <div
                  className="profile__story__top"
                  style={{ marginBottom: "1rem" }}
                >
                  <img
                    className="profile__story__img"
                    src={user?.avatar?.url}
                    alt=""
                  />
                  <div className="profile__story__top__right">
                    <div className="profile__story__name">
                      {user?.firstName} {user?.lastName}
                    </div>
                    <div className="profile__story__name">
                      ID: {user?.student_id}
                    </div>
                  </div>
                </div>
                <div className="createStoryLinkBox__ques">
                  What's on your mind?
                </div>
                {user?.role !== "subscriber" ? (
                  <button className="createStoryLinkBox__create">
                    <Link to="/create/story">Create Story</Link>
                  </button>
                ) : (
                  <div className="storiesNoApproval">
                    You can not create story. Because you have no approval.
                  </div>
                )}
              </section>
              {aUserStoriesState?.loading ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <ThreeCircles
                    height="100"
                    width="100"
                    color="#05BE71"
                    visible={true}
                    ariaLabel="three-circles-rotating"
                  />
                  <div style={{ color: "gray", paddingTop: "4px" }}>
                    Loading...
                  </div>
                </div>
              ) : (
                <div>
                  {aUserStories?.stories?.length === 0 && (
                    <div className="noStoryFound">
                      You do not post any story.
                    </div>
                  )}
                  {aUserStories?.stories?.map((item, index) => (
                    <div className="profile__story" key={index}>
                      <Link to={`/story/details/${item._id}`}>
                        <div className="profile__story__top">
                          <img
                            className="profile__story__img"
                            src={item?.userImg}
                            alt=""
                          />
                          <div className="profile__story__top__right">
                            <div className="profile__story__name">
                              {item?.userName}
                            </div>
                            <div className="profile__story__name">
                              ID: {user?.student_id}
                            </div>
                            <div className="profile__story__date">
                              {moment(item?.createdAt).calendar()}
                            </div>
                          </div>
                        </div>

                        <img
                          className="profile__story__img2"
                          src={item?.img?.url}
                          alt=""
                        />
                        <div>
                          <div className="profile__story__title">
                            {item?.title}
                          </div>
                          <div className="profile__story__subtitle">
                            {item?.organized_by}
                          </div>
                          <div className="profile__story__desc">
                            {item?.desc?.slice(0, 180)}.....
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              )}
              <div style={{ marginBottom: "7rem" }} />
            </section>
          </section>
        </Container>
      )}
      <Footer />
    </>
  );
};

export default Profile;
