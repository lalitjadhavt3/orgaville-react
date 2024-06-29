import React from 'react';
import Svg, {Path} from 'react-native-svg';

const FilterIcon = ({
  fill = 'none',
  stroke = 'black',
  width = 24,
  height = 24,
}) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill={fill}
    xmlns="http://www.w3.org/2000/svg">
    <Path
      d="M4 4h16M10 12h4M6 20h12"
      stroke={stroke}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default FilterIcon;
