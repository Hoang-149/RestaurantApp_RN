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
import {DATABASE_URL, categoryData} from '../constants';
import {firebase} from '@react-native-firebase/database';
import Header from '../components/Header';
import MenuList from '../components/MenuList';

const Favourites = ({navigation}) => {
  const user = 1;

  const [favorites, setFavorites] = useState([]);
  const favouriteReference = firebase
    .app()
    .database(DATABASE_URL)
    .ref('/Favorite/');

  useEffect(() => {
    let array = [];
    if (user) {
      favouriteReference.on('value', snapshot => {
        snapshot.forEach(item => {
          var snapshotItem = item.val();
          if (snapshotItem != null && snapshotItem.uid === user) {
            array.push(snapshotItem);
          }
        });
        setFavorites(array);
        array = [];
      });
    } else {
      setFavorites([]);
    }
  }, []);

  function removeFavourite(favouriteItemName) {
    firebase
      .app()
      .database(DATABASE_URL)
      .ref('/Favorite/' + favouriteItemName.name)
      .remove();
  }

  return (
    <SafeAreaView
      style={{backgroundColor: COLORS.lightGray4, flex: 1, paddingTop: 3}}>
      <Header navigation={navigation} title={'Favourites'} />
      {favorites.length > 0 ? (
        <MenuList
          navigation={navigation}
          menu={favorites}
          onPressFavourite={removeFavourite}
          favorites={favorites.map(item => item.name)}
          categories={categoryData}
          categorySelected={true}
        />
      ) : (
        <View>
          <Text style={{...FONTS.h4}}>Nothing added to Favourites</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Favourites;
