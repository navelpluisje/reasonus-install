import { createGlobalStyle } from 'styled-components';

import background from '../assets/images/background.svg';
import {fonts} from './fonts';

export const GlobalStyle = createGlobalStyle`
  ${fonts};

  :root {
    --default-text: #fff;
    --alternate-text: #333;
    --primary-color: #00529C;
    --secondary-color: #00ADA4;
  }

  body {
    background-image: url('${background}');
    background-position: center;
    background-size: cover;
    font-weight: 300;
    height: 100vh;
    margin: 0;
    padding: 0;
    background-color: var(--secondary-color);
  }

  * {
    color: var(--default-text);
    font-size: 1rem;
    line-height: 1.4;
    text-shadow: 0 .25rem .25rem rgba(0, 0, 0, 0.25);
    
    &:not(code) {
      font-family: 'Lato', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    }
  }

  h2 {
    font-size: 1.5rem;
    font-weight: 300;
  }

 #app {
   height: 100%;
   width: 100%;
 }

`;