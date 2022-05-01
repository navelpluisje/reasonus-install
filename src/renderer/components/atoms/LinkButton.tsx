import styled from 'styled-components';

export const LinkButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 300;
  margin: 0;
  padding: 0;
  position: relative;

  &::after {
    position: absolute;
    content: '';
    width: 0;
    height: 100%;
    bottom: 0;
    left: 0;
    border-bottom: 1px solid white;
    transition: width .3s ease;
  }

  &:hover {
    &::after {
      width: 100%;
    }
  }
`;