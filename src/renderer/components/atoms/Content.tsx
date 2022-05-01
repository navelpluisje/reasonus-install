import styled from 'styled-components';

export const Content = styled.main`
  border-radius: .5rem;
  margin: 1rem;
  padding: 1rem;
  position: relative;
  
  display: grid;
  grid-template-rows: 2.5rem 1fr;
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

  
  img {
    border-radius: .5rem;
    filter: drop-shadow(0 .25rem .25rem rgba(0, 0, 0, 0.25));
    max-width: 50%;
  }
`;
