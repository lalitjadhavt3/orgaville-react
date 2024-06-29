import {Dimensions, Platform, PixelRatio} from 'react-native';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

// Based on standard iPhone 8 screen scale
const scale = SCREEN_WIDTH / 375;

function normalize(size) {
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}

export const fontStyles = {
  // Font sizes
  small: {
    fontSize: normalize(12),
  },
  medium: {
    fontSize: normalize(16),
  },
  large: {
    fontSize: normalize(20),
  },
  extraLarge: {
    fontSize: normalize(24),
  },

  // Font weights
  light: {
    fontWeight: '300',
  },
  regular: {
    fontWeight: '400',
  },
  mediumWeight: {
    fontWeight: '500',
  },
  bold: {
    fontWeight: '700',
  },

  // Font styles
  italic: {
    fontStyle: 'italic',
  },

  // Combined styles
  header: {
    fontSize: normalize(24),
    fontWeight: '700',
  },
  subHeader: {
    fontSize: normalize(20),
    fontWeight: 'bold',
  },
  body: {
    fontSize: normalize(16),
    fontWeight: '400',
  },
  caption: {
    fontSize: normalize(12),
    fontWeight: '300',
  },
};

export const colors = {
  backgroundColor: '#65C80D',
  whiteColor: '#fff',
  primaryColor: '#65C80D',
  primaryColorDark: '#65C80D',
  primaryColorLight: '#65C80D',
  secondaryColor: '#EC5C2B',
  secondaryColorDark: '#EC5C2B',
  secondaryColorLight: '#EC5C2B',
  tertiaryColor: '#77BA16',
  blackColor: '#000000',
  lightBorderColor: 'lightgrey',
  inactiveColor: '#A1AFA0',
  activeTintColor: '#caeffa',
};
