import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Animated,
} from 'react-native';

const AddressModal = ({visible, onClose, addresses, onSubmit}) => {
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [pincode, setPincode] = useState('');
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, slideAnim]);

  const handleAddressSelect = address => {
    setSelectedAddress(address);
  };

  const handlePincodeSubmit = () => {
    if (onSubmit) {
      onSubmit(selectedAddress, pincode);
    }
  };

  const translateY = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [300, 0], // Adjust as needed for your design
  });

  const RadioButton = ({selected, onPress}) => {
    return (
      <TouchableOpacity onPress={onPress} style={styles.radioButton}>
        <View style={[styles.circle, selected && styles.selectedCircle]}>
          {selected && <View style={styles.innerCircle} />}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Modal
      transparent
      animationType="none"
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <Animated.View
          style={[styles.modalContainer, {transform: [{translateY}]}]}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Select Address</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeButton}>X</Text>
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.addressList}>
            {addresses.map((address, index) => (
              <TouchableOpacity
                key={index}
                style={styles.addressItem}
                onPress={() => handleAddressSelect(address)}>
                <RadioButton
                  selected={selectedAddress === address}
                  onPress={() => handleAddressSelect(address)}
                />
                <Text style={styles.addressText}>{address}</Text>
              </TouchableOpacity>
            ))}
            <View style={styles.pincodeContainer}>
              <TextInput
                style={styles.pincodeInput}
                placeholder="Enter Pincode"
                value={pincode}
                onChangeText={setPincode}
              />
              <TouchableOpacity
                style={styles.submitButton}
                onPress={handlePincodeSubmit}>
                <Text style={styles.submitButtonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '50%',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    fontSize: 18,
    color: 'black',
  },
  addressList: {
    marginTop: 10,
  },
  addressItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  addressText: {
    marginLeft: 10,
    fontSize: 16,
  },
  pincodeContainer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  pincodeInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 40,
    marginRight: 10,
  },
  submitButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  radioButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  circle: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#007BFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedCircle: {
    borderColor: '#007BFF',
  },
  innerCircle: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: '#007BFF',
  },
});

export default AddressModal;
