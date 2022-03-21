import { COLORS } from '../.././constants';
import styled from 'styled-components';
import { Row, Tag, Form, Input, Button, Table } from 'antd';

export const Title = styled.div`
  font-size: 2rem;
  font-weight: bold;
  padding: 20px;
  text-align: center;
`;

export const Description = styled(Row)`
  border: 1px solid ${COLORS.primary};
  padding: 20px;
  margin: 20px;
  border-radius: 10px;
  line-height: 1.8;
`;

export const Container = styled(Row)`
  width: 700px;
  margin: auto;
  align: center;
  justify: center;
`;

export const MainContainer = styled.div`
  width: 1200px;
  margin: auto;
`;

export const SubContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

export const CateContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 30px;
`;



export const FormContainer = styled(Form)`
  width: 700px;
  margin: auto;
  margin-top: 50px;
`;

export const FormInput = styled(Input)`
  height: 60px;
  font-size: 2rem;
  font-weight: bold;
  margin-top: 20px;
`;

export const FormButton = styled(Button)`
  margin-top: 20px;
`;

export const ColoredCategory = styled(Tag)`
  background-color: ${COLORS.primary};
  color: white;
  border-radius: 10px;
`;

export const CommunityTable = styled(Table)`
  width: 100%;
`;