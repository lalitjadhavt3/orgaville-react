import React from 'react';
import Svg, {Circle} from 'react-native-svg';

const ThreeDotMoreOptionsVertical = ({width, height}) => {
  const radius = Math.min(width, height) / 10;
  const centerX = width / 2;
  const color = '#808080'; // Standard grey color

  // Increase gap by reducing the divisor
  const gap = height / 4;

  return (
    <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <Circle cx={centerX} cy={gap} r={radius} fill={color} />
      <Circle cx={centerX} cy={height / 2} r={radius} fill={color} />
      <Circle cx={centerX} cy={height - gap} r={radius} fill={color} />
    </Svg>
  );
};

export default ThreeDotMoreOptionsVertical;
