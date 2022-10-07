import React, { useEffect, useRef, useState } from "react";
import { FiSend } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  getAllMessages,
  msgCreate,
} from "../../../store/actions/messageAction";
import axios from "axios";

const MessageRight = ({
  chat,
  msgs,
  receivedMessage,
  setSendMessage,
  currentChat,
  socket,
}) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [userData, setUserData] = useState(null);

  const scroll = useRef();
  const [newMessage, setNewMessage] = useState("");

  // fetching data for header
  useEffect(() => {
    const userId = chat?.members?.find((id) => id !== user?._id);
    const getUserData = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/admin/user/${userId}`
        );
        setUserData(data.user);
      } catch (error) {
        console.log(error);
      }
    };

    if (chat !== null) getUserData();
  }, [chat, user?._id]);

  // Send Message
  const handleSend = async (e) => {
    e.preventDefault();
    const message = {
      senderId: user?._id,
      text: newMessage,
      chatId: chat._id, //member ar toirir somoy mongodb id
    };
    const receiverId = chat?.members?.find((id) => id !== user?._id);
    dispatch(msgCreate(message));
    socket.current.emit("send-message", { ...message, receiverId });

    setNewMessage("");
  };

  // Receive Message from parent component
  useEffect(() => {
    console.log("Message Arrived: ", receivedMessage);
    if (receivedMessage !== null && receivedMessage.chatId === chat._id) {
      dispatch(getAllMessages(currentChat?._id));
      // setMessages([...messages, receivedMessage]);
    }
  }, [chat._id, currentChat?._id, dispatch, receivedMessage]);

  // Always scroll to last Message
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);

  return (
    <>
      <div className="messages__right">
        <div className="messages__right__top">
          <img
            className="messages__right__top__img"
            src={userData?.avatar?.url}
            alt=""
          />
          <div className="messages__right__top__name">
            {userData?.firstName} {userData?.lastName}
          </div>
        </div>
        <div className="messages__right__afterTop">
          <div className="messages__right__center">
            {msgs?.length > 0 &&
              msgs?.map((item, index) => (
                <div key={index} ref={scroll}>
                  {item.senderId !== user?._id ? (
                    <div className="messages__right__center__frdMsg">
                      <div className="messages__right__center__frdMsg__date">
                        {moment(item?.createdAt).calendar()}
                      </div>
                      <div className="messages__right__center__frdMsg__contr">
                        <img
                          className="messages__right__center__frdMsg__img"
                          src={userData?.avatar?.url}
                          alt=""
                        />
                        <div className="messages__right__center__frdMsg__msg">
                          {item?.text}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="messages__right__center__myMsg">
                        <div className="messages__right__center__myMsg__date">
                          {moment(item?.createdAt).calendar()}
                        </div>
                        <div className="messages__right__center__myMsg__contr">
                          <div className="messages__right__center__myMsg__msg">
                            {item?.text}
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
          </div>
          <div className="messages__right__bottom">
            <input
              className="messages__right__bottom__input"
              placeholder="Write msg..."
              value={newMessage}
              onChange={(e) => {
                setNewMessage(e.target.value);
              }}
            />
            <div>
              <button className="messages__right__bottom__btn">
                {newMessage ? (
                  <FiSend
                    onClick={handleSend}
                    style={{ color: "#05be71" }}
                    size={28}
                  />
                ) : (
                  <FiSend
                    style={{ color: "#bababa", cursor: "default" }}
                    size={28}
                  />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MessageRight;
