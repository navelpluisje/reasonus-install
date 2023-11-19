import styled from 'styled-components';

import { Button } from './Button';


export const ButtonBar = styled.section`
  margin-top: 1rem;

  ${Button} + ${Button} {
    margin-left: 1rem
  }
`;
