/* eslint-disable radix */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-alert */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  Pressable,
} from 'react-native';
import {Chip} from 'react-native-paper';
import Hobbies from '../Components/Filters/Hobbies';
import TInput from '../Components/TInput';
import styles from '../Styles/MyProfileStyle';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import UpperBar from '../Components/UpperBar';
import Theme from '../Styles/Theme';
import DateTimePicker from '@react-native-community/datetimepicker';
import {getCurrentPath} from '../utils/generalFunctions';
const MyProfile = () => {
  const path = getCurrentPath();
  const [edit, setEdit] = useState(false);
  const [photos, setPhotos] = useState([]);
  const email = useSelector(state => state.configuration.email);
  const userConfig = useSelector(state => state.configuration.userConfig);
  const rawText = useSelector(state => state.general.rawText.registration_form);
  const myhobbies = useSelector(state => state.configuration.myHobbies);
  let birthday = userConfig.date_of_birth;

  birthday = birthday.split('-');
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const navigation = useNavigation();
  var year = birthday[0];
  var month = birthday[1];
  var day = parseInt(birthday[2].slice(0, 2)) + 1;
  year = year.toString();
  const [date, setDate] = useState(new Date(year, month, day));
  const verifyToken = useSelector(state => state.configuration.token);

  const getPhotos = async () => {
    try {
      const res = await axios.get(
        `${path}/userPictures/${userConfig.user_id}`,
        {
          headers: {
            Authorization: 'Bearer ' + verifyToken,
          },
        },
      );
      setPhotos(res.data);
    } catch (error) {
      alert(error);
    }
  };
  const onChangeDate = (event, selectedDate) => {
    setShow(false);
    setDate(selectedDate);
  };
  useEffect(() => {
    getPhotos();
  }, []);

  const chipStyle = (value, chip) => {
    return {
      margin: 2,
      backgroundColor: value === chip ? Theme.highLightColor : '#EBEBEB',
    };
  };
  const chipTextColor = (value, chip) => {
    return {
      color: value === chip ? Theme.backgroundColor : '#2C143E',
      fontFamily: Theme.fontFamilyRegular,
    };
  };
  return (
    <SafeAreaView style={styles.SafeAreaView.container}>
      <UpperBar />
      <ScrollView>
        <View style={styles.View.photosContainer}>
          {photos.map((item, index) => {
            return (
              <View key={index}>
                <Pressable>
                  <Image
                    style={styles.Image.myPic}
                    source={{uri: `data:image/gif;base64,${item.image}`}}
                  />
                </Pressable>
              </View>
            );
          })}
          <View>
            {/* FIX ME - navigate to signUp4 */}
            <Pressable
              style={{
                backgroundColor: Theme.secondColor,
                padding: 5,
                margin: 3,
                borderRadius: 7,
              }}
              onPress={() =>
                navigation.navigate('UploadPictures', {
                  page: 'myProfile',
                })
              }>
              <Text>upload photos</Text>
            </Pressable>

            <Pressable
              style={{
                backgroundColor: Theme.highLightColor,
                padding: 5,
                margin: 3,
                borderRadius: 7,
              }}
              onPress={() => {
                if (edit === true) {
                  //NOTICE - add api call - update conficuration
                  setEdit(!edit);
                }
                setEdit(!edit);
              }}>
              <Text>update profile</Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.View.emailPassword}>
          <View style={styles.View.column}>
            <TInput
              style={styles.TInput.textInput}
              value={email}
              title={'Email'}
              editable={edit}
            />
          </View>
        </View>
        <View style={styles.View.fullName}>
          <View style={styles.View.column}>
            <TInput
              style={styles.TInput.nameInput}
              value={userConfig.first_name}
              title={'First Name'}
              editable={edit}
            />
          </View>
          <View style={styles.View.column}>
            <TInput
              style={styles.TInput.nameInput}
              value={userConfig.last_name}
              title={'Last Name'}
              editable={edit}
            />
          </View>
        </View>
        <TInput
          style={styles.TInput.textInput}
          title={`Phone number`}
          value={userConfig.phone_number}
          editable={edit}
        />
        <TInput
          style={styles.TInput.textInput}
          title={`City`}
          value={userConfig.city}
          editable={edit}
        />
        <TInput
          style={styles.TInput.textInput}
          title={`Proffesion`}
          value={userConfig.profession}
          editable={edit}
        />
        <View>
          <Text style={styles.Text.catagoryText}>I identify as</Text>
          <View style={styles.View.chipsBlocks}>
            {rawText.gender.map(item => {
              return (
                <Chip
                  key={item}
                  style={chipStyle(userConfig.gender, item)}
                  textStyle={chipTextColor(userConfig.gender, item)}>
                  {item}
                </Chip>
              );
            })}
          </View>
        </View>
        <View>
          <Text style={styles.Text.catagoryText}>I prefer to be called</Text>
          <View style={styles.View.chipsBlocks}>
            {rawText.sexual_orientation.map(item => {
              return (
                <Chip
                  key={item}
                  style={chipStyle(userConfig.sexual_orientation, item)}
                  textStyle={chipTextColor(
                    userConfig.sexual_orientation,
                    item,
                  )}>
                  {item}
                </Chip>
              );
            })}
          </View>
        </View>
        <View>
          <Text style={styles.Text.catagoryText}>pronoun</Text>
          <View style={styles.View.chipsBlocks}>
            {rawText.pronoun.map(item => {
              return (
                <Chip
                  key={item}
                  style={chipStyle(userConfig.pronoun, item)}
                  textStyle={chipTextColor(userConfig.pronoun, item)}>
                  {item}
                </Chip>
              );
            })}
          </View>
        </View>
        <Text style={styles.Text.catagoryText}>My relationship status</Text>
        <View style={styles.View.chipsBlocks}>
          {rawText.relationship_status.map(item => {
            return (
              <Chip
                key={item}
                style={chipStyle(userConfig.relationship_status, item)}
                textStyle={chipTextColor(userConfig.relationship_status, item)}>
                {item}
              </Chip>
            );
          })}
        </View>
        <View style={styles.View.birthday}>
          <Text style={styles.Text.catagoryText}>birthday🎈🎉✨</Text>
          <Pressable
            style={styles.View.viewStyle}
            onPress={() => setShow(!show)}>
            <Text style={styles.Text.dateText}>
              {day}-{month}-{year}
            </Text>
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                onChange={onChangeDate}
              />
            )}
          </Pressable>
        </View>
        <View style={styles.View.hobbies}>
          <Text style={styles.Text.hobbiesText}>My hobbies are:</Text>
          <Hobbies
            styling={'SignUp'}
            style={styles.Pressable.Pressables}
            text={
              myhobbies.length !== 0
                ? myhobbies.toString()
                : 'Pick your hobbies'
            }
            data={rawText.Hobbies}
            list={myhobbies}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyProfile;
