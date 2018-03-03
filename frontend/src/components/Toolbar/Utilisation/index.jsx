import React from 'react';
import { Progress } from 'semantic-ui-react';

const Utilisation = (props) => {
  const vols = props.packedObjects.map(obj => obj.width * obj.height);

  let tot = 0;
  for (let i = 0; i < vols.length; i++) {
    tot += vols[i];
  }

  let utilisation = 100 * (tot / props.totalVolume);

  utilisation = Math.round(utilisation);

  return (
    <Progress percent={utilisation} progress color="violet" />
  );
};

export default Utilisation;
