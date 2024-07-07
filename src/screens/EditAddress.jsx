import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '../utils/constants';
import {Home} from '../icons';
import BagIcon from '../icons/BagIcon';

const EditAddress = () => {
  const [addressType, setAddressType] = useState('Home');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.form}>
        <TextInput style={styles.input} placeholder="Full Name (Required) *" />
        <TextInput
          style={styles.input}
          placeholder="Phone number (Required) *"
          keyboardType="phone-pad"
        />

        <View style={styles.row}>
          <TextInput
            style={[styles.input, {width: '100%'}]}
            placeholder="State (Required) *"
          />
        </View>

        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.halfWidth]}
            placeholder="City (Required) *"
          />
          <TextInput
            style={[styles.input, styles.halfWidth]}
            placeholder="Pincode (Required) *"
            keyboardType="numeric"
          />
        </View>

        <TextInput
          style={styles.input}
          placeholder="House No., Building Name (Required) *"
        />
        <TextInput
          style={styles.input}
          placeholder="Road name, Area, Colony (Required) *"
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

        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save Address</Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#4285F4',
    padding: 16,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 16,
  },
  cartIconContainer: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
  },
  form: {
    padding: 16,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 4,
    padding: 12,
    marginBottom: 16,
  },
  link: {
    color: colors.primaryColor,
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  halfWidth: {
    width: '48%',
  },
  locationButton: {
    backgroundColor: '#4285F4',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 4,
    width: '48%',
  },
  locationButtonText: {
    color: 'white',
    marginLeft: 8,
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
