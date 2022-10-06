import React from "react";
import Icon1 from "../../../assets/img/TSC.JPG";
import Icon2 from "../../../assets/img/TSC.JPG";
import Icon3 from "../../../assets/img/TSC.JPG";
import {
  ServicesContainer,
  ServicesH1,
  ServicesWrapper,
  ServicesCard,
  ServicesIcon,
  ServicesH2,
  ServicesP,
} from "./ServicesElements";

const Services = () => {
  return (
    <ServicesContainer id="services">
      <ServicesH1>Gallary</ServicesH1>
      <ServicesWrapper>
        <ServicesCard>
          <ServicesIcon src={Icon1} />
          <ServicesH2>Scholarship</ServicesH2>
          <ServicesP>
            De create building thinking about your requirment and latest treand
            on our marketplace area
          </ServicesP>
        </ServicesCard>

        <ServicesCard>
          <ServicesIcon src={Icon2} />
          <ServicesH2>Help Current Students</ServicesH2>
          <ServicesP>
            De create building thinking about your requirment and latest treand
            on our marketplace area
          </ServicesP>
        </ServicesCard>

        <ServicesCard>
          <ServicesIcon src={Icon3} />
          <ServicesH2>Build Our Community</ServicesH2>
          <ServicesP>
            De create building thinking about your requirment and latest treand
            on our marketplace area
          </ServicesP>
        </ServicesCard>
      </ServicesWrapper>
    </ServicesContainer>
  );
};

export default Services;
