import React, { useEffect, useRef } from "react";
import { Wrapper, Description, Title, Text } from "./About.styles";
import backImg1 from "../../src_assets/picture1.jpg";
import backImg2 from "../../src_assets/picture2.png";
import backImg3 from "../../src_assets/picture3.png";
import { revealText } from "./About.animations";

const About = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    revealText(sectionRef.current, "#about-text");
  }, []);

  return (
    <>
      <Wrapper bgColor="white" id="about" ref={sectionRef}>
        <div style={{ marginBottom: "6rem", width: "100%" }}>
          <Title id="about-text">
            <br />
            <br />
            <br />
            내 주변 산을 검색해보자!
            <br />
            <br />
            <br />
          </Title>
          <Description id="about-text">
            <img src={backImg2} alt="image" />
            <div>
              <Text>
                <strong>하나!</strong>
                <br />
                내가 가고싶은 산 검색
              </Text>
            </div>
          </Description>
          <Description id="about-text">
            <div>
              <Text>
                <strong>둘!</strong>
                <br />
                산에 대한 여러 정보 확인
              </Text>
            </div>
            <img src={backImg1} alt="image" />
          </Description>
          <Description id="about-text">
            <img src={backImg3} alt="image" />
            <div>
              <Text>
                <strong>셋!</strong>
                <br />
                서로의 등산 경험 공유
              </Text>
            </div>
          </Description>
        </div>
      </Wrapper>
    </>
  );
};

export default About;
