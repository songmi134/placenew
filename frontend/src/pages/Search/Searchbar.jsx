import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Slider, Row, Form, Select, Button, Space, Col, Tag } from 'antd';
import { sido, sigungu } from './AddressData'
import { FormContainer, MountainHeight } from './Search.style';

const Searchbar = () => {
  const [height, setHeight] = useState(10);

  const { Option } = Select;

  const onChange = v => {
    setHeight(v);
  };

  const marks = {
    100: '100m',
    500: '500m',
    1000: '1000m',
    1500: '1500m',
    2000: 'ALL',
  };

  const [address1, setAddress1] = useState(null);
  const [address2, setAddress2] = useState(null);

  const changeAddress1 = value => {
    setAddress1(value);
    setAddress2(null);
  };

  const changeAddress2 = value => {
    setAddress2(value);
  };
 
  return (
    <FormContainer>
    <Row justify="center" align="center">
      <Col xs={24} xl={8}>
        <Row justify="center" align="center">
          <Form.Item>
            <Select
              placeholder="시/도"
              onChange={changeAddress1}
              value={address1}
              style={{ width: '130px' }}
            >
              {sido.map(s => (
                <Option key={s} value={s}>
                  {s}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Select
              placeholder="시/군/구"
              onChange={changeAddress2}
              value={address2}
            >
              {address1 ? (
                sigungu[address1].sort().map(s => (
                  <Option key={s} value={s}>
                    {s}
                  </Option>
                ))
              ) : (
                <></>
              )}
            </Select>
          </Form.Item>
        </Row>
        </Col>
        <Col xs={24} xl={15}>
          <MountainHeight>산 높이</MountainHeight>
          <Row justify="space-around" align="center">
            <Form.Item>
              <Slider
                min={100}
                max={2000}
                onChange={onChange}
                value={typeof height === 'number' ? height : 0}
                step={50}
                marks={marks}
                style={{ width: '300px' }}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary">검색</Button>
            </Form.Item>
          </Row>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default Searchbar;