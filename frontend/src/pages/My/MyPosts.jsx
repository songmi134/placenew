import React, { useState, useEffect, useContext } from "react";
import { Title, Container, SubContainer, StyledTable } from "./My.style";
import { Link } from "react-router-dom";
import axios from "axios";
import { axiosInstance } from "../../config/axiosConfig";
import { UserContext } from "../../components/login/AuthProvider";

const MyPosts = () => {
  const [allPosts, setAllPosts] = useState(undefined);
  const [postCount, setPostCount] = useState(0);
  const { user } = useContext(UserContext);

  useEffect(() => {
    console.log(user);
    let completed = false;
    const getMountains = async () => {
      const response = await axiosInstance.get(
        "/communities/user/" + user.data.id
      );
      if (!completed) {
        setAllPosts(response.data);
        setPostCount(response.data.numberOfElements);
      }
    };
    getMountains();
    return () => {
      completed = true;
    };
  }, []);

  const columns = [
    { title: "No", dataIndex: "commupostNo" },
    {
      title: "제목",
      dataIndex: "title"
    },
    {
      title: "작성일",
      dataIndex: "updatedAt"
      },
    },
    {
      title: "조회수",
      dataIndex: "viewCount"
    },
  ];
  return (
    <>
      <Title>내가 작성한 글 {postCount}개</Title>
      <Container>
        <SubContainer>
          <StyledTable
            columns={columns}
            dataSource={allPosts}
            pagination={false}
          ></StyledTable>
        </SubContainer>
      </Container>
    </>
  );
};

export default MyPosts;
