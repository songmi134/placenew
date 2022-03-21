import React, { useState, useEffect } from 'react';
import { Row, Button, Space, Layout, Modal } from 'antd';
import Comments from '../../components/Comments';
import {
  Title,
  Description,
  Container,
  ColoredCategory,
} from './Community.style';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import DeleteModal from '../../components/DeleteModal';

const Detail = () => {
  const { Footer } = Layout;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [post, setPost] = useState(undefined);

  const params = useParams();
  const postNo = params.id;

  useEffect(() => {
    let completed = false;
    const getMountains = async () => {
      const response = await axios.get(`/communities/${postNo}`);
      if (!completed) {
        const createdAt = moment(response.data.createdAt).format(
          'YYYY.MM.DD HH:mm:ss'
        );
        setPost({ ...response.data, createdAt });
      }
    };
    getMountains();
    return () => {
      completed = true;
    };
  }, []);

  const showDeleteConfirm = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      {post ? (
        <Container>
          <Layout>
            <Row justify="center">
              <Title>{post.title}</Title>
            </Row>
            <Row justify="space-around">
              <ColoredCategory>{post.category}</ColoredCategory>
              <Row>작성일 {post.createdAt}</Row>
              <Row>작성자 {post.user?.name}</Row>
              <Row>조회수 {post.viewCount}</Row>
            </Row>
            <Description>{post.content}</Description>

            <Row justify="end">
              <Space>
                <Button type="primary">
                  <Link
                    to={{
                      pathname: `/community/update/${postNo}`,
                      state: {
                        postNo: post.commupostNo,
                        title: post.title,
                        category: post.category,
                        content: post.content,
                      },
                    }}
                  >
                    수정
                  </Link>
                </Button>
                <Button type="primary" onClick={showDeleteConfirm}>
                  삭제
                </Button>
              </Space>
            </Row>
            <Footer>
              <Comments />
            </Footer>
          </Layout>
        </Container>
      ) : (
        <Row>로딩중...</Row>
      )}
      <DeleteModal
        visible={isModalVisible}
        onCancle={handleCancel}
        postNo={postNo}
        title="글"
        url={`/communities/${postNo}`}
      />
    </>
  );
};

export default Detail;