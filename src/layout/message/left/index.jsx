import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const MessageLeft = ({ data, currentChat }) => {
  const { user } = useSelector((state) => state.user);
  const userId = data.members.find((id) => id !== user?._id);
  const [userData, setUserData] = useState(null);

  // fetching data each chat card
  useEffect(() => {
    const getUserData = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/admin/user/${userId}`
        );
        setUserData(data.user);
      } catch (error) {}
    };

    if (data !== null) getUserData();
  }, [data, userId]);
  return (
    <>
      <img
        className="messages__left__img"
        width={84}
        height={84}
        src={userData?.avatar?.url}
        alt=""
      />
      <div className="messages__left__txt">
        <div className="messages__left__name">
          {userData?.firstName} {userData?.lastName}
        </div>
        <div className="messages__left__msg">{userData?.student_id}</div>
      </div>
    </>
  );
};

export default MessageLeft;
