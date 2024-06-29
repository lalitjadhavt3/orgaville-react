import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {colors} from '../utils/constants';
const windowHeight = Dimensions.get('window').height;
import {useNavigation} from '@react-navigation/native';
import DateTimeSlot from '../components/DateTimeSlot';
import ProgressStepper from '../components/ProgressStepper';
import GroceryCartItems from '../components/GroceryCartItems';
import DeliveryLocation from '../components/DeliveryLocation';
import AddressModal from '../components/AddressModal';
const OrderSummaryScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const addresses = [
    'John Doe\n123 Main St, Apt 4B, New York, NY 10001',
    'Jane Smith\n456 Park Ave, Suite 23, San Francisco, CA 94102',
    'Michael Johnson\n789 Broadway, Los Angeles, CA 90001',
    'Emily Davis\n101 Elm St, Boston, MA 02101',
    'William Brown\n202 Oak St, Chicago, IL 60601',
  ];

  const handleModalClose = () => {
    setModalVisible(false);
  };
  const navigation = useNavigation();
  return (
    <View style={{justifyContent: 'center', flex: 1}}>
      <ScrollView style={styles.screenContainer}>
        <View style={styles.progressBar}>
          <ProgressStepper currentStep={2} />
        </View>
        <View style={styles.progressBar}>
          <DeliveryLocation onPress={() => setModalVisible(true)} />
        </View>
        <View style={styles.progressBar}>
          <GroceryCartItems />

          <DateTimeSlot navigation={navigation} />
        </View>
      </ScrollView>
      <AddressModal
        visible={modalVisible}
        onClose={handleModalClose}
        addresses={addresses}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    paddingTop: Platform.OS === 'android' ? '3%' : 0,
    backgroundColor: '#eee',
  },
  progressBar: {
    paddingVertical: '2%',
    width: '96%',
    borderRadius: 10,
    backgroundColor: colors.whiteColor,
    marginHorizontal: '2%',
    marginVertical: '1%',
  },

  header: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 16,
    marginTop: 5,
  },
  description: {
    fontSize: 14,
    marginTop: 5,
    color: '#888',
  },
  form: {
    flex: 5,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  textInput: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ceefeb',
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
    marginTop: '5%',
  },
  forgotPassword: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 10,
    alignSelf: 'center',
    textDecorationLine: 'underline',
  },
  button: {
    height: 40,
    backgroundColor: colors.backgroundColor,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonLabel: {
    color: colors.whiteColor,
    fontSize: 16,
    fontWeight: 'bold',
  },
  newAccount: {
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
  },
  orLoginWith: {
    fontSize: 14,
    marginTop: 20,
    textAlign: 'center',
  },
  socialLogin: {
    justifyContent: 'center',
    marginTop: 10,
    flexDirection: 'row',
    alignContent: 'center',
  },
});

export default OrderSummaryScreen;
