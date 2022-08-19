import {SafeAreaView, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import {COLORS, DATABASE_URL} from '../constants';
import {firebase} from '@react-native-firebase/database';
import Header from '../components/Header';
import OrderList from '../components/OrderList';

const Order = ({navigation}) => {
  const user = 1;
  const [orders, setOrders] = useState([]);
  const ordersReference = firebase.app().database(DATABASE_URL).ref('/Orders/');

  useEffect(() => {
    let array = [];
    if (user) {
      ordersReference.on('value', snapshot => {
        snapshot.forEach(item => {
          var snapshotItem = item.val();
          if (snapshotItem != null && snapshotItem.uid === user) {
            array.push(snapshotItem);
          }
        });
        setOrders(array);
        console.log(orders);
        array = [];
      });
    } else {
      setOrders([]);
    }
  }, []);

  function deleteOrder(oid) {
    firebase
      .app()
      .database(DATABASE_URL)
      .ref('/Orders/' + oid)
      .remove();
  }

  return (
    <SafeAreaView
      style={{backgroundColor: COLORS.lightGray4, flex: 1, paddingTop: 3}}>
      <Header navigation={navigation} title={'Order'} />
      <OrderList
        navigation={navigation}
        orders={orders}
        deleteOrder={deleteOrder}
      />
    </SafeAreaView>
  );
};

export default Order;
