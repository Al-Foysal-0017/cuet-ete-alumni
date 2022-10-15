import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Container from "../../components/container/Container";
import Footer from "../../components/footer";
import "./__community.scss";
import bdImg from "../../assets/flag/bd.svg";
import auImg from "../../assets/flag/au.svg";
import deImg from "../../assets/flag/de.svg";
import krImg from "../../assets/flag/kr.svg";
import usImg from "../../assets/flag/us.svg";
import { getAllUsers } from "../../store/actions/userAction";
import { useDispatch } from "react-redux";

const Community = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);
  return (
    <>
      <div className="signUpBanner"></div>
      <Container className="testPage">
        <span className="bgWhite mt-280">Community</span>
      </Container>
      <Container className="communityCardContainer">
        <Link to="/community/details" state={{ country: "Australia" }}>
          <img className="communityCard" src={auImg} alt="" />
        </Link>
        <Link to="/community/details" state={{ country: "Bangladesh" }}>
          <img className="communityCard" src={bdImg} alt="" />
        </Link>
        <Link to="/community/details" state={{ country: "Korea" }}>
          <img className="communityCard" src={krImg} alt="" />
        </Link>
        <Link to="/community/details" state={{ country: "Germany" }}>
          <img className="communityCard" src={deImg} alt="" />
        </Link>
        <Link to="/community/details" state={{ country: "USA" }}>
          <img className="communityCard" src={usImg} alt="" />
        </Link>
      </Container>
      <Footer />
    </>
  );
};

export default Community;
