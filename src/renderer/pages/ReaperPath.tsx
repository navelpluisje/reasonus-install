import React, { ChangeEvent, useState } from 'react';

import { Button } from '../components/atoms/Button';
import { ContentHeader } from '../components/atoms/ContentHeader';
import { Input } from '../components/atoms/Input';
import { useAppDispatch } from '../store/hooks';
import { setReaperPath } from '../store/settings';

export const ReaperPath = () => {
  const dispatch = useAppDispatch();
  const [path, setPath] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPath(event.target.value);
  };

  const openFolderDialog = async () => {
    const folderPath = await window.reasonusAPI.selectFolder();
    if (folderPath) {
      dispatch(setReaperPath(folderPath));
    }
  };

  const savePath = () => {
    window.reasonusAPI.setReaperPath(path);
    dispatch(setReaperPath(path));
  };

  return (
    <>
      <ContentHeader>Set your REAPER path</ContentHeader>
      <div>
        <p>
          To make ReaSonus work, the path to the REAPER resource path is needed. Then the files can be installed in the correct path. This can be done in 2 ways:
        </p>
        <h2>Copy from finder/Explorer</h2>
        <ul>
          <li>Open REAPER</li>
          <li>Go to Options &gt; Show REAPER resource path in explorer/finder</li>
          <li>Open the folder info and copy the folder path <br/>
          </li>
        </ul>
        <p><Input placeholder='Paste here' value={path} onChange={handleChange} /><Button type="button" onClick={(savePath)}>Save</Button></p>
        <h2>Select a path</h2>
        <p>
          <Button type="button" onClick={openFolderDialog}>Select the REAPER path</Button>
        </p>
      </div>
    </>
  );
};
