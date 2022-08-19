import {SafeAreaView} from 'react-native';
import React, {useState, useEffect} from 'react';
import HomeHeader from '../components/HomeHeader';
import CategoriesList from '../components/CategoriesList';
import {COLORS, categoryData, DATABASE_URL} from '../constants';
import MenuList from '../components/MenuList';
import {firebase} from '@react-native-firebase/database';
import {firebaseConfig} from '../config/firebase';

const Home = ({navigation}) => {
  const user = 1;
  // firebase.initializeApp(firebaseConfig);

  const [menu, setMenu] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [categorySelected, setCategorySelected] = useState(false);
  const menuReference = firebase.app().database(DATABASE_URL).ref('/Menu/');

  useEffect(() => {
    let array = [];
    menuReference.on('value', snapshot => {
      snapshot.forEach(item => {
        var snapshotItem = item.val();
        array.push(snapshotItem);
      });
      setMenu(array);
      array = [];
      // console.log(menu);
    });
    getFavorites();
    setCategorySelected(false);
    setSelectedCategory(null);
  }, []);

  function onSelectedCategory(category) {
    setCategorySelected(true);
    let array = [];
    menuReference.on('value', snapshot => {
      snapshot.forEach(item => {
        var snapshotItem = item.val();
        if (snapshotItem.category == category.id) {
          array.push(snapshotItem);
        }
      });
      setMenu(array);
    });
    setSelectedCategory(category);
  }

  function getFavorites() {
    let array = [];
    const favouriteReference = firebase
      .app()
      .database(DATABASE_URL)
      .ref('/Favorite/');

    favouriteReference.on('value', snapshot => {
      snapshot.forEach(item => {
        var snapshotItem = item.val();
        if (snapshotItem != null && snapshotItem.uid === user) {
          array.push(snapshotItem.name);
        }
      });
      setFavorites(array);
      array = [];
    });
  }

  function addToFavourite(favouriteItem) {
    const REFERENCE_URL = '/Favorite/' + favouriteItem.name;
    const favouriteReference = firebase
      .app()
      .database(DATABASE_URL)
      .ref(REFERENCE_URL);

    favouriteReference.once('value').then(snapshot => {
      var item = snapshot.val();
      if (item != null) {
        firebase.app().database(DATABASE_URL).ref(REFERENCE_URL).remove();
        setFavorites(favorites.filter(a => a != item.name));
      } else {
        favouriteReference
          .set({...favouriteItem, uid: user})
          .then(() => {
            console.log('Added to favourite');
          })
          .catch(e => console.log(e));
        setFavorites([...favorites, favouriteItem.name]);
      }
    });
  }

  function searchMenu(text) {
    let array = [];
    menuReference.on('value', snapshot => {
      snapshot.forEach(item => {
        var snapshotItem = item.val();
        if (snapshotItem.name.toLowerCase().includes(text.toLowerCase())) {
          array.push(snapshotItem);
        }
      });
      setMenu(array);
      array = [];
    });
  }

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: COLORS.lightGray4, paddingTop: 2}}>
      <HomeHeader navigation={navigation} searchMenu={searchMenu} />
      <CategoriesList
        categories={categoryData}
        onSelectedCategory={onSelectedCategory}
        selectedCategory={selectedCategory}
      />
      <MenuList
        navigation={navigation}
        menu={menu}
        onPressFavourite={addToFavourite}
        favorites={favorites}
        categories={categoryData}
        categorySelected={categorySelected}
      />
    </SafeAreaView>
  );
};

export default Home;
