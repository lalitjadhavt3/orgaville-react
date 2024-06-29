import React from 'react';
import Svg, {Path} from 'react-native-svg';

const SearchIcon = ({
  fill = 'none',
  stroke = 'grey',
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
      d="M11 4a7 7 0 100 14 7 7 0 000-14zM21 21l-5.4-5.4"
      stroke={stroke}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default SearchIcon;
