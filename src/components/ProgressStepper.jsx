// ProgressStepper.js
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {MicOn} from '../icons';
import {colors} from '../utils/constants';
import CheckmarkIcon from '../icons/CheckMarkIcon';

const ProgressStepper = ({currentStep}) => {
  const steps = [
    {title: 'Address', step: 1},
    {title: 'Order Summary', step: 2},
    {title: 'Payment', step: 3},
  ];

  return (
    <View style={styles.container}>
      {steps.map((step, index) => (
        <React.Fragment key={step.step}>
          <View style={styles.stepContainer}>
            <View
              style={[
                styles.circle,
                currentStep >= step.step && styles.activeCircle,
                currentStep > step.step && styles.completedCircle,
              ]}>
              {currentStep > step.step ? (
                <CheckmarkIcon size={20} color="#fff" />
              ) : (
                <Text
                  style={[
                    styles.stepNumber,
                    currentStep >= step.step && styles.activeStepNumber,
                  ]}>
                  {step.step}
                </Text>
              )}
            </View>
            <Text
              style={[
                styles.stepTitle,
                currentStep >= step.step && styles.activeStepTitle,
              ]}>
              {step.title}
            </Text>
          </View>
          {index < steps.length - 1 && (
            <View
              style={[
                styles.line,
                currentStep > step.step && styles.activeLine,
              ]}
            />
          )}
        </React.Fragment>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  stepContainer: {
    alignItems: 'center',
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeCircle: {
    backgroundColor: colors.backgroundColor,
  },
  completedCircle: {
    backgroundColor: colors.backgroundColor,
    color: '#fff',
  },
  stepNumber: {
    color: '#666',
    fontSize: 16,
  },
  activeStepNumber: {
    color: '#fff',
  },
  stepTitle: {
    marginTop: 4,
    fontSize: 12,
    color: '#666',
  },
  activeStepTitle: {
    color: colors.secondaryColor,
    fontWeight: 'bold',
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#e0e0e0',
    marginBottom: '5%',
  },
  activeLine: {
    backgroundColor: colors.primaryColor,
  },
});

export default ProgressStepper;
