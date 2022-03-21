import React from 'react';
import { Modal } from 'antd';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const DeleteModal = ({ visible, onCancle, url, title, postNo }) => {
  const history = useHistory();

  const handleDelete = async () => {
    console.log('deleted');
    try {
      await axios.delete(url);
      if (postNo) {
        history.push('/community');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal
      visible={visible}
      onCancel={onCancle}
      centered
      title={`이 ${title}을 정말 삭제하시겠습니까?`}
      onOk={handleDelete}
    >
      <p>{`삭제한 ${title}은 복구할 수 없습니다.`}</p>
    </Modal>
  );
};

export default DeleteModal;
