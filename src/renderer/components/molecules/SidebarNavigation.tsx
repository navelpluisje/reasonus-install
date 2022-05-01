import React from 'react';

import aboutIcon from '../../assets/images/about-icon.svg';
import functionsIcon from '../../assets/images/functions-icon.svg';
import homeIcon from '../../assets/images/home-icon.svg';
import prepareIcon from '../../assets/images/prepare-icon.svg';
import { Navigation } from '../atoms/Navigation';
import { NavItem } from '../atoms/NavItem';

export const SidebarNavigation = () => {
  return (
    <nav>
      <Navigation>
        <NavItem to="/home" image={homeIcon}>Home</NavItem>
        <NavItem to="/install" image={prepareIcon}>Install</NavItem>
        <NavItem to="/functions" image={functionsIcon}>Fuctions</NavItem>
        <NavItem to="/about" image={aboutIcon}>About</NavItem>
      </Navigation>
    </nav>
  );
};
