import React from 'react';
import {TouchableOpacity, Text, StyleSheet, Image} from 'react-native';
import {colors} from '../utils/constants';
const PrimaryBtn = ({
  text,
  onPress,
  buttonStyle,
  textStyle,
  disabled,
  icon,
  secondaryText,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled || false}
      style={[styles.button, buttonStyle]}
      onPress={onPress}>
      {icon == 'Logout' && <Image source={require('../icons/logout.png')} />}
      {icon == 'Mobile' && <Image source={require('../icons/mobile.png')} />}
      <Text style={[styles.text, textStyle]}>
        {icon && '    '}
        {text}
      </Text>
      {secondaryText && (
        <Text style={styles.secondaryText}> {secondaryText}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  secondaryText: {
    backgroundColor: colors.tertiaryColor,
    fontSize: 18,
    color: colors.whiteColor,
  },
  button: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: '15%',
    width: '70%',
    height: 50,
    backgroundColor: colors.primaryColor,
    borderRadius: 10,
  },
  text: {
    alignSelf: 'center',
    color: colors.whiteColor,
    alignContent: 'center',
    fontSize: 20,
    justifyContent: 'center',
    fontWeight: 'bold',
  },
});

export default PrimaryBtn;
