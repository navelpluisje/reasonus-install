import React, { ChangeEvent, useEffect, useState } from 'react';

import { Button } from '../components/atoms/Button';
import { ButtonBar } from '../components/atoms/ButtonBar';
import { ContentHeader } from '../components/atoms/ContentHeader';
import { Input } from '../components/atoms/Input';
import { Key } from '../components/atoms/Key';
import { useAppDispatch } from '../store/hooks';
import { setReaperPath } from '../store/settings';

export const ReaperPath = () => {
  const dispatch = useAppDispatch();
  const [path, setPath] = useState('');
  const [hasInitPath, setHasInitPath] = useState(false);


  useEffect(() => {
    const getPath = async () => {
      const reaperPath = await window.reasonusAPI.getInitialReaperPath();
      setHasInitPath(reaperPath !== '');
      setPath(reaperPath);
    };
    getPath();
  }, []);

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
          To make ReaSonus work, the path to the REAPER resource path is needed. Then the files can be installed in the correct path.
        </p>
        {hasInitPath ? (
          <>
            <h2>We found Reaper</h2>
            <p>It looks like we found the location of your REAPER recources folder. You can check the path if you want here. If this is correct, click <Key>Save</Key>. Otherwise you can alter the path</p>
            <p><Input large placeholder='Paste here' value={path} onChange={handleChange} /></p>
            <ButtonBar>
              <Button type="button" onClick={(savePath)}>Save</Button>
            </ButtonBar>
          </>
        ) : (
          <>
            <h2>Not able to find the path</h2>
            <p>
              We were not able to determine the location of your REAPER resources. You can set the path by entering it in the input field, or click the <Key>Select the REAPER path</Key> to find it with {'fileBrowser'}
            </p>
            <p>
              Within the documentation is also an explanation about how to get the path with an action (which you have to create yourself 😝)
            </p>
            <p><Input large placeholder='Paste here' value={path} onChange={handleChange} /><Button type="button" onClick={(savePath)}>Save</Button></p>

            <ButtonBar>
              <Button type="button" onClick={openFolderDialog}>Select the REAPER path</Button>
            </ButtonBar>
          </>
        )
        }
      </div>
    </>
  );
};
