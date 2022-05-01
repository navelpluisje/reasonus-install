import React from 'react';

import { ContentHeader } from '../components/atoms/ContentHeader';
import { ExternalLink } from '../components/molecules/ExternalLink';

export const About: React.FC = () => (
  <>
    <ContentHeader>About</ContentHeader>
    <div>
      <p>ReaSonus FaderPort is created to make the use of your FaderPort with Reaper as easy as possible. 
        It is build on top of CSI, a tool for connecting controllers to REAPER with a huge flexibility.</p>
      <p>Therefor a big thank you goes out to Geoff Waddington and the CSI community</p>
      <p>I work on ReaSonus in my spare time and is Open Source, so if you want to, feel free to add code.</p>
      <p>You may also donate if you appreciate this project. 
        Because I make an extensive use of CSI, half of the donations will go to Geoff.</p>
      <h2>Links</h2>
      <ul>
        <li><ExternalLink to="https://navelpluisje.github.io/reasonus-faderport/">Documentation</ExternalLink></li>
        <li><ExternalLink to="https://www.buymeacoffee.com/navelpluisje">Donate</ExternalLink></li>
        <li><ExternalLink to="https://github.com/GeoffAWaddington/reaper_csurf_integrator/wiki">CSI Project</ExternalLink></li>
      </ul>
    </div>
  </>
);
