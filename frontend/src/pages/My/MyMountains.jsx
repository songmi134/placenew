import React, { useState, useEffect } from "react";
import { Title, Container, GridContainer, LikedMountainImg } from "./My.style";
import { Row } from "antd";
import axios from "axios";
import { axiosInstance } from "../../config/axiosConfig";

const MyMountains = () => {
  const [mountainCount, setMountainCount] = useState(0);
  const [mountains, setMountains] = useState(undefined);

  useEffect(() => {
    let completed = false;
    const getMountains = async () => {
      const response = await axiosInstance.get("/likes/me/mountains");
      if (!completed) {
        console.log(response.data.content);
        setMountains(response.data.content);
        setMountainCount(response.data.numberOfElements);
      }
    };
    getMountains();
    return () => {
      completed = true;
    };
  }, []);

  return (
    <>
      <Title>내가 찜한 산 {mountainCount}개</Title>
      <Container>
        <GridContainer>
          {mountains ? (
            mountains.map((v) => (
              <LikedMountainImg src={v.mountain.orgUrl} alt="mountains" />
            ))
          ) : (
            <Row>찜한 산이 없습니다.</Row>
          )}
        </GridContainer>
      </Container>
    </>
  );
};

export default MyMountains;
