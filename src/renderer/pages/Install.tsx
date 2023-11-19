import React, { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { MidiDevicesList } from '../../main/api/getMidiDevices';
import { wait } from '../../utils/wait';
import faderport from '../assets/images/faderport8.png';
import { Button } from '../components/atoms/Button';
import { ButtonBar } from '../components/atoms/ButtonBar';
import { ContentHeader } from '../components/atoms/ContentHeader';
import { Key } from '../components/atoms/Key';
import { MidiDevices } from '../components/atoms/MidiDevices';
import { MidiSelect } from '../components/molecules/MidiSelect';
import { useAppSelector } from '../store/hooks';
import { getReaperPath } from '../store/settings/selectors';

export const Install = () => {
  const navigate = useNavigate();
  const reaperPath = useAppSelector(getReaperPath);
  const [midiDevices, setMidiDevices] = useState<MidiDevicesList>({} as MidiDevicesList);
  const [midiInput, setMidiInput] = useState('0');
  const [midiOutput, setMidiOutput] = useState('0');
  const [done, setDone] = useState(false);
  const [installing, setInstalling] = useState(false);
  const [disableInstall, setDisableInstall] = useState(true);

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

  useEffect(() => {
    if (midiDevices?.in && midiDevices.in.length && midiDevices?.out && midiDevices.out.length) {
      setDisableInstall(installing);
    }
  }, [midiDevices, installing]);

  const installReaSonus = async () => {
    setInstalling(true);
    if (! await window.reasonusAPI.installActions(midiInput, midiOutput)) {
      new Notification('Error while copying the actions');
    }
    await window.reasonusAPI.installReaSonus();
    await wait(1500);
    setDone(true);
    await wait(1000);
    navigate('/home');
  }; 

  const handleMidiInputChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setMidiInput(event.target.value);
  };  

  const handleMidiOutputChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setMidiOutput(event.target.value);
  };  

  const handleChangePath = () => {
    navigate('/path');
  };  

  return (
    <div>
      <>
        <ContentHeader>Prepare the FaderPort</ContentHeader>
        {!done ? (
          <>
            <p>
            We made the install of the FaderPort as easy as possible. The only thing you have to do is check if we selected the correct midi device for you. 
            If there's only one, your lucky. Are there more, select you midi devices below (we only show you the available FaderPorts).
            </p>
            <p>
              The current install path is: <Key>{reaperPath}</Key>. Click the button below to change this.
            </p>
            <MidiDevices>
              <span>
                {midiDevices?.in && midiDevices.in.length && (
                  <MidiSelect label="Midi in" id="midi-in" onChange={handleMidiInputChange} value={midiInput}>
                    {midiDevices.in.map((device) => (
                      <option value={device.id} key={device.id}>{device.fullName || device.name}</option>
                    ))}
                  </MidiSelect>
                )}
                {midiDevices?.out && midiDevices.out.length && (
                  <MidiSelect label="Midi out" id="midi-out" onChange={handleMidiOutputChange} value={midiOutput}>
                    {midiDevices.in.map((device) => (
                      <option value={device.id} key={device.id}>{device.fullName || device.name}</option>
                    ))}
                  </MidiSelect>
                )}
              </span>
              <img style={{maxHeight: '20rem', maxWidth:'75%'}} src={faderport} />

            </MidiDevices>
            <ButtonBar>
              <Button onClick={handleChangePath}>Change Path</Button>
              <Button type="button" onClick={installReaSonus} disabled={disableInstall}>Install Reasonus</Button>
            </ButtonBar>
          </>
        ) : (
          <div>Done </div>
        )}
      </>
    </div>
  );
};
