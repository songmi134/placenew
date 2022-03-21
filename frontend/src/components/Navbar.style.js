import styled from 'styled-components';
import { COLORS } from '.././constants';
import { Avatar } from 'antd';

export const Nav = styled.div`
  padding: 10px;
  font-size: 18px;
  font-weight: bold;
`;

export const Logo = styled.img`
  width: 50px;
`;

export const AvatarWrapper = styled(Avatar)`
  background-color: ${COLORS.primary};
`;
