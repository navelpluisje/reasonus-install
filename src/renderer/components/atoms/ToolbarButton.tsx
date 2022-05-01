import styled from 'styled-components';

interface Props {
  color: 'green' | 'yellow' | 'red';
}

const colors = {
  green: '#62c554',
  red: '#ed6a5f',
  yellow: '#f4bf4f',
};

export const ToolBarButton = styled.button.attrs<Props>({
  type: 'button',
})<Props>`
  border: none;
  background-color: ${({color}) => colors[color]};
  border-radius: 50%;
  height: 12px;
  margin: 0;
  padding: 0;
  width: 12px;

  & + button {
    margin-left: 8px;
  }

  &:disabled {
    background-color: #4f4f50;
  }
`;
