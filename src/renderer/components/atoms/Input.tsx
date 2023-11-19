import styled from 'styled-components';

interface Props {
  large?: boolean;
}

export const Input = styled.input<Props>`
  background-color: hsla(177, 100%, 34%, 0.6);
  border: 1px solid white;
  border-radius: .5rem;
  box-shadow: 0 .25rem .25rem rgba(0, 0, 0, 0.125);
  color: var(--default-text);
  font-weight: 400;  
  padding: .5rem 1rem;
  position: relative;
  width: ${({large}) => (large ? 'calc(100% - 2rem)' : 'auto')};

  &::placeholder {
    color: rgba(255, 255, 255, .75);
  }
  + button {
    margin-left: 1rem;
  }
`;