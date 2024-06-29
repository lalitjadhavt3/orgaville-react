import React, {useContext, useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  TextInput,
  ScrollView,
  Animated,
  Easing,
  Image,
} from 'react-native';
import {colors, fontStyles} from '../utils/constants';
import Captcha from '../components/Captcha';
import ArrowIcon from '../icons/ArrowIcon';
import ProgressStepper from '../components/ProgressStepper';
import {CartContext} from '../context/Context';

const PaymentScreen = ({navigation}) => {
  const [detailsExpanded, setDetailsExpanded] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [otp, setOtp] = useState('');
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const {state} = useContext(CartContext);
  const {cartTotal, discount, finalTotal} = state;

  const codAnimation = useRef(new Animated.Value(0)).current;

  const toggleDetails = () => {
    setDetailsExpanded(!detailsExpanded);
  };

  const toggleCodSection = () => {
    const toValue = selectedPaymentMethod === 'COD' ? 0 : 1;
    Animated.timing(codAnimation, {
      toValue,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
    setSelectedPaymentMethod(toValue ? 'COD' : null);
  };
  const toggleOnlineSection = () => {
    const toValue = selectedPaymentMethod === 'Online' ? 0 : 1;
    Animated.timing(codAnimation, {
      toValue,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
    setSelectedPaymentMethod(toValue ? 'Online' : null);
  };
  const handlePaymentMethodSelect = method => {
    if (method === 'Online') {
      toggleCodSection();
    } else {
      toggleOnlineSection();
    }
  };

  const handleOtpChange = text => {
    setOtp(text);
  };

  const handleCaptchaVerify = verified => {
    setIsCaptchaVerified(verified);
  };

  const handlePlaceOrder = () => {
    if (otp.length === 4 && isCaptchaVerified) {
      navigation.navigate('OrderSuccess', {orderId: 'ORD202403020411'});
    } else {
      alert('Please complete OTP and CAPTCHA verification.');
    }
  };

  const codSectionHeight = codAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 200], // Adjust this value based on the content height
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.progressBarSteps}>
        <ProgressStepper currentStep={3} />
      </View>
      <View style={styles.amountField}>
        <View style={styles.paymentDetailsContainer}>
          <TouchableOpacity
            onPress={toggleDetails}
            style={styles.detailsHeader}>
            <Text style={fontStyles.subHeader}>
              Total Amount   ₹{finalTotal}
            </Text>
            {detailsExpanded ? (
              <ArrowIcon
                size={30}
                color={colors.primaryColorLight}
                direction="down"
              />
            ) : (
              <ArrowIcon size={30} color={colors.primaryColorLight} />
            )}
          </TouchableOpacity>
          {detailsExpanded && (
            <View style={styles.detailsContent}>
              <View style={styles.detailsRow}>
                <Text style={fontStyles.medium}>Subtotal:</Text>
                <Text style={styles.amountText}>₹{cartTotal}</Text>
              </View>
              <View style={styles.detailsRow}>
                <Text style={fontStyles.medium}>Delivery Charges:</Text>
                <Text style={styles.amountText}>₹{50}</Text>
              </View>
              <View style={styles.detailsRow}>
                <Text style={fontStyles.medium}>Discount:</Text>
                <Text style={styles.amountText}>₹{discount}</Text>
              </View>
              <View style={styles.detailsRow}>
                <Text style={fontStyles.medium}>Final Total:</Text>
                <Text style={styles.amountText}>₹{finalTotal}</Text>
              </View>
            </View>
          )}
        </View>
      </View>
      <View style={styles.paymentMethodField}>
        <Text style={styles.sectionTitle}>Select Payment Method</Text>
        {['Online', 'COD'].map(method => (
          <TouchableOpacity
            key={method}
            style={styles.paymentMethodContainer}
            onPress={() => handlePaymentMethodSelect(method)}>
            {method === 'Online' ? (
              <Image source={require('../icons/card.png')} />
            ) : (
              <Image source={require('../icons/cash.png')} />
            )}

            <Text style={styles.paymentMethodText}>{method}</Text>
            {selectedPaymentMethod === method ? (
              <ArrowIcon
                size={20}
                color={colors.primaryColorLight}
                direction="up"
              />
            ) : (
              <ArrowIcon
                size={20}
                color={colors.primaryColorLight}
                direction="down"
              />
            )}
          </TouchableOpacity>
        ))}
        {selectedPaymentMethod === 'Online' && (
          <Animated.View
            style={[styles.codContainer, {height: codSectionHeight}]}>
            <View style={styles.codContent}>
              <Text style={styles.instructionText}>
                Enter OTP sent to your mobile
              </Text>
              <TextInput
                style={styles.otpInput}
                keyboardType="numeric"
                value={otp}
                onChangeText={handleOtpChange}
                maxLength={6}
              />
              {isCaptchaVerified ? (
                <View>
                  <Text style={styles.instructionText}>Captcha Verified !</Text>
                </View>
              ) : (
                <Captcha onVerify={handleCaptchaVerify} />
              )}

              <TouchableOpacity
                style={styles.placeOrderButton}
                onPress={handlePlaceOrder}>
                <Text style={styles.placeOrderButtonText}>Place Order</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        )}
        {selectedPaymentMethod === 'COD' && (
          <Animated.View
            style={[styles.codContainer, {height: codSectionHeight}]}>
            <View style={styles.codContent}>
              <Text style={styles.codTitle}>
                Online Payments will start soon!
              </Text>
            </View>
          </Animated.View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  detailsContent: {
    marginVertical: '1%',
    paddingHorizontal: '4%',
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 2,
  },
  detailsText: {
    fontSize: 16,
    color: '#333',
  },
  amountText: {
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
  },
  progressBarSteps: {
    width: '96%',
    borderRadius: 10,
    backgroundColor: colors.whiteColor,
    marginHorizontal: '2%',
    marginVertical: '2%',
    paddingTop: '4%',
  },
  amountField: {
    width: '96%',
    borderRadius: 10,
    backgroundColor: colors.whiteColor,
    marginHorizontal: '2%',
    marginVertical: '2%',
  },
  paymentMethodField: {
    width: '96%',
    borderRadius: 10,
    backgroundColor: colors.whiteColor,
    marginHorizontal: '2%',
    marginVertical: '2%',
    padding: '3%',
  },
  paymentDetailsContainer: {
    backgroundColor: colors.activeTintColor,
    borderRadius: 10,
  },
  detailsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: colors.activeTintColor,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  detailsHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.whiteColor,
  },
  paymentMethodsContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  paymentMethodContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: colors.lightGray,
    marginVertical: '2%',
    borderRadius: 10,
  },
  paymentMethodText: {
    fontSize: 16,
    color: colors.blackColor,
  },
  codContainer: {
    overflow: 'hidden',
    backgroundColor: colors.lightGray,
    borderRadius: 10,
    marginVertical: '2%',
  },
  codContent: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  codTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  instructionText: {
    fontSize: 16,
    marginBottom: 10,
  },
  otpInput: {
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    textAlign: 'left',
  },
  placeOrderButton: {
    backgroundColor: colors.primaryColor,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  placeOrderButtonText: {
    color: colors.whiteColor,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default PaymentScreen;
