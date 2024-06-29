import React, {useState, useRef, useEffect, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
} from 'react-native';
import {endPoints} from '../utils/endpoints';
import api from '../utils/api';
import {colors} from '../utils/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CartContext} from '../context/Context';

const DATE_ITEM_WIDTH = 120;

const DateTimeSlot = ({navigation}) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [isContinueEnabled, setIsContinueEnabled] = useState(false);
  const [days, setDays] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollViewRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const {state, dispatch} = useContext(CartContext);
  const {cartTotal, discount, finalTotal, cartTotalItems} = state;
  useEffect(() => {
    fetchAvailableDays();
  }, []);

  const fetchAvailableDays = async () => {
    setLoading(true);
    try {
      const availableDays = await getNext7Days();
      setDays(availableDays);
    } catch (error) {
      console.error('Error fetching available days:', error);
    } finally {
      setLoading(false);
    }
  };
  const handleDateSelection = (selectedDate, index) => {
    const selectedDateString = selectedDate.toDateString();
    setSelectedDate(selectedDateString);
    setSelectedTimeSlot(null);
    setIsContinueEnabled(false);

    scrollViewRef.current.scrollTo({
      x: index * DATE_ITEM_WIDTH,
      animated: true,
    });

    console.log('Selected Date:', selectedDateString);
  };

  const handleTimeSlotSelection = timeSlot => {
    setSelectedTimeSlot(timeSlot);
    setIsContinueEnabled(true);
  };

  const getNext7Days = async () => {
    for (let i = 1; i <= 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      const isAvailable = await checkDateAvailability(date);
      if (isAvailable) {
        days.push(date);
      }
      //days.push({date, isAvailable});
    }

    return days;
  };

  const checkDateAvailability = async date => {
    const formattedDate = formatDateForBackend(date);
    const data = {
      platform: 'android',
      user_id: 13, // Replace with actual user ID
      address_id: 19, // Replace with actual address ID
      delivery_date: formattedDate,
    };
    const response = await api.post(
      endPoints.CHECK_DELIVERY_DATE_AVAILABLE,
      data,
      {
        responseType: 'json',
      },
    );
    return response?.data.data.status;
  };

  const formatDateForBackend = date => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // const formatDate = date => {
  //   const options = {weekday: 'short'};
  //   const day = date.toLocaleDateString('en-US', options).split(',')[0];
  //   if (date.getDate() === new Date().getDate() + 1) {
  //     return `${day},Tomorrow`;
  //   } else {
  //     return `${day},${date.getDate()} ${date.toLocaleString('en-US', {
  //       month: 'short',
  //     })}`;
  //   }
  // };

  const formatDate = date => {
    const options = {weekday: 'short'};
    const day = date.toLocaleDateString('en-US', options).split(',')[0];
    const formattedDate = `${day}\n${date.getDate()} ${date.toLocaleString(
      'en-US',
      {month: 'short'},
    )}`;
    return formattedDate;
  };
  function getISTcurrentTime() {
    // Get the current date and time
    const now = new Date();

    // Adjust for IST timezone (GMT+05:30)
    now.setHours(now.getHours() + 5 + (now.getMinutes() >= 30 ? 1 : 0));

    // Format the date and time
    const year = now.getFullYear().toString().slice(-2); // Get last 2 digits of year
    const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Pad month with 0
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    return `${year}${month}${day}${hours}${minutes}${seconds}`;
  }
  function getISTcurrentDateTime() {
    // Get the current date and time
    const now = new Date();

    // Adjust for IST timezone (GMT+05:30)
    now.setHours(now.getHours() + 5 + (now.getMinutes() >= 30 ? 1 : 0));

    // Format the date and time
    const year = now.getFullYear().toString().slice(-2); // Get last 2 digits of year
    const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Pad month with 0
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    return `${year}-${month}-${day},${hours}:${minutes}:${seconds}`;
  }

  // Example usage
  //const days = getNext7Days();

  const timeSlots = [
    '7:30 am to 11:00 am',
    '11:00 am to 3:00 pm',
    '3:00 pm to 7:00 pm',
  ];
  const proceedToPayment = async () => {
    //const userData = await AsyncStorage.getItem('user_data');
    const userData = {
      user_id: 13,
      name: 'mangesh nawale',
      email: 'meettomangesh@gmail.com',
      mobile_number: '9730872969',
    };
    const orderId = 'ORD' + getISTcurrentTime() + userData?.user_id;
    const orderData = {
      user_id: userData?.user_id,
      user_mobile: userData?.mobile_number,
      orderData: {
        order_id: orderId,
        order_date: getISTcurrentDateTime().split(',')[0],
        order_time: getISTcurrentDateTime().split(',')[1],
        order_status: 'pending',
        order_total: finalTotal,
        order_items: cartTotalItems,
        order_subtotal: cartTotal,
      },
    };
    console.log('🚀 ~ proceedToPayment ~ orderData:', state);
    navigation.navigate('Payment');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Select Delivery Date</Text>
      {loading ? (
        <View>
          <Text>Loading Dates</Text>
        </View>
      ) : (
        <>
          <Animated.ScrollView
            ref={scrollViewRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.dateContainer}
            snapToInterval={DATE_ITEM_WIDTH}
            decelerationRate="fast"
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: scrollX}}}],
              {useNativeDriver: true},
            )}>
            {days.map((date, index) => {
              const inputRange = [
                (index - 1) * DATE_ITEM_WIDTH,
                index * DATE_ITEM_WIDTH,
                (index + 1) * DATE_ITEM_WIDTH,
              ];
              const scale = scrollX.interpolate({
                inputRange,
                outputRange: [0.8, 1, 0.8],
                extrapolate: 'clamp',
              });

              return (
                <Animated.View
                  key={index}
                  style={[
                    styles.dateBox,
                    {transform: [{scale}]},
                    selectedDate === date.toDateString() &&
                      styles.selectedDateBox,
                  ]}>
                  <TouchableOpacity
                    onPress={() => handleDateSelection(date, index)}>
                    <Text
                      style={[
                        styles.dateText,
                        selectedDate === date.toDateString() &&
                          styles.selectedDateText,
                      ]}>
                      {formatDate(date)}
                    </Text>
                  </TouchableOpacity>
                </Animated.View>
              );
            })}
          </Animated.ScrollView>
          {selectedDate && (
            <View style={styles.timeSlotContainer}>
              <Text style={styles.timeSlotTitle}>Select Time Slot</Text>
              {timeSlots.map((timeSlot, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.radioButton}
                  onPress={() => handleTimeSlotSelection(timeSlot)}>
                  <View style={styles.radioOuterCircle}>
                    {selectedTimeSlot === timeSlot && (
                      <View style={styles.radioInnerCircle} />
                    )}
                  </View>
                  <Text style={styles.radioText}>{timeSlot}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
          <TouchableOpacity
            style={[
              styles.continueButton,
              !isContinueEnabled && styles.disabledButton,
            ]}
            onPress={proceedToPayment}
            disabled={!isContinueEnabled}>
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',

    padding: 10,
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 15,
    marginHorizontal: '2%',
  },
  dateContainer: {
    paddingLeft: 16,
    paddingRight: DATE_ITEM_WIDTH / 2,
  },
  dateBox: {
    padding: 10,
    margin: 5,
    borderRadius: 5,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    width: DATE_ITEM_WIDTH,
    height: 70,
    justifyContent: 'center',
  },
  selectedDateBox: {
    backgroundColor: colors.primaryColor,
  },
  dateText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  selectedDateText: {
    color: '#FFFFFF',
  },
  timeSlotContainer: {
    marginTop: 10,
    alignItems: 'flex-start',
    width: '100%',
  },
  timeSlotTitle: {
    fontSize: 17,
    marginBottom: 10,
    marginHorizontal: '5%',
    fontWeight: 'bold',
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  radioOuterCircle: {
    height: 18,
    width: 18,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.primaryColor,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: '2%',
  },
  radioInnerCircle: {
    height: 8,
    width: 8,
    borderRadius: 6,
    backgroundColor: colors.primaryColor,
  },
  radioText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#333',
  },
  continueButton: {
    marginTop: 20,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 5,
    backgroundColor: colors.primaryColor,
  },
  disabledButton: {
    backgroundColor: '#CCCCCC',
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DateTimeSlot;
