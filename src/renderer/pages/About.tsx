import React from 'react';

import { Columns } from '../components/atoms/Columns';
import { ContentHeader } from '../components/atoms/ContentHeader';
import { ExternalLink } from '../components/molecules/ExternalLink';
import { VersionItem } from '../components/molecules/VersionItem';

export const About: React.FC = () => (
  <>
    <ContentHeader>About</ContentHeader>
    <div>
      <p>ReaSonus FaderPort is created to make the use of your FaderPort with Reaper as easy as possible. 
        It is build on top of CSI version 3, a tool for connecting controllers to REAPER with a huge flexibility.</p>
      <p>Therefor a big thank you goes out to Geoff Waddington and the CSI community</p>
      <p>I work on ReaSonus in my spare time and is Open Source, so if you want to, feel free to add code.</p>
      <p>You may also donate if you appreciate this project.</p>
      <Columns>
        <div>
          <h2>Links</h2>
          <ul>
            <li><ExternalLink to="https://navelpluisje.github.io/reasonus-faderport/">Documentation</ExternalLink></li>
            <li><ExternalLink to="https://www.buymeacoffee.com/navelpluisje">Donate</ExternalLink></li>
            <li><ExternalLink to="https://github.com/GeoffAWaddington/CSI30Wiki/wiki">CSI Project</ExternalLink></li>
          </ul>
        </div>
        <div>
          <h2>Versions</h2>
          <section>
            <VersionItem version='installer' />
            <VersionItem version='reasonus' />
            <VersionItem version='csi' />
          </section>
        </div>
      </Columns>
    </div>
  </>
);
