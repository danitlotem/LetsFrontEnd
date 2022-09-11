/* eslint-disable no-unused-vars */
import {PermissionsAndroid} from 'react-native';
import {call, put, select} from 'redux-saga/effects';
import Geolocation from '@react-native-community/geolocation';
import {setMyLocation} from '../store/Slices/generalSlice';
import axios from 'axios';
import {getCurrentPath} from '../utils/generalFunctions';

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};
const getUserId = state => state.configuration.userConfig.user_id;
const getToken = state => state.configuration.userConfig.token;

const checkLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Access Required',
        message: 'This App needs to Access your location',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return 'Permission Granted';
    } else {
      return 'Permission Denied';
    }
  } catch (err) {
    console.warn(err);
  }
};

//FIX ME - change accurency to 5 meters
const getMyLocation = async () => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(resolve, reject, options);
  });
};
const sendLocation = async (id, latitude, longitude, token) => {
  const path = getCurrentPath();

  try {
    const res = await axios.post(
      `${path}/userLocation/${id}`,
      {
        longitude: longitude,
        latitude: latitude,
      },
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      },
    );
  } catch (err) {
    console.error(err);
  }
};
export function* getCurrentLocationSaga() {
  const myUserId = yield select(getUserId);
  const myToken = yield select(getToken);
  const locationPermission = yield call(checkLocationPermission);

  console.log('locationPermission: ', locationPermission);
  if (locationPermission === 'Permission Granted') {
    console.log('1');
    const result = yield call(getMyLocation);
    console.log('PROMISE RESULT: ', result);

    setInterval(async () => {
      const result = await getMyLocation();
      console.log('PROMISE RESULT: ', result);
      put(
        setMyLocation({
          myLatitude: result.coords.longitude,
          myLongitude: result.coords.latitude,
        }),
      );
      sendLocation(
        myUserId,
        result.coords.longitude,
        result.coords.latitude,
        myToken,
      );
    }, 60000);

    console.log('4');
  }
}
