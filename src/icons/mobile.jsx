import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function MobileIcon({width, height}) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg">
      <Path d="M17 23a2 2 0 002-2V3a2 2 0 00-2-2H7a2 2 0 00-2 2v18a2 2 0 002 2zM7 3h2.5l.5 1h4l.5-1H17v18H7zm6 16a1 1 0 11-1-1 1 1 0 011 1z" />
    </Svg>
  );
}

export default MobileIcon;
