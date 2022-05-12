import styled from 'styled-components';

export const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  
  &::before {
    background-color: hsla(177, 100%, 34%, 0.6);
    border-radius: .5rem;
    box-shadow: 0 .25rem .25rem rgba(0, 0, 0, 0.25);
    content: '';
    mix-blend-mode: soft-light;
      height: 100%;
      position: absolute;
      width: 100%;
    }

  & + div {
    margin-top: 1.5rem;
  }
`;

export const Label = styled.label`
  font-weight: 400;
  padding: .25rem;
`;

export const Select = styled.select`
  background-color: hsla(0, 0%, 95%, .6);
  border: none;
  border-radius: .5rem;
  box-sizing: border-box;
  color: var(--alternate-text);
  padding: .5rem;
  text-align: center;
  text-shadow: none;
  width: 100%;
  z-index: 1;

  &:focus {
    outline: none;
  }

  &::selection {
    background-color: var(--secondary-color);
    color: var(--default-text);
  }
`;