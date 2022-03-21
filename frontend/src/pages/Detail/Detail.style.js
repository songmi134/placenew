import styled from "styled-components";
import { Row, Form } from "antd";

export const Showcase = styled.div`
  position: flex;
  margin-top: 5%;
  margin-left: 30%;

  h2 {
    margin-top: 20px;
    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 22px;
  }
  hr {
    border: 1px solid #d9d9d9;
    margin-top: 40px;
    margin-bottom: 40px;
  }
`;

export const Title = styled.div`
  font-family: Work Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 34px;
  line-height: 40px;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Description = styled(Row)`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 22px;
`;

export const Writing = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 22px;
  padding-left: 10px;
  padding-right: 10px;
`;

export const ImgS = styled.img`
  width: 40px;
  height: 40px;
`;

export const ImgM = styled.img`
  border-radius: 10px;
  width: 32px;
  height: 32px;
`;

export const ImgL = styled.img`
  margin-top: 20px;
  width: 600px;
  height: 270.01px;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 600px;
`;

export const FormContainer = styled(Form)`
  display: flex;
  flex-direction: row;
  width: 600px;
`;

export const List = styled.div`
  width: 600px;
`;
