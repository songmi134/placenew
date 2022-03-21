import { Slider, Row, Form, Select, Button, Tag } from 'antd';
import styled from 'styled-components';
import { COLORS } from '../.././constants';

export const FormContainer = styled(Form)`
  padding: 30px 10px 0 10px;
  margin-top: 30px;
  border: 2px solid ${COLORS.primary};
`;

export const MountainHeight = styled(Tag)`
  background-color: ${COLORS.primary};
  color: white;
  border-radius: 10px;
  margin: 0.5em;
`;

export const MountainName = styled.a`
  font-weight: bold;
  font-size: 1.3em;
`;