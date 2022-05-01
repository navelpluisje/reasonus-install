import React, { ChangeEvent, useEffect, useState } from 'react';

import { FunctionActions } from '../../types';
import { Button } from '../components/atoms/Button';
import { ContentHeader } from '../components/atoms/ContentHeader';
import { FunctionList } from '../components/atoms/FunctionList';
import { FunctionInput } from '../components/molecules/FuntionInput';

const f = new Array(8).fill('');

export const Functions: React.FC = () => {
  const [actions, setActions] = useState(f);

  useEffect(() => {
    const getData = async () => {
      const baseActions = [...f];
      const functionActions = await window.reasonusAPI.getFunctionActions();
      Object.entries(functionActions).forEach(([key, value]) => {
        const index = parseInt(key[1], 10) - 1;
        baseActions[index] = value;
      });
      setActions(baseActions);
    };
    getData();
  }, []);

  const onInputChange = (key: number) => (event: ChangeEvent<HTMLInputElement>) => {
    const prevActions = [...actions];
    prevActions[key] = event.target.value;
    setActions(prevActions);
  };

  const saveActions = () => {
    const values: FunctionActions = actions.reduce((acc, value, index) => ({
      ...acc,
      [`F${index + 1}`]: value,
    }), {});
    window.reasonusAPI.saveFunctionActions(values);
  };

  return (
    <>
      <ContentHeader>Functions</ContentHeader>
      <div>
        <ul>
          <li>Search for the action in REAPER</li>
          <li>Right clik the action and select 'Copy selected action command ID'</li>
          <li>Paste the id in one of the Functions inputs</li>
          <li>Click Save to store your settings</li>
        </ul>
        <FunctionList>
          {actions.map((_, index) => (
            <FunctionInput 
              key={index} 
              id={`function-${index}`} 
              label={`F${index + 1}`} 
              onChange={onInputChange(index)} value={actions[index]} 
            />
          ))}

        </FunctionList>
        <p>
          <Button type="button" onClick={saveActions}>Save Functions</Button>
        </p>
      </div>
    </>
  );
};