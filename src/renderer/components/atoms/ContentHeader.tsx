import styled from 'styled-components';

interface Props {
  center?: boolean
}

export const ContentHeader = styled.header<Props>`
  color: white;
  font-size: 1.5rem;
  text-align: ${({center}) => (center ? 'center' : 'left')};
`;
