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
import {Formik} from 'formik';
import * as yup from 'yup';
import {firebase} from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/Entypo';

// Validation Signup form
const signUpSchema = yup.object({
  name: yup.string().label('Name').required().min(3),
  email: yup
    .string()
    .label('Email')
    .required()
    .matches(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Email address is not valid',
    ),
  password: yup.string().label('Password').required().min(5),
  phone: yup
    .string()
    .label('Phone')
    .required()
    .matches(/^\d{11}$/, 'Phone number is not valid'),
});

const SignUp = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [displayPassword, setDisplayPassword] = useState('eye-with-line');

  const onPressEye = () => {
    if (displayPassword == 'eye') {
      setDisplayPassword('eye-with-line');
    }
    if (displayPassword == 'eye-with-line') {
      setDisplayPassword('eye');
    }
  };

  // useEffect(() => {

  // }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#eee'}}>
      <View
        style={{
          height: SIZES.height * 0.4,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={images.logo}
          resizeMode="contain"
          style={{width: '60%'}}
        />
      </View>
      <View>
        <TextInput
          placeholder="Name"
          autoCapitalize="none"
          // value={name}
          style={{
            borderWidth: 1,
            height: 50,
            marginVertical: 4,
            borderRadius: 15,
            borderColor: COLORS.primary,
            backgroundColor: COLORS.white,
            ...FONTS.body3,
            padding: 10,
            marginHorizontal: 20,
          }}
        />
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          // value={email}
          style={{
            borderWidth: 1,
            height: 50,
            marginVertical: 4,
            borderRadius: 15,
            borderColor: COLORS.primary,
            backgroundColor: COLORS.white,
            ...FONTS.body3,
            padding: 10,
            marginHorizontal: 20,
          }}
        />
        <View
          style={
            {
              // flexDirection: 'row',
            }
          }>
          <TextInput
            placeholder="Password"
            // value={password}
            autoCapitalize="none"
            secureTextEntry={displayPassword == 'eye-with-line' ? true : false}
            style={{
              borderWidth: 1,
              height: 50,
              marginVertical: 4,
              borderRadius: 15,
              borderColor: COLORS.primary,
              backgroundColor: COLORS.white,
              ...FONTS.body3,
              padding: 10,
              marginHorizontal: 20,
            }}
          />
          <TouchableOpacity
            onPress={onPressEye}
            style={{
              position: 'absolute',
              right: 30,
              top: 15,
            }}>
            <Icon name={displayPassword} size={25} color={COLORS.black} />
          </TouchableOpacity>
        </View>
        <TextInput
          placeholder="Phone number"
          autoCapitalize="none"
          // value={phone}
          style={{
            borderWidth: 1,
            height: 50,
            marginVertical: 4,
            borderRadius: 15,
            borderColor: COLORS.primary,
            backgroundColor: COLORS.white,
            ...FONTS.body3,
            padding: 10,
            marginHorizontal: 20,
          }}
        />
      </View>
      <View style={{marginHorizontal: 20, marginTop: 20}}>
        <CustomButton text={'Sign Up'} />
      </View>

      <View
        style={{
          flexDirection: 'row',
          marginTop: 20,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            ...FONTS.h4,
          }}>
          Already have a account?
        </Text>
        <Text
          style={{
            ...FONTS.body3,
            color: 'blue',
            textDecorationLine: 'underline',
            marginLeft: 4,
          }}>
          Sign In
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;
