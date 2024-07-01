import React from 'react';
import Svg, {Path} from 'react-native-svg';

const DownloadIcon = ({color = 'black', size = 24, styles, ...props}) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={styles}
    {...props}>
    <Path
      d="M5 20H19C19.5523 20 20 19.5523 20 19V15H18V18H6V15H4V19C4 19.5523 4.44772 20 5 20ZM13 3V14.5858L16.2929 11.2929L17.7071 12.7071L12 18.4142L6.29289 12.7071L7.70711 11.2929L11 14.5858V3H13Z"
      fill={color}
    />
  </Svg>
);

export default DownloadIcon;
