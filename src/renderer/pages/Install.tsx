import React, { ChangeEvent, useEffect, useState } from 'react';

import { MidiDevices } from '../../main/api/getMidiDevices';
import faderport from '../assets/images/faderport8.png';
import { Button } from '../components/atoms/Button';
import { ContentHeader } from '../components/atoms/ContentHeader';
import { MidiDivices } from '../components/atoms/MidiDivices';
import { MidiSelect } from '../components/molecules/MidiSelect';

export const Install = () => {
  const [midiDevices, setMidiDevices] = useState<MidiDevices>({} as MidiDevices);
  const [midiInput, setMidiInput] = useState('0');
  const [midiOutput, setMidiOutput] = useState('0');

  useEffect(() => {
    const getActionId = async () => {
      await window.reasonusAPI.downloadFiles();
      const devices = await window.reasonusAPI.getMidiDevices();
      setMidiDevices(devices);
    };
    getActionId();
  }, []);

  useEffect(() => {
    if (midiDevices?.in && midiDevices.in.length) {
      setMidiInput(midiDevices.in[0].id);
    }
    if (midiDevices?.out && midiDevices.out.length) {
      setMidiOutput(midiDevices.out[0].id);
    }

  }, [midiDevices]);

  const installReaSonus = () => {
    if (!window.reasonusAPI.installActions(midiInput, midiOutput)) {
      new Notification('Error while copying the actions');
    }
    if (!window.reasonusAPI.installReaSonus()) {
      new Notification('Error while installing ReaSonus');
    }
  }; 

  const handleMidiInputChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setMidiInput(event.target.value);
  };  

  const handleMidiOutputChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setMidiOutput(event.target.value);
  };  

  return (
    <div>
      <ContentHeader>Prepare the FaderPort</ContentHeader>
      <p>
        We made the install of the FaderPort as easy as possible. The only thing you have to do is check if we selected the correct midi device for you. 
        If there's only one, your lucky. Are there more, select you midi devices below (we only show you the available FaderPorts).
      </p>
      <MidiDivices>
        <span>
          {midiDevices?.in && midiDevices.in.length && (
            <MidiSelect label="Midi in" id="midi-in" onChange={handleMidiInputChange} value={midiInput}>
              {midiDevices.in.map((device) => (
                <option value={device.id} key={device.id}>{device.fullName}</option>
              ))}
            </MidiSelect>
          )}
          {midiDevices?.out && midiDevices.out.length && (
            <MidiSelect label="Midi out" id="midi-out" onChange={handleMidiOutputChange} value={midiOutput}>
              {midiDevices.in.map((device) => (
                <option value={device.id} key={device.id}>{device.fullName}</option>
              ))}
            </MidiSelect>
          )}
        </span>
        <img style={{maxHeight: '20rem', maxWidth:'75%'}} src={faderport} />

      </MidiDivices>
      <div>
        <Button type="button" onClick={installReaSonus}>Install Reasonus</Button>
      </div>
    </div>
  );
};
