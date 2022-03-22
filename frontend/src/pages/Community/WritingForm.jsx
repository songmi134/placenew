import React, { useState, useEffect } from 'react';
import { Form, Input, Row, Radio } from 'antd';
import { FormContainer, FormInput, FormButton } from './Community.style';
import axios from 'axios';
import { axiosInstance } from "../../config/axiosConfig";
import moment from 'moment';
import { useHistory, useParams } from 'react-router-dom';

const WritingForm = () => {
  const history = useHistory();
  const params = useParams();
  const postId = params.id;
  const [post, setPost] = useState(undefined);
  const [categories, setCategories] = useState(undefined);
 
  useEffect(() => {
    let completed = false;
    const getMountains = async () => {
      const response = await axiosInstance.get('/categories');
      if (!completed) {
        setCategories(response.data);
      }
    };
    getMountains();
    return () => {
      completed = true;
    };
  }, []);
 

  const onFinish = async values => {
    const newPost = {
      content: values.content,
      cateId: values.cateId,
      title: values.title, 
    };
    console.log(newPost);
    try {
      await axiosInstance.post('/communities', newPost);
      history.push('/pages/community'); // 현재 생성된 포스트의 id를 알아내서 해당 detail 페이지로 이동시키기
    } catch (err) {
      console.log(err);
    }
  };
  
  const handleEdit = async values => {
    try {
      await axiosInstance.patch(
        
      );
      history.push(`/pages/community/${postId}`);
    } catch (err) {
      console.log(err);
    }
  };
  console.log('POST', post);
  return (
    <Row>
      <FormContainer
        onFinish={post ? handleEdit : onFinish}
        fields={[
          { name: ['title'], value: post?.title },
          { name: ['content'], value: post?.content },
          { name: ['cateId'], value: post?.cateId },
        ]}
      >
        <Form.Item
          name="cateId"
          rules={[{ required: true, message: '카테고리를 선택하세요!' }]}
        >
          <Radio.Group buttonStyle="solid">
            {categories ? (
              categories.content.map(v => (
                <Radio.Button key={v.cateId} value={v.cateId}>
                  {v.cateName}
                </Radio.Button>
              ))
            ) : (
              <Row>Loading...</Row>
            )}
          </Radio.Group>
    
    
        </Form.Item>
        <Form.Item
          name="title"
          rules={[{ required: true, message: '제목을 입력하세요!' }]}
        >
          <FormInput placeholder="제목을 입력하세요" />
        </Form.Item>
        <Form.Item
          name="content"
          rules={[{ required: true, message: '내용을 입력하세요!' }]}
        >
          <Input.TextArea
            rows={15}
            placeholder="내용을 입력하세요"
            size="large"
            showCount
            maxLength={1000}
          />
        </Form.Item>
        <Row align="end">
          <Form.Item>
            <FormButton type="primary" size="large" htmlType="submit">
              글쓰기
            </FormButton>
          </Form.Item>
        </Row>
      </FormContainer>
    </Row>
  );
};


export default WritingForm;
