// OrderTracker.js
import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {colors} from '../utils/constants';

const SuccessIcon = () => <Text style={styles.successIcon}>✔</Text>;

const OrderTracker = ({status}) => {
  const stages = [
    {name: 'Ordered', date: '2023-06-15'},
    {name: 'Packed', date: '2023-06-16'},
    {name: 'Shipped', date: '2023-06-17'},
    {name: 'Delivered', date: '2023-06-20'},
  ];
  const [expanded, setExpanded] = useState(false);
  const currentStageIndex = stages.findIndex(stage => stage.name === status);

  const handleToggleExpansion = () => {
    setExpanded(!expanded);
  };

  const renderStages = () => {
    return stages.map((stage, index) => {
      const isActive = index <= currentStageIndex;
      const isActiveStyle = isActive ? styles.activeCircle : styles.circle;
      const isActiveLabel = isActive ? styles.activeLabel : styles.label;
      const isActiveLine = isActive ? styles.activeLine : styles.line;

      if (expanded || index === 0 || index === currentStageIndex) {
        return (
          <View key={index} style={styles.stageContainer}>
            <View style={styles.circleAndLineContainer}>
              <View style={isActiveStyle}>{isActive && <SuccessIcon />}</View>
              {(expanded
                ? index < stages.length - 1
                : index < currentStageIndex) && <View style={isActiveLine} />}
            </View>
            <View style={styles.stageInfo}>
              <Text style={isActiveLabel}>{stage.name}</Text>
              {isActive && <Text style={styles.dateText}>{stage.date}</Text>}
            </View>
          </View>
        );
      }
      return null;
    });
  };

  return (
    <View style={styles.container}>
      {renderStages()}
      <TouchableOpacity
        style={styles.toggleButton}
        onPress={handleToggleExpansion}>
        <Text style={styles.toggleText}>{expanded ? 'Hide' : 'Show All'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginVertical: 15,
    paddingHorizontal: 11,
    backgroundColor: colors.whiteColor,
  },
  stageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 7,
  },
  circleAndLineContainer: {
    alignItems: 'center',
  },
  circle: {
    width: 19,
    height: 19,
    borderRadius: 9.5,
    borderWidth: 2,
    borderColor: colors.lightBorderColor,
    backgroundColor: colors.whiteColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeCircle: {
    width: 19,
    height: 19,
    borderRadius: 9.5,
    borderWidth: 2,
    borderColor: '#2e8b57', // Sea Green
    backgroundColor: '#2e8b57', // Sea Green
    justifyContent: 'center',
    alignItems: 'center',
  },
  successIcon: {
    color: colors.whiteColor,
    fontSize: 12,
    fontWeight: 'bold',
  },
  stageInfo: {
    marginLeft: 11,
    justifyContent: 'center',
  },
  label: {
    color: colors.lightBorderColor,
    fontSize: 13,
    fontWeight: 'bold',
  },
  activeLabel: {
    color: colors.blackColor,
    fontSize: 13,
    fontWeight: '400',
  },
  dateText: {
    color: '#2e8b57', // Sea Green
    fontSize: 11,
    marginTop: 2,
  },
  line: {
    width: 2,
    height: 25,
    backgroundColor: colors.lightBorderColor,
    marginTop: 3,
  },
  activeLine: {
    width: 2,
    height: 25,
    backgroundColor: '#2e8b57', // Sea Green
    marginTop: 3,
  },
  toggleButton: {
    marginTop: 11,
    paddingVertical: 5,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toggleText: {
    color: '#2e8b57', // Sea Green
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default OrderTracker;
