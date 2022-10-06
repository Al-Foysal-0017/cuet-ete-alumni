import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BigButton from "../../../components/bigButton";
import Subtitle from "../../../components/subtitle";
import Title from "../../../components/title";
import "./__storiesHome.scss";

const StoriesHome = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/story/three/request`
        );
        setStories(data?.stories);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="storiesHome">
      <Title>Stories</Title>
      <Subtitle>
        Explore news, views and perspectives from CUET and your alumni
        community.
      </Subtitle>
      <div className="storiesHome__cards">
        {loading ? (
          <div className="textLoader-home-stories-container">
            <div className="textLoader-home-stories" />
            <div className="textLoader-home-stories" />
            <div className="textLoader-home-stories" />
          </div>
        ) : (
          stories?.map((item, index) => (
            <div key={index} className="storiesHome__cards__item">
              <Link to={`/story/details/${item._id}`}>
                <img
                  className="storiesHome__cards__item__img"
                  src={item.img}
                  alt=""
                />
              </Link>

              <Link to={`/story/details/${item._id}`}>
                <div className="storiesHome__cards__item__txtContainer">
                  <div className="storiesHome__cards__item__title">
                    {item.title}
                  </div>
                  <div className="storiesHome__cards__item__subtitle">
                    {item.organized_by}
                  </div>
                  <div className="storiesHome__cards__item__desc">
                    {item.desc.split("", 120)} .......
                  </div>
                </div>
              </Link>
            </div>
          ))
        )}
      </div>
      <BigButton link="/stories" name="Explore More Stories" center />
    </div>
  );
};

export default StoriesHome;
