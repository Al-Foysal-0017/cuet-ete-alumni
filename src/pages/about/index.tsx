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
        <div className="about__title">CUET ETE Alumni Network</div>
        <div className="about__subtitle">
          Join the exclusive network of the verified CUET ETE Alumni only
        </div>
        <div className="about__desc">
          Today, we are at the peak of the information technology age, and
          communication engineering plays a vital role in today's rapidly
          changing world. In this prospect, CUET has launched Department of
          Electronics and Telecommunication Engineering (ETE) in the year 2012.
          The vision of this department is to make great contribution by
          producing efficient and resourceful engineers with research and
          development capabilities.
        </div>
        <div className="about__desc">
          The ETE Department has well qualified and experienced faculty members
          with areas of specialization that include Embedded Systems, Applied
          Electronics and VLSI design. The department has taken step to collect
          technologically advanced equipment and to build enriched laboratories.
          Students will be given vast amount of practical exposure through the
          use of innovative methodologies in the design and development of
          electronics, which is the backbone for all engineering disciplines.
        </div>
        <div className="about__desc">
          The Department of ETE offers a comprehensive range of rigorous,
          innovative programs .The undergraduate curriculum of Electronics and
          Telecommunication Engineering: is designed to give students a sound
          knowledge of Engineering fundamentals, strong physical sciences
          background and adequate practical training so that they will be ready
          to quickly achieve competence in treating current technical problems
          as well as those that will come with the rapidly changing technologies
          of the year-to-come. The Electronic and Telecommunication Engineering
          program prepares students for careers in such areas of electronics,
          computer, communication etc.
        </div>
        <div className="about__desc">
          The aim of the undergraduate program of the Department of Electronics
          and Telecommunication Engineering (ETE) is to provide the students
          with a technical and engineering background and scientific research
          capabilities in the design and development and production of
          electronic devices, circuits and systems used in a wide spectrum of
          applications ranging from home appliances to the most sophisticated
          satellite communications.
        </div>
        {/* <ul className="about__ul">
          <li className="about__li">
            2000+ undergraduate students and 300+ post graduate students from
            host country and 57 OIC member states
          </li>
          <li className="about__li">Total 5500+ Alumni</li>
          <li className="about__li">2000+ Alumni serving across the world</li>
          <li className="about__li">3000+ Alumni resides in host country</li>
        </ul> */}
        <div className="about__desc">
          The CUET ETE Alumni Association represents the interests of CUET ETE
          graduates worldwide. We are committed to keeping our alumni connected,
          get involved and maintain long lasting brotherhood within the alumni
          community.
        </div>
        <div style={{ marginBottom: "7rem" }} className="about__desc">
          Connect with the CUET ETE Alumni Network platform, exclusively for
          CUET ETE Alumni only.
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default Contact;
