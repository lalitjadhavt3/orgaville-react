import React from 'react';
import Svg, {Path} from 'react-native-svg';

const BagIcon = ({size = 24, color = '#000000'}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M20 6.5H16V5C16 3.89543 15.1046 3 14 3H10C8.89543 3 8 3.89543 8 5V6.5H4C2.89543 6.5 2 7.39543 2 8.5V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V8.5C22 7.39543 21.1046 6.5 20 6.5Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8 6.5V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V6.5"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M2 11.5H22"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 11.5V21"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default BagIcon;
