import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllMembers } from "../../../store/actions/messageAction";

const AddChatList = ({
  item,
  index,
  msgMembers,
  userListActive,
  setUserListActive,
}) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const [loading, setLoading] = useState(false);

  const formData = {
    senderId: user?._id,
    receiverId: item?._id,
  };

  const addToChatList = async () => {
    try {
      setLoading(true);
      const config = { headers: { "Content-Type": "application/json" } };

      await axios.post(
        `${process.env.REACT_APP_API_URL}/create/chat`,
        formData,
        config
      );
      // console.log(data);
      dispatch(getAllMembers(user?._id));
      setLoading(false);
      setUserListActive(!userListActive);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div key={index} className="messages__left__card">
        <img
          className="messages__left__img"
          width={84}
          height={84}
          src={item?.avatar?.url}
          alt=""
        />
        <div className="messages__left__txt">
          <div className="messages__left__name">
            {item?.firstName} {item?.lastName}
          </div>
          <div className="messages__left__msg">{item?.student_id}</div>
          <div>
            {!loading ? (
              <button onClick={addToChatList} className="AddChatListBtn">
                Add Chat-List
              </button>
            ) : (
              "Loading..."
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AddChatList;
