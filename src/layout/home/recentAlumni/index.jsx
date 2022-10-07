import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BigButton from "../../../components/bigButton";
import Container from "../../../components/container/Container";
import Subtitle from "../../../components/subtitle";
import Title from "../../../components/title";
import "./__recentJobHome.scss";

const RecentJobs = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/users/three/request`
        );
        setUsers(data?.users);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="recentJobHome">
      <Container>
        <Title className="recentJobHome__title">Recent Joined Alumni</Title>
        <Subtitle>Explore Profile and Activities of new Alumni.</Subtitle>
        {!loading ? (
          <div className="recentJobHome__cards">
            {users?.map((item, index) => (
              <div key={index} className="recentJobHome__cards__item">
                <Link to={`/user/details/${item._id}`}>
                  <div>
                    <img
                      className="recentJobHome__cards__img"
                      width={124}
                      height={124}
                      src={item?.avatar?.url}
                      alt=""
                    />
                  </div>
                </Link>

                <Link to={`/user/details/${item._id}`}>
                  <div className="recentJobHome__cards__itemtxtContainer">
                    <div className="recentJobHome__cards__item__title">
                      {item?.firstName} {item?.lastName}
                    </div>
                    <div className="recentJobHome__cards__item__details">
                      {item?.student_id}
                    </div>
                    <div className="recentJobHome__cards__item__details">
                      {item?.graduation_year}
                    </div>
                    <div className="recentJobHome__cards__item__details">
                      {item?.country}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="textLoader-home-stories-container">
            <div className="textLoader-home-stories" />
            <div className="textLoader-home-stories" />
            <div className="textLoader-home-stories" />
          </div>
        )}
        <BigButton link="/alumni" name="Explore More Alumni" center />
      </Container>
    </div>
  );
};

export default RecentJobs;
