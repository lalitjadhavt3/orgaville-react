// icon:address-book | Fontawesome https://fontawesome.com/ | Fontawesome
import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function AddressBook(props) {
  return (
    <Svg viewBox="0 0 512 512" height="1em" width="1em" {...props}>
      <Path d="M96 0C60.7 0 32 28.7 32 64v384c0 35.3 28.7 64 64 64h288c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H96zm112 288h64c44.2 0 80 35.8 80 80 0 8.8-7.2 16-16 16H144c-8.8 0-16-7.2-16-16 0-44.2 35.8-80 80-80zm96-96c0 35.3-28.7 64-64 64s-64-28.7-64-64 28.7-64 64-64 64 28.7 64 64zM512 80c0-8.8-7.2-16-16-16s-16 7.2-16 16v64c0 8.8 7.2 16 16 16s16-7.2 16-16V80zm-16 112c-8.8 0-16 7.2-16 16v64c0 8.8 7.2 16 16 16s16-7.2 16-16v-64c0-8.8-7.2-16-16-16zm16 144c0-8.8-7.2-16-16-16s-16 7.2-16 16v64c0 8.8 7.2 16 16 16s16-7.2 16-16v-64z" />
    </Svg>
  );
}

export default AddressBook;
