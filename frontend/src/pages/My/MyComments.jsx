import React, { useState, useEffect, useContext } from "react";
import { Button, Popconfirm } from "antd";
import { Title, Container, SubContainer, StyledTable } from "./My.style";
import axios from "axios";
import { axiosInstance } from "../../config/axiosConfig";
import { UserContext } from "../../components/login/AuthProvider";

const MyComments = () => {
  const [comments, setComments] = useState(undefined);
  const [commentCount, setCommentCount] = useState(0);
  const { user } = useContext(UserContext);

  useEffect(() => {
    let completed = false;
    const getcomments = async () => {
      const response = await axiosInstance.get(
        "/mountains/comments/" + user.data.id
      );
      if (!completed) {
        console.log(response.data.content);
        setComments(response.data.content);
        setCommentCount(response.data.numberOfElements);
      }
    };
    getcomments();
    return () => {
      completed = true;
    };
  }, []);

  const columns = [
    { title: "내용", dataIndex: "commentContent" },
    { title: "작성일", dataIndex: "updateAt" },
    {
      title: "삭제",
      dataIndex: "delete",
      render: (_, record) => (
        <Popconfirm
          title="댓글을 삭제하시겠습니까?"
          onConfirm={() => handleDelete(record.id)}
        >
          <Button>삭제</Button>
        </Popconfirm>
      ),
    },
  ];

  const handleDelete = async (id) => {
    console.log(id);
    try {
      await axios.delete(`/me/comments?id=${id}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Title>내가 작성한 댓글 {commentCount}개</Title>
      <Container>
        <SubContainer>
          <StyledTable
            columns={columns}
            dataSource={comments}
            pagination={false}
          ></StyledTable>
        </SubContainer>
      </Container>
    </>
  );
};

export default MyComments;
