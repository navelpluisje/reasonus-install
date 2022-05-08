import styled from 'styled-components';

import clipboardIcon from '../../assets/images/clipboard-icon.svg';

export const ClipboardButton = styled.button.attrs({
  title: 'Copy to clipboard',
})`
  background-color: transparent;
  background-image: url('${clipboardIcon}');
  background-repeat: no-repeat;
  background-position: center;
  border: 1px solid white;
  border-radius: .25rem;
  color: var(--default-text);
  font-size: 1rem;
  height: 2rem;
  padding: 0;
  position: relative;
  width: 2rem;
  
  > img {
    border-radius: 0;
    margin: 0;
    width: 2rem;
  }

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
