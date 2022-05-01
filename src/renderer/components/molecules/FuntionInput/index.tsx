import React, { ChangeEvent } from 'react';

import { Input, Label, Wrapper } from './FunctionInput.styled';

interface Props {
  label: string;
  id: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

export const FunctionInput: React.FC<Props> = ({label, id, value, onChange}) => (
  <Wrapper>
    <Label htmlFor={id}>{label}</Label>
    <Input type="text" id={id} placeholder="Paste your action Id" onChange={onChange} value={value} />
  </Wrapper>
);