import { COLORS } from '../.././constants';
import { Table } from 'antd';

import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
`;

export const SubContainer = styled.div`
  width: 1200px;
`;

export const Title = styled.p`
  text-align: center;
  font-size: 1.5rem;
  background-color: ${COLORS.primary};
  color: white;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
`;

export const LikedMountainImg = styled.img`
  width: 300px;
  height: 250px;
`;

export const StyledTable = styled(Table)`
  width: 100%;
`;
