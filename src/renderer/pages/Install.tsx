import React, { ChangeEvent, useEffect, useState } from 'react';

import addAction from '../assets/images/add-action.png';
import copyActionId from '../assets/images/copy-action-id.png';
import { Button } from '../components/atoms/Button';
import { ContentHeader } from '../components/atoms/ContentHeader';
import { Input } from '../components/atoms/Input';

export const Install = () => {
  const [dummyId, setDummyId] = useState<string | null>(); 
  const [done, setDone] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const getActionId = async () => {
      await window.reasonusAPI.downloadFiles();
      const id = await window.reasonusAPI.getDummyAction();
      if (id) {
        setDone(true);
        setDummyId(id);
      }
    };
    getActionId();
  }, []);

  const copyActions = () => {
    if (!window.reasonusAPI.copyBaseActions()) {
      new Notification('Error while copying the actions');
    }
    setStep(step + 1);
  };

  const installReaSonus = () => {
    if (!window.reasonusAPI.installReaSonus(dummyId)) {
      new Notification('Error while installing ReaSonus');
    }
    setStep(step + 1);
  }; 

  const change = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setDummyId(value);
  };

  return (
    <div>
      <ContentHeader>Prepare the FaderPort</ContentHeader>
      {step === 0 && !done && (
        <>
          <p>
            These steps will help you install Reasonus FaderPort. If steps are not clear, please check out the documentation. There is a more extensive description over there.
          </p>
          <p>
            In the first step we copy CSI and the needed actions to REAPER<br /><br />
          </p>
          <div>
            <Button type="button" onClick={copyActions}>Copy CSI and actions</Button>
          </div>
        </>
      )}
      {step === 1 && !done && (
        <>
          <p>
            If REAPER is already opened, restart it. Then:
          </p>
          <ul>
            <li>
              Open the actions list in REAPER.
            </li>
            <li>Click [new action...] and [Load ReaScript...]</li>
          </ul>
          <img src={addAction} alt="" />
          <ul>
            <li>Select the action 'always-on.lua' from the folder <br /> <code>&lt;REAPER-FOLDER&gt;/Scripts/ReaSonus</code>.<br />
              There are more actions in this folder, but we'll use these later on.</li>
          </ul>
          <div>
            <Button type="button" onClick={() => { setStep(step + 1); }}>Next step</Button>
          </div>
        </>
      )}
      {step === 2 && !done && (
        <>
          <p>Copy the action Id by right clicking the action and select 'Copy selected action command ID'.</p>
          <p>Paste the Id below and click Install.</p>
          <img src={copyActionId} alt="" />
          <p>
            <Input onChange={change} value={dummyId} placeholder="Paste your actionId here" />
            <Button type="button" onClick={installReaSonus} disabled={!dummyId}>Install ReaSonus</Button>
          </p>
        </>
      )}
      {(step === 3 || done) && (
        <>
          <p>ReaSonus is installed properly and you're now able to use your FaderPort with REAPER</p>
          <p>In the Functions menu you can set actions to the function keys</p>
          <p>In the Mix navigation menu you can set actions to the mix navigation keys</p>
        </>
      )}
    </div>
  );
};
