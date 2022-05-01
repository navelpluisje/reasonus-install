import React from 'react';

import faderport from '../assets/images/faderport8.png';
import { ContentHeader } from '../components/atoms/ContentHeader';

export const Home = () => {
  return (
    <>
      <ContentHeader center>Welcome to ReaSonus FaderPort</ContentHeader>
      <div style={{textAlign: 'center'}}>
        <p>
          <img style={{maxHeight: '20rem', maxWidth:'75%'}} src={faderport} />
        </p>
        <p>
          Manage your FaderPort the best way possible in REAPER.
        </p>
      </div>
    </>
  );
};
