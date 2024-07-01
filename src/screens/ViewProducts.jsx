// ViewProducts.js
import React, {useLayoutEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {colors} from '../utils/constants';
import GroupedImages from '../components/GroupedImages';
import api, {getImageUrl} from '../utils/api';
import {endPoints} from '../utils/endpoints';
import RightArrow from '../icons/RightArrow';
import SearchContainer from '../components/searchContainer';

const windowHeight = Dimensions.get('window').height;

const ViewProducts = ({navigation}) => {
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
    <ScrollView style={styles.screenContainer}>
      <View style={styles.container}>
        {/* here ends the Search container area */}
        <View style={styles.menuContainer}>
          <ScrollView style={styles.ordersList}>
            {filteredOrders.map(order => (
              <TouchableOpacity
                key={order.order_id}
                onPress={() => {
                  navigation.navigate('ProductDetails');
                }}
                style={styles.menuItemContainer}>
                <View style={styles.menuItem}>
                  <GroupedImages
                    src={[getImageUrl(order.products[0].product_image)]}
                    totalImages={order?.payment_details?.total_items}
                  />
                  <View style={styles.menuItemTextContainer}>
                    <View style={styles.detailsText}>
                      <Text style={styles.orderTitle}>
                        {order.products[0].product_name}
                      </Text>
                      <Text style={styles.orderDesc}>
                        {order.products[0].item_quantity} Quantity
                      </Text>
                      <Text style={styles.orderDate}>Rs 100</Text>
                    </View>
                  </View>
                </View>
                <Text style={styles.lastText}>Delivery Charges rs 10</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  lastText: {
    marginLeft: '4%',
    marginBottom: '2%',
    fontWeight: '600',
    color: 'black',
  },
  screenContainer: {height: windowHeight},
  orderImgItem: {
    width: 27,
    margin: '2%',
    height: 27,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  orderImg: {
    width: '17%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ordersList: {marginBottom: '10%'},
  orderTitle: {
    width: '100%',
    fontSize: 20,
    color: 'black',
  },
  orderDesc: {
    fontSize: 15,
  },
  orderDate: {
    fontSize: 12,
  },
  detailsText: {
    flexDirection: 'column',
    marginLeft: '5%',
    marginRight: '5%',
    width: '90%',
    justifyContent: 'center',
    paddingLeft: '2%',
    paddingRight: '2%',
    height: 80,
  },
  menuItemTextContainer: {
    width: '85%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuContainer: {
    width: '100%',
    height: windowHeight - 40,
  },
  menuItemContainer: {
    borderTopColor: colors.lightBorderColor,
    borderBottomColor: colors.lightBorderColor,
    borderBottomWidth: 0.6,
    borderTopWidth: 0.6,
    flexDirection: 'column',
  },
  menuItem: {
    flexDirection: 'row',
    paddingHorizontal: '5%',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 110,
    width: '100%',
  },
  menuText: {
    marginLeft: 10,
    fontSize: 18,
    color: 'black',
  },
  container: {
    backgroundColor: colors.whiteColor,
    height: windowHeight - 80,
    flexDirection: 'column',
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
    flex: 4,
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
    fontSize: 14,
    marginTop: 10,
    marginBottom: 10,
    alignSelf: 'flex-end',
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
    fontSize: 14,
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
  },
});

export default ViewProducts;
