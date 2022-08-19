import {View, Text, Image} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {images, COLORS, SIZES, FONTS, icons} from '../constants';
import MapView, {Marker, Polyline, PROVIDER_GOOGLE} from 'react-native-maps';

const OrderDelivery = ({route}) => {
  const mapView = useRef(null);
  const [region, setRegion] = useState(null);
  const [duration, setDuration] = useState(0);
  const [fromLocation, setFromLocation] = useState({});
  const [toLocation, setToLocation] = useState({});
  const [streetName, setStreetName] = useState('');
  const [currentRestaurant, setCurrentRestaurant] = useState(null);
  const [coordinates, setCoordinates] = useState([]);

  useEffect(() => {
    let {time} = route.params;
    setDuration(time);

    const Location = {
      streetName: 'Street No. 07',
      myLocation: {
        latitude: 16.09209,
        longitude: 108.24672,
      },
      resLocation: {
        latitude: 16.046393,
        longitude: 108.224042,
      },
    };

    let fromLoc = Location.myLocation;
    let toLoc = Location.resLocation;
    let street = Location.streetName;
    let mapRegion = {
      latitude: (fromLoc.latitude + toLoc.latitude) / 2,
      longitude: (fromLoc.longitude + toLoc.longitude) / 2,
      latitudeDelta: Math.abs(fromLoc.latitude - toLoc.latitude) * 2,
      longitudeDelta: Math.abs(fromLoc.longitude - toLoc.longitude) * 2,
    };

    setCurrentRestaurant({
      courier: {
        avatar: images.avatar,
        name: 'Nhi',
        phone: '0989898989',
      },
    });

    setStreetName(street);
    setFromLocation(fromLoc);
    setToLocation(toLoc);
    setRegion(mapRegion);
    setCoordinates([
      {latitude: fromLoc.latitude, longitude: fromLoc.longitude},
      {latitude: toLoc.latitude, longitude: toLoc.longitude},
    ]);
  }, []);

  // Map function
  function renderMap() {
    // delivery boy icon
    const deliveryBoy = () => {
      <Marker coordinate={fromLocation}>
        <View
          style={{
            height: 40,
            width: 40,
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: COLORS.white,
          }}>
          <View
            style={{
              height: 30,
              width: 30,
              borderRadius: 15,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: COLORS.primary,
            }}>
            <Image
              source={images.avatar}
              style={{
                height: 25,
                width: 25,
                borderRadius: 10,
              }}
            />
          </View>
        </View>
      </Marker>;
    };

    // home icon
    const homeIcon = () => {
      <Marker coordinate={toLocation} anchor={{x: 0.5, y: 0.5}}>
        <Image
          source={icons.home}
          style={{
            height: 40,
            width: 40,
          }}
        />
      </Marker>;
    };

    return (
      <View
        style={{
          flex: 1,
        }}>
        <MapView
          ref={mapView}
          provider={PROVIDER_GOOGLE}
          style={{flex: 1}}
          initialRegion={region}>
          {deliveryBoy()}
          {homeIcon()}

          <Polyline
            coordinates={coordinates}
            strokeWidth={3}
            strokeColor="red"
          />
        </MapView>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
      }}>
      {fromLocation.latitude && toLocation.latitude ? renderMap() : null}
    </View>
  );
};

export default OrderDelivery;
