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
import {CustomButton} from './CustomButton';

const OrderList = ({navigation, orders, deleteOrder}) => {
  function displayOrderItems(item) {
    var items = '';
    for (let i = 1; i <= item.totalItems; i++) {
      items = items + item[`item${i}`] + '\n';
    }
    return items;
  }

  const renderItem = ({item, index}) => {
    return (
      <View
        style={{
          backgroundColor: COLORS.white,
          borderRadius: 30,
          width: SIZES.width - 45,
          elevation: 3,
          margin: 8,
          padding: SIZES.padding,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderBottomWidth: 2,
            borderBottomColor: COLORS.lightGray4,
            paddingVertical: 8,
          }}>
          <Text
            style={{
              ...FONTS.h3,
              fontWeight: '700',
            }}>
            Order: {index + 1}
          </Text>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <Image
              source={icons.time}
              resizeMode="contain"
              style={{
                width: 20,
                height: 20,
                tintColor: COLORS.primary,
              }}
            />
            <Text
              style={{
                ...FONTS.body4,
                color: COLORS.black,
                marginLeft: 4,
              }}>
              {item.time} mins
            </Text>
          </View>
        </View>
        <View
          style={{
            borderBottomWidth: 2,
            borderBottomColor: COLORS.lightGray4,
            paddingTop: 12,
          }}>
          <Text
            style={{
              ...FONTS.body3,
              color: COLORS.black,
              textAlign: 'left',
            }}>
            {displayOrderItems(item)}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderBottomWidth: 2,
            borderBottomColor: COLORS.lightGray4,
            paddingVertical: 12,
          }}>
          <Text
            style={{
              ...FONTS.body3,
              color: COLORS.black,
            }}>
            Total:
          </Text>
          <Text
            style={{
              ...FONTS.body2,
              color: COLORS.black,
            }}>
            {item.total}đ
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            paddingVertical: 12,
          }}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('OrderDelivery', {time: item.time + 10})
            }
            style={{
              backgroundColor: COLORS.primary,
              borderRadius: 30,
              padding: 12,
            }}>
            <Text
              style={{
                color: COLORS.white,
                ...FONTS.body3,
              }}>
              Track Order
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => deleteOrder(item.oid)}
            style={{
              backgroundColor: 'red',
              borderRadius: 30,
              padding: 12,
            }}>
            <Text
              style={{
                color: COLORS.white,
                ...FONTS.body3,
              }}>
              Cancel Order
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View
      style={{
        flex: 1,
      }}>
      <FlatList
        data={orders}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{
          padding: 16,
        }}
      />
    </View>
  );
};

export default OrderList;
