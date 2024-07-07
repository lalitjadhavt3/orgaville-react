import React, {useState, useLayoutEffect, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import SelectDropdown from 'react-native-select-dropdown';
import {colors} from '../utils/constants';
import {Home} from '../icons';
import BagIcon from '../icons/BagIcon';
import {endPoints} from '../utils/endpoints';
import api from '../utils/api';

const EditAddress = ({route, navigation}) => {
  const address = route.params.address;
  const onAddressUpdated = route.params.onAddressUpdated;
  const [pinCodes, setPinCodes] = useState([]);
  const [filteredPinCodes, setFilteredPinCodes] = useState([]);
  const [addressType, setAddressType] = useState(
    address.is_primary ? 'Work' : 'Home',
  );
  const [name, setName] = useState(address.name);
  const [phoneNumber, setPhoneNumber] = useState(address.mobile_number);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState(address.state_id);
  const [selectedCity, setSelectedCity] = useState(address.city_id);
  const [pincode, setPincode] = useState(address.pin_code);
  const [selectedPincode, setSelectedPincode] = useState(null);
  const [houseNumber, setHouseNumber] = useState(address.address);
  const [area, setArea] = useState(address.area);

  const pincodeDropdownRef = useRef();

  useLayoutEffect(() => {
    const fetchData = async () => {
      try {
        const data = {
          platform: 'android',
        };
        const pincodeResponse = await api.post(endPoints.GET_PINCODES, data);
        const pincodes = pincodeResponse?.data?.data || [];
        setPinCodes(pincodes);
        setFilteredPinCodes(pincodes);

        const stateResponse = await api.post(
          'https://orgaville.com/latest_apis/get_state.php',
        );
        setStates(stateResponse?.data?.data || []);

        const cityResponse = await api.post(
          'https://orgaville.com/latest_apis/get_cities.php',
        );
        setCities(cityResponse?.data?.data || []);
      } catch (error) {
        console.error('Error fetching data:', error);
        Alert.alert('Error', 'Failed to fetch data. Please try again.');
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (pinCodes.length > 0) {
      const defaultPincode = pinCodes.find(pc => pc.pc === address.pin_code);
      if (defaultPincode) {
        setSelectedPincode(defaultPincode);
        setPincode(defaultPincode.pc);
      }
    }
  }, [pinCodes, address.pin_code]);

  const handleUpdateAddress = () => {
    if (
      !name ||
      !phoneNumber ||
      !selectedState ||
      !selectedCity ||
      !pincode ||
      !houseNumber ||
      !area
    ) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }

    const addressData = {
      user_id: address.user_id,
      user_address_id: address.id,
      name,
      address: houseNumber,
      pin_code: pincode,
      area,
      city_id: selectedCity,
      state_id: selectedState,
      mobile_number: phoneNumber,
      address_type: addressType,
    };

    api
      .post(endPoints.UPDATE_ADDRESS, addressData)
      .then(() => {
        Alert.alert('Successful', 'Address Updated Successfully');
        onAddressUpdated();
        navigation.goBack();
      })
      .catch(error => {
        console.error('Error updating address:', error);
        Alert.alert('Error', 'Failed to update address. Please try again.');
      });
  };

  const handlePincodeSearch = text => {
    if (text.length > 0) {
      const filtered = pinCodes.filter(item => item.pc.startsWith(text));
      setFilteredPinCodes(filtered);
      if (filtered.length === 0) {
        Alert.alert(
          'Pincode Not Available',
          'The entered pincode is not available.',
          [
            {
              text: 'OK',
              onPress: () => {
                pincodeDropdownRef.current?.reset();
                setFilteredPinCodes(pinCodes);
              },
            },
          ],
        );
      }
    } else {
      setFilteredPinCodes(pinCodes);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Full Name (Required) *"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone number (Required) *"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />

        <SelectDropdown
          data={states}
          onSelect={selectedItem => setSelectedState(selectedItem.id)}
          buttonTextAfterSelection={selectedItem => selectedItem.name}
          rowTextForSelection={item => item.name}
          defaultButtonText="Select State"
          buttonStyle={styles.dropdownButton}
          buttonTextStyle={styles.dropdownButtonText}
          dropdownStyle={styles.dropdown}
          rowStyle={styles.dropdownRow}
          rowTextStyle={styles.dropdownRowText}
          defaultValue={states.find(state => state.id == address.state_id)}
        />

        <SelectDropdown
          data={cities}
          onSelect={selectedItem => setSelectedCity(selectedItem.id)}
          buttonTextAfterSelection={selectedItem => selectedItem.name}
          rowTextForSelection={item => item.name}
          defaultButtonText="Select City"
          buttonStyle={styles.dropdownButton}
          buttonTextStyle={styles.dropdownButtonText}
          dropdownStyle={styles.dropdown}
          rowStyle={styles.dropdownRow}
          rowTextStyle={styles.dropdownRowText}
          defaultValue={cities.find(city => city.id == address.city_id)}
        />

        <SelectDropdown
          ref={pincodeDropdownRef}
          data={filteredPinCodes}
          onSelect={selectedItem => {
            setSelectedPincode(selectedItem);
            setPincode(selectedItem.pc);
          }}
          defaultButtonText="Select Pincode"
          buttonTextAfterSelection={selectedItem => selectedItem.pc}
          rowTextForSelection={item => item.pc}
          buttonStyle={styles.dropdownButton}
          buttonTextStyle={styles.dropdownButtonText}
          dropdownStyle={styles.dropdown}
          rowStyle={styles.dropdownRow}
          rowTextStyle={styles.dropdownRowText}
          search
          searchPlaceHolder="Search Pincode"
          searchInputStyle={styles.searchInput}
          searchInputTxtColor="#333"
          onChangeSearchInputText={handlePincodeSearch}
        />

        <TextInput
          style={styles.input}
          placeholder="House No., Building Name (Required) *"
          value={houseNumber}
          onChangeText={setHouseNumber}
        />
        <TextInput
          style={styles.input}
          placeholder="Road name, Area, Colony (Required) *"
          value={area}
          onChangeText={setArea}
        />

        <Text style={styles.label}>Type of address</Text>
        <View style={styles.addressTypeContainer}>
          <TouchableOpacity
            style={[
              styles.addressTypeButton,
              addressType === 'Home' && styles.activeAddressType,
            ]}
            onPress={() => setAddressType('Home')}>
            <Home height={15} width={15} />
            <Text
              style={[
                styles.addressTypeText,
                addressType === 'Home' && styles.activeAddressTypeText,
              ]}>
              Home
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.addressTypeButton,
              addressType === 'Work' && styles.activeAddressType,
            ]}
            onPress={() => setAddressType('Work')}>
            <BagIcon size={15} />
            <Text
              style={[
                styles.addressTypeText,
                addressType === 'Work' && styles.activeAddressTypeText,
              ]}>
              Work
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleUpdateAddress}>
          <Text style={styles.saveButtonText}>Update Address</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
  form: {
    padding: 16,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 4,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  dropdownButton: {
    width: '100%',
    height: 50,
    backgroundColor: 'white',
    borderRadius: 4,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  dropdownButtonText: {
    fontSize: 16,
    color: 'gray',
  },
  dropdown: {
    backgroundColor: 'white',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  dropdownRow: {
    backgroundColor: 'white',
    borderBottomColor: '#E0E0E0',
    borderBottomWidth: 1,
    padding: 10,
  },
  dropdownRowText: {
    fontSize: 16,
    color: 'black',
  },
  searchInput: {
    backgroundColor: '#F0F0F0',
    borderRadius: 4,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  addressTypeContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  addressTypeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 20,
    marginRight: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  activeAddressType: {
    borderColor: colors.primaryColor,
    borderWidth: 1,
  },
  addressTypeText: {
    marginLeft: 8,
    color: 'gray',
  },
  activeAddressTypeText: {
    color: colors.primaryColor,
  },
  saveButton: {
    backgroundColor: '#FF5722',
    padding: 16,
    borderRadius: 4,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EditAddress;
