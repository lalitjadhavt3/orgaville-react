import React from 'react';
import Snackbar from 'react-native-snackbar';
import {colors} from '../utils/constants';

const SnackMsg = ({visible, message, duration = Snackbar.LENGTH_SHORT}) => {
  if (visible) {
    Snackbar.show({
      text: message,
      duration: duration,
    });
  }
};

export default SnackMsg;
