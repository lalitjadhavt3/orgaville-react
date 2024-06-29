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
import SearchIcon from '../icons/Search';
import FilterIcon from '../icons/Filter';

const windowHeight = Dimensions.get('window').height;

const Orders = ({navigation}) => {
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
        <View style={styles.searchContainer}>
          <View style={styles.searchBarContainer}>
            <SearchIcon width={24} height={24} />
            <TextInput
              style={styles.searchBar}
              placeholder="Search Here"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <TouchableOpacity style={styles.filterBtn}>
            <FilterIcon width={24} height={24} />
            <Text style={styles.menuText}>Filters</Text>
          </TouchableOpacity>
        </View>
        {/* here ends the Search container area */}
        <View style={styles.menuContainer}>
          <ScrollView style={styles.ordersList}>
            {filteredOrders.map(order => (
              <TouchableOpacity
                key={order.order_id}
                style={styles.menuItem}
                onPress={() => {
                  navigation.navigate('OrderDetails');
                }}>
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
                      {order.products[0].short_description}
                    </Text>
                    <Text style={styles.orderDate}>
                      Ordered On {order.delivery_details.date}
                    </Text>
                  </View>
                  <RightArrow width={24} height={24} />
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
    width: '80%',
    justifyContent: 'center',
    paddingLeft: '2%',
    paddingRight: '2%',
    height: 80,
  },
  filterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    height: 50,
    width: '17%',
    marginRight: '4%',
  },
  searchContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    height: 60,
    width: '100%',
    justifyContent: 'space-between',
  },
  searchBar: {
    width: '82%',
    height: 100,
  },
  searchBarContainer: {
    width: '70%',
    height: 50,
    borderRadius: 10,
    borderColor: 'grey',
    borderWidth: 0.7,
    marginLeft: '4%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  btnStyle: {},
  screenContainer: {},
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
  menuItemTextContainer: {
    width: '85%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuContainer: {
    width: '100%',
    paddingBottom: '4%',
  },
  menuItem: {
    flexDirection: 'row',
    paddingHorizontal: '5%',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 120,
    width: '100%',
    borderTopColor: 'lightgrey',
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
    borderTopWidth: 1,
  },
  menuText: {
    marginLeft: 10,
    fontSize: 18,
    color: 'black',
  },
  container: {
    paddingVertical: '1%',
    backgroundColor: colors.whiteColor,
    height: windowHeight - 58,
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

export default Orders;
