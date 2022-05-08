import React from 'react';
import styled from 'styled-components';

import { ClipboardButton } from '../atoms/ClipboardButton';
import { Pre } from '../atoms/Pre';

const PreBlock = styled(Pre)`
  ${ClipboardButton} {
    position: absolute;
    top: 1rem;
    right: 1rem;
  }
`;

interface Props {
  children: string;
}

export const CodeBlock: React.FC<Props> = ({children}) => {
  const handleCopy = () => {
    window.reasonusAPI.copyToClipboard(children);
  };

  return (
    <PreBlock>
      <code>
        {children}
        <ClipboardButton onClick={handleCopy}/>
      </code>
    </PreBlock>
  );
};