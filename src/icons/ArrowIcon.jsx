import React from 'react';
import {Svg, Path} from 'react-native-svg';

const ArrowIcon = ({size = 24, color = 'black', direction = 'up'}) => {
  const d =
    direction === 'up'
      ? 'M6 9l6 6 6-6Z' // Upward arrow path
      : 'M18 15l-6-6-6 6Z'; // Downward arrow path

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d={d} fill={color} />
    </Svg>
  );
};

export default ArrowIcon;
