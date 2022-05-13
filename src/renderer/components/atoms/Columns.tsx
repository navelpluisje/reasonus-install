import styled from 'styled-components';

interface Props {
  columns?: number;
}

export const Columns = styled.section<Props>`
  display: grid;
  grid-template-columns: repeat(${({columns = 2}) => columns}, 1fr);
  gap: 1rem;
  margin: 3rem 0 1rem;

`;