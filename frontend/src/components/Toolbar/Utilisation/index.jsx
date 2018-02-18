import React from 'react';

const Utilisation = (props) => {
  const vols = props.packedObjects.map(obj => obj.width * obj.height);

  let tot = 0;
  for (let i = 0; i < vols.length; i++) {
    tot += vols[i];
  }

  let utilisation = 100 * (tot / props.totalVolume);

  utilisation = Math.round(utilisation * 100) / 100;

  return (
    <h2
      style={{ display: 'inline-block' }}
      align="center"
    >
      Utilisation: { utilisation }%
    </h2>
  );
};

export default Utilisation;
