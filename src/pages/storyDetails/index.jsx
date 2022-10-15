import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import {
  getStoryDetails,
  storyCommentCreate,
} from "../../store/actions/storyAction";
import { useDispatch, useSelector } from "react-redux";
import PageLoader from "../../components/pageLoader";
import Container from "../../components/container/Container";
import "./__storyDetails.scss";
import moment from "moment";
import CommentLoading from "./commentLoader/CommentLoading";
import axios from "axios";
import { useAlert } from "react-alert";

const StoryDetails = () => {
  const { id } = useParams();
  const alert = useAlert();
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [delteLoading, setDeleteLoading] = useState(false);
  const { user, token } = useSelector((state) => state.user);
  const { story, loading, comments } = useSelector((state) => state.story);
  const storyCmtState = useSelector((state) => state.storyCmt);

  const [form, setForm] = useState({
    userId: user?._id,
    commentId: id,
    comment: "",
  });

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDelete = async (id) => {
    setDeleteLoading(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const data = await axios.delete(
        `${process.env.REACT_APP_API_URL}/story/${id}`,
        config
      );
      console.log("data:>>", data);
      navigate("/stories");
      setDeleteLoading(false);
    } catch (error) {
      console.log(error);
      alert.error("Something went wrong. Try again.");
      setDeleteLoading(false);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(storyCommentCreate(form));
    setForm({ ...form, comment: "" });
  };

  useEffect(() => {
    dispatch(getStoryDetails(id));
  }, [dispatch, id]);
  return (
    <>
      <Container>
        {loading ? (
          <PageLoader />
        ) : (
          <div className="storyDetails">
            <Link to="/stories">{"<--"} Back</Link>
            <Link to={`/user/details/${story?.userId}`}>
              <div className="storyDetails__postedBy">
                <div className="storyDetails__postedBy__title styleTxt">
                  Posted By-
                </div>
                <div className="storyDetails__postedBy__container">
                  <img
                    className="storyDetails__postedBy__img"
                    src={story?.userImg}
                    alt=""
                  />
                  <div>
                    <div className="storyDetails__postedBy__name">
                      {story?.userName}
                    </div>
                    <div className="storyDetails__postedBy__date">
                      <span>{moment(story?.updatedAt).calendar()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
            <img
              className="storyDetails__banner"
              src={story?.img?.url}
              alt=""
            />
            {/* Delete */}
            {user?._id === story.userId && (
              <div className="deleteStory">
                {delteLoading ? (
                  "Deleting..."
                ) : (
                  <div className="deleteStory__icon">
                    <AiFillDelete
                      onClick={() => {
                        handleDelete(id);
                      }}
                      size={32}
                      color={"tomato"}
                    />
                  </div>
                )}

                <div className="deleteStory__txt">Delete Story</div>
              </div>
            )}
            <div className="storyDetails__content">
              <div className="storyDetails__content__title">{story?.title}</div>
              <div className="storyDetails__content__organized">
                {story?.organized_by}
              </div>
              <div className="storyDetails__content__desc">{story?.desc}</div>
            </div>
            {/* Comment */}
            {!user && (
              <div
                style={{
                  border: "1px solid tomato",
                  padding: "1rem",
                  maxWidth: "800px",
                  marginTop: "5rem",
                  color: "tomato",
                }}
              >
                Please login to comment this story.
              </div>
            )}
            {user && (
              <>
                {user?.role === "alumni" || user?.role === "admin" ? (
                  <form onSubmit={submitHandler} className="storyDetails__form">
                    <textarea
                      rows={1}
                      style={{ margin: 0 }}
                      placeholder="Write comment..."
                      name="comment"
                      onChange={changeHandler}
                      value={form.comment}
                    />

                    {form.comment ? (
                      <input
                        style={{
                          width: "150px",
                          fontSize: "14px",
                          cursor: "pointer",
                          background: "#05be71",
                          border: "none",
                          color: "#fff",
                          marginLeft: "1rem",
                          borderRadius: "4px",
                          height: "60px",
                        }}
                        type="submit"
                        value="COMMENT"
                        //   disabled={true}
                      />
                    ) : (
                      <>
                        <input
                          style={{
                            width: "150px",
                            fontSize: "14px",
                            background: "gray",
                            border: "none",
                            color: "#fff",
                            marginLeft: "1rem",
                            borderRadius: "4px",
                            height: "60px",
                          }}
                          type="submit"
                          value="COMMENT"
                          disabled={true}
                        />
                      </>
                    )}
                  </form>
                ) : (
                  <div
                    style={{
                      border: "1px solid tomato",
                      padding: "1rem",
                      maxWidth: "800px",
                      marginTop: "5rem",
                      color: "tomato",
                    }}
                  >
                    You can not comment. Because you have no approval.
                  </div>
                )}
              </>
            )}
          </div>
        )}
        <div className="storyDetails__comments">
          <div className="storyDetails__comments__title">All Comments</div>
          {comments?.length === 0 && (
            <div className="noCommmnet">No Comments Yet.</div>
          )}
          {storyCmtState?.loading || loading ? (
            <CommentLoading />
          ) : (
            <div className="storyDetails__comments__box">
              {comments?.map((item, index) => (
                <div key={index}>
                  <div className="commentBoxBorderStyle" />
                  <div className="storyDetails__comment">
                    <div className="storyDetails__comment__top">
                      <Link to={`/user/details/${item?.commentUser?._id}`}>
                        <img
                          className="storyDetails__comment__top__img"
                          width={64}
                          height={64}
                          src={item?.commentUser?.avatar?.url}
                          alt=""
                        />
                      </Link>

                      <div className="storyDetails__comment__top__name">
                        <Link to={`/user/details/${item?.commentUser?._id}`}>
                          <div style={{ fontWeight: "bold" }}>
                            {item?.commentUser?.firstName} {"  "}
                            {item?.commentUser?.lastName}{" "}
                          </div>
                        </Link>

                        <div>{item?.commentUser?.student_id}</div>
                        <div>
                          {moment(item?.userComment?.updatedAt).calendar()}
                        </div>
                      </div>
                    </div>
                    <div className="storyDetails__comment__text">
                      {item?.userComment?.comment}
                    </div>
                  </div>
                  <div />
                </div>
              ))}
            </div>
          )}
        </div>
      </Container>
    </>
  );
};

export default StoryDetails;
