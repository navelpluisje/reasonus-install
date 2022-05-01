import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const NavItemWrapper = styled.li`
  list-style: none;
  margin: .5rem 0;
  padding: 0;

  a {
    align-items: center;
    display: grid;
    font-size: 1.25rem;
    font-weight: 300;
    gap: 1rem;
    grid-template-columns: 1.75rem 1fr;
    padding: .5rem;
    position: relative;
    text-decoration: none;

    &:hover, &.active {
      &::before {
        background-color: hsla(177, 100%, 34%, 0.6);
        border-radius: .5rem;
        box-shadow: 0 .25rem .25rem rgba(0, 0, 0, 0.25);
        content: '';
        height: 100%;
        mix-blend-mode: soft-light;
        position: absolute;
        width: 100%;
      }

    }
  }
`;

interface Props {
  to: string;
  image: string;
  children: string;
}

export const NavItem: React.FC<Props> = ({to, children, image}) => (
  <NavItemWrapper>
    <NavLink to={to}>
      <img src={image} alt="" />
      {children}
    </NavLink>
  </NavItemWrapper>
);
