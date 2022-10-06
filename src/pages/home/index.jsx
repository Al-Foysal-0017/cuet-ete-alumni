import React from "react";
import ImageSlider from "../../components/carousel/ImageSlider";
import { SliderData } from "../../components/carousel/SliderData";
import Container from "../../components/container/Container";
import GallaryHome from "../../layout/home/gallary";
import StoriesHome from "../../layout/home/stories";
import Engage from "../../layout/home/engage";
import "./__home.scss";
import Mission from "../../layout/home/mission";
import Upcomming from "../../layout/home/upcomming";
import Performance from "../../layout/home/performance";
import RecentJobs from "../../layout/home/recentAlumni";
import Footer from "../../components/footer";
import { useSelector } from "react-redux";
import Loader from "../../components/Loader/Loader";

const Home = () => {
  const { loading } = useSelector((state) => state.user);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {" "}
          <Container>
            <div className="mt1rem" />
            <ImageSlider slides={SliderData} />
            <div style={{ marginTop: "7rem" }} />
            <StoriesHome />
          </Container>
          <div style={{ marginTop: "7rem" }} />
          <Upcomming />
          <Performance />
          <Container>
            <div style={{ marginTop: "7rem" }} />
            <Mission />
          </Container>
          <Container>
            <div style={{ marginTop: "7rem" }} />
            <Engage />
            <div style={{ marginTop: "7rem" }} />
          </Container>
          <GallaryHome />
          <RecentJobs />
          <Footer />
        </>
      )}
    </>
  );
};

export default Home;
