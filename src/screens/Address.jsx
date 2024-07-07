import React, {useLayoutEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Alert,
  TouchableWithoutFeedback,
} from 'react-native';
import {colors} from '../utils/constants';
import api from '../utils/api';
import {endPoints} from '../utils/endpoints';
import {SafeAreaView} from 'react-native-safe-area-context';
import ThreeDotMoreOptions from '../icons/ThreeDot';

const windowHeight = Dimensions.get('window').height;

const Address = ({navigation}) => {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [optionsVisible, setOptionsVisible] = useState(false);
  const optionsBoxRef = useRef(null);

  useLayoutEffect(() => {
    const data = {
      platform: 'android',
      user_id: 13,
    };
    api.post(endPoints.GET_ADDRESS, data).then(response => {
      setAddresses(response?.data?.data);
    });
  }, []);

  const fetchAddresses = () => {
    const data = {
      platform: 'android',
      user_id: 13,
    };
    api.post(endPoints.GET_ADDRESS, data).then(response => {
      setAddresses(response?.data?.data);
    });
  };
  const handleEdit = address => {
    setOptionsVisible(false);
    navigation.navigate('EditAddress', {
      address,
      onAddressUpdated: fetchAddresses,
    });
  };

  const handleRemove = address_id => {
    setOptionsVisible(false);
    Alert.alert('Remove', 'Are You Sure?', [
      {
        text: 'Yes',
        onPress: () => {
          api
            .post(endPoints.DELETE_ADDRESS, {
              platform: 'android',
              user_id: 13,
              user_address_id: address_id,
            })
            .then(() => {
              Alert.alert('Removed', 'Address Removed Successfully!', [
                {
                  text: 'OK',
                  onPress: () => {
                    // Update the addresses state variable
                    setAddresses(prevAddresses =>
                      prevAddresses.filter(
                        address => address.id !== address_id,
                      ),
                    );
                  },
                },
              ]);
            });
        },
      },
      {text: 'No'},
    ]);
  };

  const toggleOptions = address => {
    if (selectedAddress === address && optionsVisible) {
      setOptionsVisible(false);
      setSelectedAddress(null);
    } else {
      setSelectedAddress(address);
      setOptionsVisible(true);
    }
  };

  const handleOutsidePress = () => {
    if (optionsVisible) {
      setOptionsVisible(false);
      setSelectedAddress(null);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handleOutsidePress}>
      <SafeAreaView style={{backgroundColor: '#e8e8e8', height: windowHeight}}>
        <TouchableOpacity
          style={styles.addAddressBtn}
          onPress={() =>
            navigation.navigate('AddAddress', {
              onAddressAdded: fetchAddresses,
            })
          }>
          <Text style={styles.addBtnText}>+ Add New Address</Text>
        </TouchableOpacity>
        <View style={styles.screenContainer}>
          <View style={styles.container}>
            <Text style={styles.label1}>
              {addresses.length} SAVED ADDRESSES
            </Text>
            <View style={styles.addressList}>
              <ScrollView>
                {addresses.map(address => (
                  <View key={address.id} style={styles.addressListItem}>
                    <View style={styles.introView}>
                      <View style={styles.headingView}>
                        <Text style={styles.nameText}>{address.name}</Text>
                        <View style={styles.addressType}>
                          <Text>{address.is_primary ? 'PRIMARY' : 'HOME'}</Text>
                        </View>
                      </View>
                      <TouchableOpacity
                        style={styles.menuBtn}
                        onPress={() => toggleOptions(address.id)}>
                        <ThreeDotMoreOptions height={25} width={25} />
                      </TouchableOpacity>
                      {selectedAddress === address.id && optionsVisible && (
                        <View ref={optionsBoxRef} style={styles.optionsBox}>
                          <TouchableOpacity
                            style={styles.option}
                            onPress={() => handleEdit(address)}>
                            <Text style={styles.optionText}>Edit</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={styles.option}
                            onPress={() => handleRemove(address?.id)}>
                            <Text style={styles.optionText}>Remove</Text>
                          </TouchableOpacity>
                        </View>
                      )}
                    </View>
                    <View style={styles.addressTextView}>
                      <Text style={styles.addressText}>
                        {address.address}, {address.landmark}, {address.area},{' '}
                        {address.city_name}, {address.state_name} -{' '}
                        {address.pin_code}
                      </Text>
                    </View>
                    <Text style={styles.mobileNumber}>
                      {address.mobile_number}
                    </Text>
                  </View>
                ))}
              </ScrollView>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  mobileNumber: {
    marginVertical: '3%',
    marginLeft: '3%',
    fontSize: 14,
    fontWeight: '600',
  },
  addressText: {
    color: 'black',
    fontSize: 14.5,
  },
  addressTextView: {
    marginTop: '2%',
    marginLeft: '3%',
    maxWidth: '70%',
  },
  addressType: {
    height: 23,
    width: 60,
    backgroundColor: '#e5e5e5',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    borderRadius: 3,
  },
  headingView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: '3%',
    marginTop: '3%',
    width: windowHeight * 0.233,
  },
  menuBtn: {
    marginRight: '2%',
    marginTop: '1%',
  },
  introView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nameText: {
    fontSize: 18,
    fontWeight: '700',
    color: 'black',
  },
  addressListItem: {
    width: '100%',
    backgroundColor: 'white',
    minHeight: windowHeight * 0.15,
    maxHeight: windowHeight * 0.2,
    marginVertical: '2%',
  },
  addressList: {
    height: windowHeight * 0.8,
  },
  label1: {
    marginLeft: '3%',
    fontSize: 12,
  },
  screenContainer: {
    marginTop: windowHeight * 0.06,
    marginBottom: '18%',
  },
  addBtnText: {
    color: colors.primaryColor,
    fontWeight: '900',
    fontSize: 16,
    marginLeft: '5%',
  },
  addAddressBtn: {
    width: '100%',
    backgroundColor: 'white',
    height: windowHeight * 0.05,
    position: 'absolute',
    top: 0,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    elevation: 5,
    borderTopWidth: 0.3,
  },
  container: {
    height: '100%',
    flexDirection: 'column',
    marginBottom: 0,
  },
  optionsBox: {
    position: 'absolute',
    top: 30,
    right: 0,
    backgroundColor: 'white',
    borderRadius: 5,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  option: {
    padding: 10,
  },
  optionText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Address;
