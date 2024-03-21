// icon:arrow-go-back-fill | Remix Icon https://remixicon.com/ | Remix Design
import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function Returns(props) {
  return (
    <Svg
      viewBox="0 0 24 24"
      fill="currentColor"
      height="1em"
      width="1em"
      {...props}>
      <Path fill="none" d="M0 0h24v24H0z" />
      <Path d="M8 7v4L2 6l6-5v4h5a8 8 0 110 16H4v-2h9a6 6 0 100-12H8z" />
    </Svg>
  );
}

export default Returns;
