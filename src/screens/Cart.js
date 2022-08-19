import {SafeAreaView} from 'react-native';
import React, {useState, useEffect} from 'react';
import {COLORS, DATABASE_URL} from '../constants';
import {firebase} from '@react-native-firebase/database';
import HeaderCart from '../components/HeaderCart';
import CartItems from '../components/CartItems';

const Cart = ({navigation}) => {
  const user = 1;

  const [cart, setCart] = useState([]);
  const cartReference = firebase.app().database(DATABASE_URL).ref('/Cart/');

  useEffect(() => {
    let array = [];
    if (user) {
      cartReference.on('value', snapshot => {
        snapshot.forEach(item => {
          var snapshotItem = item.val();
          if (snapshotItem != null && snapshotItem.uid === user) {
            array.push(snapshotItem);
          }
        });
        setCart(array);
        array = [];
      });
    } else {
      setCart([]);
    }
  }, []);

  function removeItemCart(CartItemName) {
    firebase
      .app()
      .database(DATABASE_URL)
      .ref('/Cart/' + CartItemName.name)
      .remove();
  }

  function changeQty(item, action) {
    const itemReferece = firebase
      .app()
      .database(DATABASE_URL)
      .ref('/Cart/' + item.name);
    if (action == '+') {
      itemReferece
        .update({
          qty: item.qty + 1,
          total: (item.qty + 1) * item.price,
        })
        .then(() => {
          console.log('qty increased');
        });
    } else {
      if (item.qty > 1) {
        itemReferece
          .update({
            qty: item.qty - 1,
            total: (item.qty - 1) * item.price,
          })
          .then(() => {
            console.log('qty decreased');
          });
      }
    }
  }

  function getTotalCart() {
    let total = 0;
    if (cart != null) {
      total = cart.reduce((acc, item) => acc + (item.total || 0), 0);
    }
    return total;
  }

  function confirmOrder() {
    let durations = cart.map(item =>
      parseInt(
        item.duration.charAt(item.duration.length - 6) +
          item.duration.charAt(item.duration.length - 5),
      ),
    );
    let total_duration = durations.reduce((acc, item) => acc + (item || 0), 0);

    let array = [];
    const Oid = firebase.app().database(DATABASE_URL).ref('/Orders/').push();

    array.push({
      total: getTotalCart(),
      oid: Oid.key,
      totalItems: cart.length,
      uid: user,
      time: total_duration,
    });

    for (let i = 0; i < cart.length; i++) {
      var key = `item${i + 1}`;
      var obj = {};
      obj[key] = cart[i].qty + ' ' + cart[i].name + ' ' + cart[i].price + 'đ';
      array.push(obj);
    }

    Oid.set(Object.assign(...array));
    navigation.navigate('Tabs', {screen: 'Order'});
  }

  return (
    <SafeAreaView
      style={{backgroundColor: COLORS.lightGray4, flex: 1, paddingTop: 3}}>
      <HeaderCart navigation={navigation} title={'Cart'} />
      <CartItems
        cartlist={cart}
        navigation={navigation}
        onPressRemoveCart={removeItemCart}
        changeQty={changeQty}
        getTotalCart={getTotalCart}
        confirmOrder={confirmOrder}
      />
    </SafeAreaView>
  );
};

export default Cart;
