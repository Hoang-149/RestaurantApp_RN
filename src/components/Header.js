import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {images, COLORS, SIZES, FONTS, icons} from '../constants';
import CartIcon from './CartIcon';

const Header = ({navigation, title}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 50,
        alignItems: 'center',
        backgroundColor: COLORS.lightGray4,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.lightGray3,
        paddingHorizontal: 12,
      }}>
      <Text
        style={{
          ...FONTS.h2,
          fontWeight: '700',
        }}>
        {title}
      </Text>
      <CartIcon navigation={navigation} />
    </View>
  );
};

export default Header;
