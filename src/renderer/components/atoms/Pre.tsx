import styled from 'styled-components';

export const Pre = styled.pre`
  border-radius: .5rem;
  margin: .5rem 0;
  padding: 1rem;
  position: relative;

  &::before {
    background-color: hsla(177, 100%, 34%, 0.6);
    border-radius: .5rem;
    box-shadow: 0 .25rem .25rem rgba(0, 0, 0, 0.25);
    content: '';
    height: 100%;
    mix-blend-mode: soft-light;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }

`;