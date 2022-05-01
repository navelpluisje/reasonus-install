import React from 'react';

import { LinkButton } from '../atoms/LinkButton';

interface Props {
  children: string;
  to: string;
}


export const ExternalLink: React.FC<Props> = ({children, to}) => {
  const handleClick = () => {
    window.reasonusAPI.goToExternal(to);
  };

  return (
    <LinkButton onClick={handleClick}>{children}</LinkButton>
  );
};