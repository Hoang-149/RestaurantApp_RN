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
import {CustomButton} from '../components/CustomButton';
import {DATABASE_URL} from '../constants';
import {firebase} from '@react-native-firebase/database';
import CartIcon from '../components/CartIcon';

const Restaurant = ({route, navigation}) => {
  const user = 1;

  const [item, setItem] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    const {currentItem, currentCategory} = route.params;
    setItem(currentItem);
    setCategory(currentCategory.replace('\n', ' '));
    console.log(item);
  }, []);

  // function add to cart
  function addToCart() {
    const REFERENCE_URL = '/Cart/' + item?.name;
    const cartReference = firebase
      .app()
      .database(DATABASE_URL)
      .ref(REFERENCE_URL);
    if (user) {
      cartReference
        .set({
          ...item,
          uid: user,
          total: item?.price,
          qty: 1,
          category: category,
        })
        .then(() => console.log('Added to Cart'))
        .catch(e => console.log(e));
    } else {
      alert('Please log in!');
    }
  }

  function renderHeader() {
    return (
      <View style={{flexDirection: 'row', height: 50, paddingHorizontal: 5}}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            width: 50,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={icons.back}
            resizeMode="contain"
            style={{width: 25, height: 25, tintColor: COLORS.black}}
          />
        </TouchableOpacity>
        <View
          style={{
            backgroundColor: COLORS.lightGray3,
            flex: 1,
            borderRadius: SIZES.radius,
            marginHorizontal: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{...FONTS.h3}}>{category}</Text>
        </View>
        <TouchableOpacity
          style={{
            width: 50,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <CartIcon navigation={navigation} />
        </TouchableOpacity>
      </View>
    );
  }
  function renderFoodInfor() {
    return (
      <>
        <View style={{alignItems: 'center'}}>
          <View
            style={{
              height: SIZES.height * 0.3,
              marginTop: 25,
              paddingBottom: 20,
            }}>
            <Image
              source={{
                uri: item?.photoUrl,
              }}
              resizeMode="contain"
              style={{
                width: SIZES.width - 24,
                height: '95%',
              }}
            />
          </View>
        </View>
        <View
          style={{
            backgroundColor: COLORS.white,
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
            position: 'absolute',
            bottom: 0,
            right: 0,
            left: 0,
            elevation: 5,
            shadowOpacity: 0.1,
            shadowRadius: 3,
          }}>
          <Text
            style={{
              ...FONTS.h1,
              textAlign: 'center',
              paddingVertical: SIZES.padding * 2,
              paddingHorizontal: SIZES.padding * 3,
              borderBottomWidth: 1,
              borderBottomColor: COLORS.lightGray3,
            }}>
            {item.name}
          </Text>
          <Text
            style={{
              ...FONTS.h4,
              paddingVertical: SIZES.padding * 2,
              paddingHorizontal: SIZES.padding * 3,
              color: COLORS.black,
              textAlign: 'center',
              borderBottomWidth: 1,
              borderBottomColor: COLORS.lightGray3,
            }}>
            {item.description}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: SIZES.padding * 2,
              paddingHorizontal: SIZES.padding * 3,
            }}>
            <Text
              style={{
                ...FONTS.h4,
                marginLeft: SIZES.padding,
              }}>
              Duration:
            </Text>
            <Text
              style={{
                ...FONTS.h4,
                marginLeft: SIZES.padding,
              }}>
              {item.duration}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: SIZES.padding * 2,
              paddingHorizontal: SIZES.padding * 3,
            }}>
            <Text
              style={{
                ...FONTS.h3,
                color: COLORS.black,
                marginLeft: SIZES.padding,
              }}>
              {item.price}đ
            </Text>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Image
                source={icons.star}
                resizeMode="contain"
                style={{
                  width: 23,
                  height: 23,
                }}
              />
              <Text
                style={{
                  ...FONTS.h4,
                  marginLeft: SIZES.padding,
                }}>
                {item.rating}
              </Text>
            </View>
          </View>
          <View style={{margin: SIZES.padding * 2, marginTop: 30}}>
            <CustomButton
              text={'Add to Cart'}
              onPressButton={() => addToCart()}
            />
          </View>
        </View>
      </>
    );
  }
  return (
    <SafeAreaView
      style={{flex: 1, paddingTop: 5, backgroundColor: COLORS.lightGray4}}>
      {renderHeader()}
      {renderFoodInfor()}
    </SafeAreaView>
  );
};

export default Restaurant;
