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

const CartItems = ({
  navigation,
  cartlist,
  onPressRemoveCart,
  changeQty,
  getTotalCart,
  confirmOrder,
}) => {
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Restaurant', {
            currentItem: item,
            currentCategory: item.category,
          })
        }
        style={{
          margin: 8,
          elevation: 3,
          width: SIZES.width - 45,
          height: 100,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.white,
          alignSelf: 'center',
        }}>
        <Image
          source={{
            uri: item.photoUrl,
          }}
          resizeMode="contain"
          style={{
            position: 'absolute',
            marginLeft: 8,
            width: '30%',
            height: '100%',
            borderRadius: SIZES.radius,
          }}
        />
        <View
          style={{
            padding: SIZES.padding,
            position: 'absolute',
            right: 0,
            height: '100%',
            width: '65%',
          }}>
          <View
            style={{
              flexDirection: 'column',
            }}>
            <Text
              style={{
                ...FONTS.h3,
                width: SIZES.width - SIZES.padding * 21,
              }}>
              {item.name}
            </Text>
            <Text
              style={{
                ...FONTS.h4,
                color: COLORS.primary,
              }}>
              {item.price}đ
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => onPressRemoveCart(item)}
            style={{
              position: 'absolute',
              right: 5,
              top: 5,
            }}>
            <Image
              source={icons.dlt}
              resizeMode="contain"
              style={{
                width: 40,
                height: 40,
                tintColor: 'red',
              }}
            />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              position: 'absolute',
              bottom: 10,
              right: 5,
              backgroundColor: COLORS.lightGray3,
              height: 40,
              borderRadius: 30,
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                changeQty(item, '-');
              }}
              style={{
                width: 30,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  ...FONTS.body2,
                  color: COLORS.black,
                }}>
                –
              </Text>
            </TouchableOpacity>
            <View
              style={{
                alignItems: 'center',
                width: 30,
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  ...FONTS.body2,
                  color: COLORS.black,
                }}>
                {item.qty}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                changeQty(item, '+');
              }}
              style={{
                width: 30,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  ...FONTS.body2,
                  color: COLORS.black,
                }}>
                +
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={cartlist}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={{
          padding: 16,
        }}
      />
      {getTotalCart() > 0 ? (
        <View
          style={{
            position: 'absolute',
            backgroundColor: COLORS.white,
            bottom: 0,
            left: 0,
            right: 0,
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
            elevation: 5,
            shadowOpacity: 0.1,
            shadowRadius: 3,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: SIZES.padding * 2,
              marginHorizontal: SIZES.padding * 3,
              borderBottomColor: COLORS.lightGray,
              borderBottomWidth: 2,
            }}>
            <Text
              style={{
                ...FONTS.h2,
                fontWeight: '700',
              }}>
              Total:
            </Text>
            <Text
              style={{
                ...FONTS.h3,
                fontWeight: '600',
              }}>
              {getTotalCart()}đ
            </Text>
          </View>
          <View
            style={{
              padding: SIZES.padding * 2,
            }}>
            <CustomButton
              text={'Confirm Order'}
              onPressButton={() => confirmOrder()}
            />
          </View>
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            alignSelf: 'center',
          }}>
          <Text style={{...FONTS.h4}}>Your Cart is empty!</Text>
        </View>
      )}
    </View>
  );
};

export default CartItems;
