import React from "react";
import Container from "../../components/container/Container";
import Footer from "../../components/footer";
import "./__about.scss";

const Contact = () => {
  return (
    <>
      <div className="signInBanner"></div>
      <Container className="testPage">
        <span className="bgWhite mt-280">About</span>
      </Container>
      <Container>
        <div className="about__title">CUET Alumni Network</div>
        <div className="about__subtitle">
          Join the exclusive network of the verified CUET Alumni only
        </div>
        <div className="about__desc">
          Chittagong University of Engineering & Technology (CUET) and its
          predecessor institutions are the most recognized and prestigious
          educational institutions in Bangladesh. CUET is such a well-known
          institution that has maintained a rich heritage and proudly served the
          nation by producing graduate engineers with many accomplishments since
          its inception. Many CUET graduates have marked their footsteps in the
          area of research, science & technology in all parts of the world. A
          large number of CUET graduates are working as professional engineers,
          University teachers, researchers, IT specialists, programmers as well
          as in other professional areas in all major cities around the globe.
        </div>
        <div className="about__desc">
          The CUET alumni have a strong common bond through their prior
          association with CUET. A common forum reflecting the CUET tie and bond
          among themselves is needed and justified. The CUET Alumni Association
          has been formed in 2004 with this in mind. Vision of the Association
          is CUET Alumni Association will be an engaging and mutually beneficial
          lifetime link between Islamic University of Technology and its
          community of alumni. The CUET Alumni Association promotes the
          interests, welfare and educational aims of CUET and its alumni,
          establish and maintain a mutually beneficial relationship between the
          University and its alumni, and encourage lifelong engagement of alumni
          with their fellow alumni and the University community.
        </div>
        <div className="about__desc">
          CUET Alumni Association also promotes and support the student of the
          University in the area of research and education, scholarship and
          projects/events by means of financial and bureaucratic needs. CUET
          Alumni Association always acknowledges the alumni members, faculty,
          and students for their noteworthy achievements. Students and Alumni
          Demographics:
        </div>
        <ul className="about__ul">
          <li className="about__li">
            2000+ undergraduate students and 300+ post graduate students from
            host country and 57 OIC member states
          </li>
          <li className="about__li">Total 5500+ Alumni</li>
          <li className="about__li">2000+ Alumni serving across the world</li>
          <li className="about__li">3000+ Alumni resides in host country</li>
        </ul>
        <div className="about__desc">
          The CUET Alumni Association (CUETAA) represents the interests of CUET
          graduates worldwide. We are committed to keeping our alumni connected,
          get involved and maintain long lasting brotherhood within the alumni
          community.
        </div>
        <div style={{ marginBottom: "7rem" }} className="about__desc">
          Connect with the CUET Alumni Network platform, exclusively for CUET
          Alumni only.
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default Contact;
