import React, {useLayoutEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {colors} from '../utils/constants';
import GroupedImages from '../components/GroupedImages';
import api, {getImageUrl} from '../utils/api';
import {endPoints} from '../utils/endpoints';
import RightArrow from '../icons/RightArrow';
import {SafeAreaView} from 'react-native-safe-area-context';

const windowHeight = Dimensions.get('window').height;

const OrderDetails = ({navigation}) => {
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useLayoutEffect(() => {
    const data = {
      platform: 'android',
      user_id: 13,
      no_of_records: 10,
      page_number: 1,
    };
    api.post(endPoints.ORDERS, data).then(response => {
      setOrders(response?.data?.data);
    });
  }, []);

  const filteredOrders = orders.filter(order =>
    order.products[0].product_name
      .toLowerCase()
      .includes(searchQuery.toLowerCase()),
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.mainContainer}>
        {/* order id container starts */}
        <View style={styles.orderIdContainer}>
          <Text style={styles.orderIdText}>
            <Text style={{fontWeight: 'bold'}}>Order ID :</Text> 204945055960
          </Text>
        </View>
        <View style={styles.mainContent}>
          {/* the main heading starts */}
          <View style={styles.headingRow}>
            <Text style={styles.headingMain}>Total 1 Items</Text>
            <TouchableOpacity style={styles.viewallBtn}>
              <Text style={styles.viewBtnText}>View All</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  viewBtnText: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.primaryColor,
  },
  viewallBtn: {
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    marginRight: '3%',
    borderWidth: 0.7,
    borderColor: 'grey',
    borderRadius: 5,
  },
  headingMain: {
    marginLeft: '3%',
    fontSize: 19,
    fontWeight: 'bold',
    color: 'black',
  },
  headingRow: {
    marginTop: '3%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mainContent: {
    margin: '2%',
  },
  orderIdContainer: {
    height: 40,
    borderColor: 'grey',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    justifyContent: 'center',
  },
  mainContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
  orderIdText: {
    marginLeft: '4%',
  },
  avatarsDefaultWithBackdropParent: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: '5%',
  },
  avatarsDefaultWithBackdrop: {
    width: 60,
    height: 60,
  },
  userGreet: {
    marginLeft: '5%',
    fontSize: 20,
    fontFamily: 'Poppins-Medium',
    color: 'black',
    fontWeight: 'bold',
  },
  userEmail: {fontSize: 15, marginLeft: '5%'},
  iconlyWrapper: {
    padding: 3,
    borderRadius: 20,
    backgroundColor: '#fff',
  },
  header: {
    height: 100,
    backgroundColor: 'red',
    flex: 1,
    zIndex: 199,
  },
  container: {
    backgroundColor: colors.whiteColor,
    height: windowHeight,
    flexDirection: 'column',
  },
});

export default OrderDetails;
