import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  TextInput,
  ScrollView,
} from 'react-native';
import {colors} from '../utils/constants';
import Captcha from '../components/Captcha';
import MobileIcon from '../icons/mobile';
import {MicOff, MicOn} from '../icons';
import ArrowIcon from '../icons/ArrowIcon';

const PaymentScreen = ({navigation}) => {
  const [detailsExpanded, setDetailsExpanded] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [otp, setOtp] = useState('');
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);

  const handlePaymentMethodSelect = method => {
    setSelectedPaymentMethod(method);
    if (method === 'COD') {
      // Proceed with COD flow
      setDetailsExpanded(true);
    } else {
      // Redirect to respective payment screen
      navigation.navigate('OnlinePaymentScreen', {method});
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
      // Place the order
      alert('Order Placed Successfully!');
      // Redirect or perform other actions as needed
    } else {
      alert('Please complete OTP and CAPTCHA verification.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.paymentDetailsContainer}>
        <TouchableOpacity
          onPress={() => setDetailsExpanded(!detailsExpanded)}
          style={styles.detailsHeader}>
          <Text style={styles.detailsHeaderText}>Payment Details</Text>
          {detailsExpanded ? (
            <ArrowIcon size={30} color="red" direction="down" />
          ) : (
            <ArrowIcon size={30} color="red" />
          )}
        </TouchableOpacity>
        {detailsExpanded && (
          <View style={styles.detailsContent}>
            <Text style={styles.detailsText}>Subtotal: $100</Text>
            <Text style={styles.detailsText}>Delivery Charges: $10</Text>
            <Text style={styles.detailsText}>Discount: -$5</Text>
            <Text style={styles.detailsText}>Final Total: $105</Text>
          </View>
        )}
      </View>
      <View style={styles.paymentMethodsContainer}>
        <Text style={styles.sectionTitle}>Select Payment Method</Text>
        {['COD', 'Online', 'Cards', 'UPI'].map(method => (
          <TouchableOpacity
            key={method}
            style={[
              styles.paymentMethodButton,
              selectedPaymentMethod === method && styles.selectedPaymentMethod,
            ]}
            onPress={() => handlePaymentMethodSelect(method)}>
            <Text style={styles.paymentMethodText}>{method}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {selectedPaymentMethod === 'COD' && (
        <View style={styles.codContainer}>
          <Text style={styles.codTitle}>Cash On Delivery</Text>
          <Text style={styles.instructionText}>
            Enter OTP sent to your mobile
          </Text>
          <TextInput
            style={styles.otpInput}
            keyboardType="numeric"
            value={otp}
            onChangeText={handleOtpChange}
            maxLength={4}
          />
          <Captcha onVerify={handleCaptchaVerify} />
          <TouchableOpacity
            style={styles.placeOrderButton}
            onPress={handlePlaceOrder}>
            <Text style={styles.placeOrderButtonText}>Place Order</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.whiteColor,
  },
  paymentDetailsContainer: {
    marginBottom: 20,
    backgroundColor: colors.lightGray,
    borderRadius: 10,
  },
  detailsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: colors.primaryColor,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  detailsHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.whiteColor,
  },
  detailsContent: {
    padding: 15,
  },
  detailsText: {
    fontSize: 16,
    marginBottom: 10,
  },
  paymentMethodsContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  paymentMethodButton: {
    padding: 15,
    borderWidth: 1,
    borderColor: colors.primaryColor,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  selectedPaymentMethod: {
    backgroundColor: colors.primaryColor,
  },
  paymentMethodText: {
    fontSize: 16,
    color: colors.blackColor,
  },
  codContainer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: colors.lightGray,
    borderRadius: 10,
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
    textAlign: 'center',
  },
  placeOrderButton: {
    backgroundColor: colors.primaryColor,
    borderRadius: 5,
    paddingVertical: 15,
    alignItems: 'center',
  },
  placeOrderButtonText: {
    color: colors.whiteColor,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default PaymentScreen;
