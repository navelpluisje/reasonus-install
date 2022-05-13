import React, { useEffect, useState } from 'react';

import { Version, VersionName, VersionNumber } from '../atoms/Version';

interface Props {
  version: 'reasonus' | 'csi';
}

const labels = {
  csi: 'CSI',
  reasonus: 'Reasonus Resources',
};

export const VersionItem: React.FC<Props> = ({version}) => {
  const [versionNumber, setVersionNumber] = useState('');

  useEffect(() => {
    const getVersionNumber = async () => {
      const number = await window.reasonusAPI.getVersionNumber(version);
      setVersionNumber(number);
    };
    getVersionNumber();
  }, [version]);

  return (
    <Version>
      <VersionName>{labels[version]}</VersionName>
      <VersionNumber>{versionNumber}</VersionNumber>
    </Version>
  );
};