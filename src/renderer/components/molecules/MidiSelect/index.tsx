import React, { ChangeEvent } from 'react';

import { Label, Select, Wrapper } from './MidiSelect.styled';

interface Props {
  label: string;
  id: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  value: string;
  children: JSX.Element[] | JSX.Element;
}

export const MidiSelect: React.FC<Props> = ({label, id, value, onChange, children}) => (
  <Wrapper>
    <Label htmlFor={id}>{label}</Label>
    <Select id={id} onChange={onChange} value={value}>
      {children}
    </Select>
  </Wrapper>
);