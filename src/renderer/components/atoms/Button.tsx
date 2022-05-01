import styled from 'styled-components';


export const Button = styled.button`
  background-color: transparent;
  border: 1px solid white;
  border-radius: .5rem;
  color: var(--default-text);
  font-size: 1rem;
  padding: .5rem 1rem;
  position: relative;

  &::after {
    background-color: hsla(177, 100%, 34%, 0.6);
    border-radius: .5rem;
    box-shadow: 0 .25rem .25rem rgba(0, 0, 0, 0.25);
    content: '';
    height: 100%;
    left: 0;
    mix-blend-mode: soft-light;
    position: absolute;
    top: 0;
    width: 100%;
  }

  &:disabled {
    opacity: 0.5;
  }
`;
