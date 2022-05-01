import React from 'react';
import styled from 'styled-components';

interface Props {
  title: string
}

export const SidebarGroup = styled.dl.attrs<Props>(({title, children}) => ({
  children: (
    <>
      <dt>{title}</dt>
      {children}
    </>
  ),
}))<Props>`
  padding: 0 16px;

  dt {
    font-size: 10px;
    font-weight: 600;
    color: #999;
  }
  dd {
    color: white;
    font-size: 12px;
    margin-left: 16px;
    margin-top: 8px;
  }
`;
