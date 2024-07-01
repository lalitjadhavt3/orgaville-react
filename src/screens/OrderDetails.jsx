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
import DownloadIcon from '../icons/DownloadIcon';
import RightArrow from '../icons/RightArrow';
import {SafeAreaView} from 'react-native-safe-area-context';
import GroceryCartItems from '../components/GroceryCartItems';
import OrderTracker from '../components/OrderTracker';

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
            <TouchableOpacity
              style={styles.viewallBtn}
              onPress={() => {
                navigation.navigate('ViewProducts');
              }}>
              <Text style={styles.viewBtnText}>View All</Text>
            </TouchableOpacity>
          </View>
          <GroceryCartItems showText={false} />
          <Text style={styles.priceHeading}>Rs.1000</Text>
          <View style={styles.invoiceView}>
            <Text style={styles.invoiceHeading}>Invoice</Text>
            <TouchableOpacity style={styles.downloadBtn}>
              <DownloadIcon height={30} width={30} />
            </TouchableOpacity>
          </View>
          <View style={styles.statusView}>
            <Text style={styles.statusText}>Status</Text>
            <OrderTracker status="Shipped" />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  statusView: {
    marginTop: '3%',
    marginLeft: '2%',
    borderBottomWidth: 1,
    borderColor: colors.lightBorderColor,
  },
  statusText: {
    fontSize: 20,
    marginTop: '5%',
    alignSelf: 'flex-start',
    fontWeight: 'bold',
    color: colors.inactiveColor,
    marginLeft: '3%',
  },
  downloadBtn: {
    width: 50,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.tertiaryColor,
    borderRadius: 6,
    marginRight: '3%',
  },
  invoiceHeading: {
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center',
    color: colors.tertiaryColor,
  },
  invoiceView: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    marginTop: '6%',
    marginLeft: '4%',
    marginRight: '4%',
    borderTopWidth: 0.9,
    borderBottomWidth: 0.9,
    borderColor: colors.lightBorderColor,
    justifyContent: 'space-between',
  },
  priceHeading: {
    fontSize: 20,
    marginLeft: '4%',
    fontWeight: '800',
    color: 'black',
    marginTop: '5%',
  },
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
    marginBottom: '4%',
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
