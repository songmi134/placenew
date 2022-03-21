import React, { useState, useEffect } from "react";
import heart1 from "../../src_assets/heart3.png";
import heart2 from "../../src_assets/heart2.png";
import axios from "axios";
import { axiosInstance } from "../../config/axiosConfig";
import { useParams } from "react-router-dom";
import { Header, Title, Description, ImgL, ImgS } from "./Detail.style";

const Mountaininfo = () => {
  const [mountainName, setMountainName] = useState(undefined); //산이름
  const [mountainInfo, setMountainInfo] = useState(undefined); //산정보
  const [transInfo, setTransInfo] = useState(undefined); //교통정보
  const [imgUrl, setImgUrl] = useState(undefined); //이미지
  const [likeYn, setLikeYn] = useState(0); //좋아요

  const params = useParams();
  const postId = params.id;

  // 임시 데이터
  useEffect(() => {
    let completed = false;
    // 산 상세정보
    const getMountains = async () => {
      const response = await axios.get(`/mountains/${postId}`);

      if (!completed) {
        setMountainName(response.data.mountainName);
        setMountainInfo(response.data.mountainInfo);
        setTransInfo(response.data.transInfo);
        setImgUrl(response.data.orgUrl);
      }
    };
    // 내가 찜한산
    const getMountainLike = async () => {
      const response2 = await axiosInstance.get(`/likes/me/mountains`);
      const vnt = response2.data.content;

      const filterLike = vnt.filter(
        (post) => post.mountain.mountainNo == postId
      );

      console.log(filterLike.length);
      if (filterLike.length > 0) {
        document.getElementById("imgS").src = heart1;
        setLikeYn(1);
      } else {
        document.getElementById("imgS").src = heart2;
        setLikeYn(0);
      }
    };
    getMountains();
    getMountainLike();
    return () => {
      completed = true;
    };
  }, []);

  const imgChange = async () => {
    if (likeYn === 0) {
      const newPost = {
        mountainNo: postId,
      };
      try {
        await axiosInstance.post(`/likes/me/mountains`, newPost);
        document.getElementById("imgS").src = heart1;
        setLikeYn(1);
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        await axiosInstance.delete(`/likes/me/mountains/${postId}`);
        document.getElementById("imgS").src = heart2;
        setLikeYn(0);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      <Header>
        <Title>{mountainName}</Title>
        <ImgS id="imgS" alt="empty" src={heart1} onClick={imgChange} />
      </Header>
      <ImgL alt="empty" src={imgUrl} />
      <h2>설명</h2>
      <Description>{mountainInfo}</Description>
      <h2>교통정보</h2>
      <Description>{transInfo}</Description>
    </>
  );
};

export default Mountaininfo;
