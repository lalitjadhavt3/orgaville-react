import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import MapMarkerIcon from '../icons/MapMarkerIcon';
import {colors} from '../utils/constants';

const DeliveryLocation = ({
  userName = 'Lalit Jadhav',
  addressType = 'Home',
  pinCode = '424201',
  onPress,
}) => {
  const truncatedUserName =
    userName.length > 9 ? `${userName.substring(0, 9)}...` : userName;

  return (
    <View style={styles.deliveryContainer}>
      <View style={styles.deliveryTitleContainer}>
        <Text style={styles.deliveryTitle}>Delivery Location</Text>
      </View>
      <View style={styles.deliveryInfoContainer}>
        <View
          style={{
            width: 30,
            height: 30,
            backgroundColor: colors.primaryColor,
            borderColor: 'black',
            borderRadius: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <MapMarkerIcon size={20} color={colors.whiteColor} />
        </View>
        <View style={styles.addressContainer}>
          <View style={styles.addressInfo}>
            <Text style={styles.deliveryUserName}>{truncatedUserName}</Text>
            <Text style={styles.pinCode}>{pinCode}</Text>
            <View style={styles.addressTypeChip}>
              <Text style={styles.addressTypeText}>{addressType}</Text>
            </View>
          </View>
          <View style={styles.addressInfo}>
            <Text style={styles.addressTypeText}>
              PLot no 443,31231, 123123,
            </Text>
          </View>
        </View>
        <TouchableOpacity onPress={onPress} style={styles.changeButton}>
          <Text style={styles.changeButtonText}>Change</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  deliveryContainer: {
    padding: 16,
    backgroundColor: '#fff',
  },
  deliveryTitleContainer: {
    marginBottom: 8,
  },
  deliveryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  deliveryInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mapMarkerIcon: {
    marginRight: 8,
  },
  addressContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  addressInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: '5%',
  },
  deliveryUserName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  deliveryAddress: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  pinCode: {
    fontSize: 16,
  },
  addressTypeChip: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 5,
    backgroundColor: '#eee',
    alignSelf: 'flex-start',
    marginHorizontal: '5%',
  },
  addressTypeText: {
    fontSize: 14,
  },
  changeButton: {
    padding: '2%',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 4,
    borderColor: '#eed',
  },
  changeButtonText: {
    color: '#007BFF',
    fontSize: 14,
  },
});

export default DeliveryLocation;
