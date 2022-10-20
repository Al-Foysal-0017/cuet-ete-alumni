import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getAllUsers, getUserDetails } from "../../store/actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import Container from "../../components/container/Container";
import { useAlert } from "react-alert";
import "./__userDetails.scss";
import axios from "axios";

const UserDetails = () => {
  const alert = useAlert();
  let navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);
  const { loading, error, user } = useSelector((state) => state.userDetails);
  const [loader, setLoader] = useState(false);

  const approveHandler = async (id, number) => {
    setLoader(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      await axios.put(
        `${process.env.REACT_APP_API_URL}/admin/user/${id}`,
        {
          firstName: user?.firstName,
          lastName: user?.lastName,
          number: number,
          role: "alumni",
        },
        config
      );
      dispatch(getAllUsers());
      setLoader(false);
      navigate("/admin/all-requests");
    } catch (error) {
      alert.error(error.response.data.message || "Something went wrong.");
      setLoader(false);
    }
    dispatch(getAllUsers());
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
    }
    dispatch(getUserDetails(id));
  }, [alert, dispatch, error, id]);
  return (
    <Container>
      {loading && user._id && <h1>Loading....</h1>}
      <div className="userDetails__back">
        <Link to="/admin/all-requests">{"<--Back"}</Link>
      </div>
      <div className="userDetails__header">UserDetails</div>
      <section className="userDetails__img">
        <img
          width={232}
          height={232}
          style={{ objectFit: "cover", borderRadius: "10px" }}
          src={user?.avatar?.url}
          alt=""
        />
      </section>
      <section>
        <div className="userDetails__box">
          <hr />
          <div className="userDetails__title">Name</div>
          <div className="userDetails__subtitle">
            {user?.firstName + " " + user?.lastName}
          </div>
          <hr />
        </div>
        <div className="userDetails__box">
          <div className="userDetails__title">Mobile Number</div>
          <div className="userDetails__subtitle">{user?.number}</div>
          <hr />
        </div>
        <div className="userDetails__box">
          <div className="userDetails__title">Student ID</div>
          <div className="userDetails__subtitle">{user?.student_id}</div>
          <hr />
        </div>
        <div className="userDetails__box">
          <div className="userDetails__title">Department</div>
          <div className="userDetails__subtitle">{user?.department}</div>
          <hr />
        </div>
        <div className="userDetails__box">
          <div className="userDetails__title">Batch</div>
          <div className="userDetails__subtitle">{user?.batch}</div>
          <hr />
        </div>
        <div className="userDetails__box">
          <div className="userDetails__title">Graduation Year</div>
          <div className="userDetails__subtitle">{user?.graduation_year}</div>
          <hr />
        </div>
        <div className="userDetails__box">
          <div className="userDetails__title">Blood Group</div>
          <div className="userDetails__subtitle">{user?.blood}</div>
          <hr />
        </div>
        <div className="userDetails__box">
          <div className="userDetails__title">Current Country</div>
          <div className="userDetails__subtitle">{user.country}</div>
          <hr />
        </div>
        <div className="userDetails__box">
          <div className="userDetails__title">Registration ID</div>
          <div className="userDetails__subtitle">{user._id}</div>
          <hr />
        </div>
        <div className="userDetails__box">
          <div className="userDetails__title">Registration Date</div>
          <div className="userDetails__subtitle">{user?.createdAt}</div>
          <hr />
        </div>
      </section>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          onClick={() => {
            approveHandler(user?._id, user?.number);
          }}
          style={{
            background: loader ? "gray" : "#05be71",
            border: "none",
            width: "100%",
            maxWidth: "800px",
            margin: "0 auto",
            textAlign: "center",
            padding: "12px 0",
            marginTop: "2rem",
            color: "#fff",
            borderRadius: "10px",
            cursor: "pointer",
          }}
          disabled={loader ? true : false}
        >
          {loader ? "Loading..." : "Approve"}
        </button>
      </div>
      <div style={{ paddingBottom: "7rem" }} />
    </Container>
  );
};

export default UserDetails;
