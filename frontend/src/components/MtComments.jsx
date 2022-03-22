import React, { useState, useEffect } from "react";
import {
  Comment,
  Avatar,
  Form,
  Button,
  List,
  Input,
  Modal,
  Tooltip,
} from "antd";
import moment from "moment";
import { axiosInstance } from "../config/axiosConfig";
import { useParams } from "react-router-dom";
import DeleteModal from "./DeleteModal";

const CommentList = ({ comments }) => {
  const [form] = Form.useForm();
  const params = useParams();
  const postNo = params.id;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [comment, setComment] = useState(undefined);

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsEditModalVisible(false);
  };

  const showEditModal = (comment) => {
    setComment(comment);
    setIsEditModalVisible(true);
  };

  const showDeleteConfirm = async (comment) => {
    setComment(comment);
    setIsModalVisible(true);

    try {
      await axiosInstance.delete(
        `/mountains/${postNo}/comments/${comment.commentNo}`
      );
      setIsModalVisible(false);
      setIsEditModalVisible(false);
    } catch (err) {
      console.log(err);
    }
  };

  const editComment = async (updatedComment) => {
    try {
      const newComment = {
        content: updatedComment,
      };

      await axiosInstance.patch(
        `/mountains/${postNo}/comments/${comment.commentNo}`,
        newComment
      );
      setIsModalVisible(false);
      setIsEditModalVisible(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (values) => {
    editComment(values);
    setIsModalVisible(false);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        handleEdit(values.comment);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <List
        dataSource={comments}
        header={`${comments.length} ${
          comments.length > 1 ? "replies" : "reply"
        }`}
        itemLayout="horizontal"
        renderItem={(props) => (
          <Comment
            actions={[
              <Button
                type="dashed"
                size="small"
                onClick={() => {
                  showEditModal(props);
                }}
              >
                Edit
              </Button>,
              <Button
                type="dashed"
                size="small"
                onClick={() => {
                  showDeleteConfirm(props);
                }}
              >
                Delete
              </Button>,
            ]}
            author={props.user.name}
            content={props.commentContent}
            avatar={props.user.imgUrl}
          />
        )}
      />
      <Modal
        visible={isEditModalVisible}
        onCancel={handleCancel}
        centered
        title="댓글 수정"
        onOk={handleOk}
      >
        <Form
          form={form}
          fields={[{ name: ["comment"], value: comment?.commentContent }]}
        >
          <Form.Item
            name="comment"
            rules={[{ required: true, message: "내용을 입력하세요!" }]}
          >
            <Input.TextArea showCount />
          </Form.Item>
        </Form>
      </Modal>

      <DeleteModal
        visible={isModalVisible}
        onCancle={handleCancel}
        title="댓글"
        url={`/mountains/${postNo}/comments/${comment?.commentNo}`}
      />
    </>
  );
};

const Editor = ({ onChange, onSubmit, submitting, value }) => {
  const { TextArea } = Input;
  return (
    <>
      <Form.Item>
        <TextArea rows={4} onChange={onChange} value={value} />
      </Form.Item>
      <Form.Item>
        <Button
          htmlType="submit"
          loading={submitting}
          onClick={onSubmit}
          type="primary"
        >
          댓글 달기
        </Button>
      </Form.Item>
    </>
  );
};

const MtComments = () => {
  const [comments, setComments] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState("");
  const params = useParams();
  const postNo = params.id;

  useEffect(() => {
    let completed = false;

    const getComments = async () => {
      const response = await axiosInstance.get(`/mountains/${postNo}/comments`);
      if (!completed) {
        setComments(response.data.content);
      }
    };
    getComments();

    return () => {
      completed = true;
    };
  }, [comments]);

  const handleSubmit = async () => {
    if (!value) return;
    setSubmitting(true);

    // 렌더링 될 수 있도록 로그인 붙인 후 수정
    try {
      setSubmitting(false);
      setValue("");
      const newComment = {
        content: value,
      };
      console.log(newComment); // For check
      await axiosInstance.post(`/mountains/${postNo}/comments`, newComment);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => setValue(e.target.value);

  return (
    <>
      {comments.length > 0 && <CommentList comments={comments} />}
      <Comment
        avatar={
          <Avatar src="https://joeschmoe.io/api/v1/random" alt="avatar" />
        }
        content={
          <Editor
            onChange={handleChange}
            onSubmit={handleSubmit}
            submitting={submitting}
            value={value}
          />
        }
      />
    </>
  );
};

export default MtComments;
