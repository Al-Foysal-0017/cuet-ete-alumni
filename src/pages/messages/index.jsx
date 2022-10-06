import React, { useEffect, useRef, useState } from "react";
import Container from "../../components/container/Container";
import "./__messages.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllMembers,
  getAllMessages,
} from "../../store/actions/messageAction";
// import MessageRight from "../../layout/message/right";
import MessageLeft from "../../layout/message/left";
import AddChatList from "../../layout/message/addChatList";
import { io } from "socket.io-client";

const Messages = () => {
  const dispatch = useDispatch();
  const socket = useRef();
  const { user } = useSelector((state) => state.user);
  const { users } = useSelector((state) => state.usersRequest);
  const { msgMembers } = useSelector((state) => state.allMemberMsg);
  // const { msgs } = useSelector((state) => state.msgReducer);
  const [userListActive, setUserListActive] = useState(true);
  const [currentChat, setCurrentChat] = useState(null);
  const [search, setSearch] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);
  console.log(setSendMessage);
  console.log(receivedMessage);

  console.log(onlineUsers);
  console.log(sendMessage);

  const filterAlimni = users?.filter((item) => item?.role === "alumni");

  const filterSearch = filterAlimni?.filter(
    (item) =>
      item.student_id.toLowerCase().includes(search.toLowerCase()) ||
      item.firstName.toLowerCase().includes(search.toLowerCase()) ||
      item.lastName.toLowerCase().includes(search.toLowerCase()) ||
      item.batch.toLowerCase().includes(search.toLowerCase())
  );

  // Connect to Socket.io
  useEffect(() => {
    socket.current = io("ws://localhost:8800");
    socket.current.emit("new-user-add", user._id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [user._id]);

  useEffect(() => {
    dispatch(getAllMembers(user?._id));
    dispatch(getAllMessages(currentChat?._id));
  }, [currentChat?._id, dispatch, user?._id]);

  // Get the message from socket server
  useEffect(() => {
    socket.current.on("recieve-message", (data) => {
      console.log("RECEIVEDATA:", data);
      setReceivedMessage(data);
    });
  }, []);

  return (
    <Container className="messages">
      <div
        style={{ height: "calc(100vh - 130px)", overflow: "hidden" }}
        className="messages__left"
      >
        <div className="messages__left__searchBox">
          <div className="messages__left__chatListActive">
            <div
              onClick={() => {
                setUserListActive(false);
              }}
              className="messages__left__chatListActive__btn"
              style={{
                background: userListActive ? "#fff" : "#05be71",
                color: userListActive ? "#000" : "#fff",
              }}
            >
              Chat-List
            </div>
            <div
              onClick={() => {
                setUserListActive(true);
              }}
              className="messages__left__chatListActive__btn"
              style={{
                background: userListActive ? "#05be71" : "#fff",
                color: userListActive ? "#fff" : "#000",
              }}
            >
              Alumni-List
            </div>
          </div>
          {userListActive && (
            <input
              className="messages__left__searchBox__input"
              placeholder="Search Alumni..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          )}
        </div>
        {!userListActive && (
          <div className="messages__left__allAlumni">
            {msgMembers?.length > 0 ? (
              msgMembers?.map((item, index) => (
                <div
                  onClick={() => {
                    setCurrentChat(item);
                  }}
                  key={index}
                  className="messages__left__card"
                >
                  <MessageLeft data={item} currentChat={currentChat} />
                </div>
              ))
            ) : (
              <div style={{ color: "#bababa", padding: "1rem" }}>
                You have no chat list.
              </div>
            )}
          </div>
        )}

        {userListActive && (
          <div className="messages__left__allAlumni">
            {filterSearch?.length > 0 &&
              filterSearch?.map((item, index) => (
                <AddChatList
                  msgMembers={msgMembers}
                  item={item}
                  index={index}
                  userListActive={userListActive}
                  setUserListActive={setUserListActive}
                />
              ))}
          </div>
        )}
      </div>
      {/* {currentChat ? (
        <MessageRight
          setSendMessage={setSendMessage}
          chat={currentChat}
          msgs={msgs}
          receivedMessage={receivedMessage}
          currentChat={currentChat}
          socket={socket}
        />
      ) : (
        <div className="messages__right noCurrentUser">
          <div className="messages__right noCurrentUser__txt">
            Please Select A Alumni For Chat !!!
          </div>
        </div>
      )} */}
      <div className="messages__right noCurrentUser">
        <div className="messages__right noCurrentUser__txt">
          It is under development.
        </div>
        <div
          style={{ paddingTop: "2rem" }}
          className="messages__right noCurrentUser__txt"
        >
          It will updated soon.
        </div>
      </div>
    </Container>
  );
};

export default Messages;
