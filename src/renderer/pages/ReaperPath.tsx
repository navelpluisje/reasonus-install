import React, { ChangeEvent, useState } from 'react';

import { Button } from '../components/atoms/Button';
import { ClipboardButton } from '../components/atoms/ClipboardButton';
import { ContentHeader } from '../components/atoms/ContentHeader';
import { Input } from '../components/atoms/Input';
import { Key } from '../components/atoms/Key';
import { Pre } from '../components/atoms/Pre';
import { CodeBlock } from '../components/molecules/CodeBlock';
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

  const copyToClipboard = () => {
    window.reasonusAPI.copyToClipboard('local path = reaper.GetResourcePath()\nreaper.ShowConsoleMsg("Path: " .. path)');
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
        <h2>Create action to get the path</h2>
        <ul>
          <li>Open REAPER</li>
          <li>Go to <Key>Actions</Key> &#8680; <Key>Show Action List</Key></li>
          <li>Select <Key>New action&hellip;</Key> &#8680; <Key>New ReaScript&hellip;</Key></li>
          <li>Give the script a name and click <Key>Save</Key></li>
          <li>Paste the next code into the editor and click <Key>Start</Key>. A popup should appear with the path.
            <CodeBlock>
              {`local path = reaper.GetResourcePath()
reaper.ShowConsoleMsg("Path: " .. path)`}
            </CodeBlock>
          </li>
          <li>Copy the path and paste it in the input</li>
        </ul>
        <p><Input placeholder='Paste here' value={path} onChange={handleChange} /><Button type="button" onClick={(savePath)}>Save</Button></p>
      </div>
    </>
  );
};
