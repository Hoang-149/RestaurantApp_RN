import {View, Text, Image, TextInput, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import {images, COLORS, SIZES, FONTS, icons, DATABASE_URL} from '../constants';
import {firebase} from '@react-native-firebase/database';

const CartIcon = ({navigation}) => {
  const user = 1;

  const [cartItemNum, setCartItemNum] = useState(0);
  const cartReference = firebase.app().database(DATABASE_URL).ref('/Cart/');

  useEffect(() => {
    if (user) {
      cartReference.on('value', snapshot => {
        setCartItemNum(snapshot.numChildren());
      });
    } else {
      setCartItemNum(0);
    }
  });

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Cart')}
      style={{
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Image source={icons.cart} style={{width: 35, height: 35}} />

      {/* cart items number */}
      <View
        style={{
          position: 'absolute',
          backgroundColor: 'red',
          top: -7,
          right: 0,
          width: 18,
          height: 18,
          borderRadius: 18,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            ...FONTS.body4,
            color: COLORS.white,
          }}>
          {cartItemNum}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CartIcon;
