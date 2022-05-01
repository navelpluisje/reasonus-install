import React from 'react';

import { Logo } from '../atoms/Logo';
import { SidebarContainer } from '../atoms/SidebarContainer';
import { SidebarNavigation } from '../molecules/SidebarNavigation';

export const Sidebar = () => {
  return (
    <SidebarContainer>
      <Logo />
      <SidebarNavigation />
    </SidebarContainer>
  );
};
