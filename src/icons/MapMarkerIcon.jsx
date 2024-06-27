import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {useColorScheme} from 'react-native';

const MapMarkerIcon = ({size, color}) => {
  const theme = useColorScheme();
  const fillColor = color || (theme === 'dark' ? '#FFFFFF' : '#000000');

  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
        fill={fillColor}
      />
    </Svg>
  );
};

export default MapMarkerIcon;
