import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaExternalLinkAlt } from "react-icons/fa";
import { BsHeartFill, BsHeart } from "react-icons/bs";
import { getAllStories } from "../../../store/actions/storyAction";
import { useAlert } from "react-alert";
import { useState } from "react";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";

const LikeStory = ({ item, index }) => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);

  const foundUserId = item?.like?.find((obj) => {
    return obj === user?._id ? true : false;
  });

  const handleUpdateLike = async (storyId) => {
    setLoading(true);
    if (!user) {
      alert.error("Please login to like this story.");
      setLoading(false);
    }
    if (user && user?.role !== "alumni") {
      alert.error("You can not like this story because you have no approval.");
      setLoading(false);
    }
    if (user && user?.role === "alumni") {
      const userId = user?._id;
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        await axios.put(
          `${process.env.REACT_APP_API_URL}/story/like/${storyId}`,
          { userId },
          config
        );
        dispatch(getAllStories());
        setLoading(false);
      } catch (error) {
        alert.error("Something went wrong. Try again.");
        setLoading(false);
      }
    }
  };
  return (
    <>
      <div
        className="events__cards__item"
        style={{
          height: "700px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          {/* Top */}
          <Link to={`/user/details/${item?.userId}`}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                paddingBottom: "1.5rem",
              }}
            >
              <img
                style={{ borderRadius: "50%" }}
                width={64}
                height={64}
                src={item?.userImg}
                alt=""
              />
              <div style={{ paddingLeft: "1rem" }}>
                <div style={{ fontWeight: "600" }}>{item?.userName}</div>
                <div>{moment(item?.updatedAt).format("MMM Do YY")}</div>
              </div>
            </div>
          </Link>
          {/* Middle */}
          <Link to={`/story/details/${item._id}`}>
            <img
              style={{ objectFit: "cover", borderRadius: "10px" }}
              width={"100%"}
              height={200}
              src={item?.img?.url}
              alt=""
            />
          </Link>

          {/* Details */}
          <Link to={`/story/details/${item._id}`}>
            <div className="events__cards__item__title">
              {item.title}{" "}
              <span>
                <FaExternalLinkAlt className="events__cards__item__icon" />
              </span>
            </div>
            <div className="events__cards__item__organization">
              {item.organized_by}
            </div>
            <div
              style={{ paddingTop: "1rem" }}
              className="events__cards__item__organization"
            >
              {item?.desc?.split("", 64)}
              {item?.desc?.split("").length > 63 && <>.......</>}
            </div>
          </Link>
        </div>
        <div>
          {loading ? (
            <div className="LikeContainer">
              <ThreeDots
                height="64"
                width="64"
                radius="9"
                color="gray"
                ariaLabel="loading"
                wrapperStyle
                wrapperClass
              />
            </div>
          ) : (
            <div className="LikeContainer">
              {user &&
                (foundUserId === user?._id ? (
                  <BsHeartFill
                    className="LikeContainer__icon"
                    size={40}
                    color="red"
                    onClick={() => {
                      handleUpdateLike(item._id);
                    }}
                  />
                ) : (
                  <BsHeart
                    onClick={() => {
                      handleUpdateLike(item._id);
                    }}
                    className="LikeContainer__icon"
                    size={40}
                  />
                ))}
              {!user && (
                <BsHeart
                  onClick={() => {
                    handleUpdateLike(item._id);
                  }}
                  className="LikeContainer__icon"
                  size={40}
                />
              )}
              <span className="LikeContainer__num">{item?.like?.length}</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default LikeStory;
