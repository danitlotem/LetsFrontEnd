/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, {useState} from 'react';
import {
  View,
  Text,
  Modal,
  Button,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from 'react-native';
import {Divider} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Theme from '../../Styles/Theme';
import signUpHobbies from '../../Styles/SignUpHobbies';
import FiltersHobbies from '../../Styles/FiltersHobbies';
import {updateHobbies} from '../../store/Slices/configurationSlice';

const Hobbies = props => {
  const listOfHobbies = useSelector(state => state.general.rawText?.Hobbies);
  const myHobbies = useSelector(state => state.configuration?.myHobbies);
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const dispatch = useDispatch();
  const hobbiesStyle =
    props.styling === 'SignUp' ? {...signUpHobbies} : {...FiltersHobbies};
  const hobbiesListItemStyle = item => {
    return {
      backgroundColor: myHobbies.includes(item) ? '#48D1CC' : 'transparent',
      borderRadius: 3,
      padding: 2,
    };
  };

  const addToList = val => {
    if (myHobbies.includes(val) === true) {
      const temp = myHobbies.filter(hobbie => hobbie !== val);
      dispatch(
        updateHobbies({
          myHobbies: [...temp],
        }),
      );
    } else {
      dispatch(
        updateHobbies({
          myHobbies: [...myHobbies, val],
        }),
      );
    }
  };
  const clearHobbies = () => {
    dispatch(
      updateHobbies({
        myHobbies: [],
      }),
    );
  };

  return (
    <View style={hobbiesStyle.viewStyle}>
      {/*Modal */}
      <Modal transparent={true} visible={visible}>
        <View style={hobbiesStyle.Item}>
          <View style={{top: 20, alignSelf: 'center', position: 'absolute'}}>
            <Text
              style={{
                fontSize: 18,
                color: Theme.secondColor,
              }}>
              Hobbies
            </Text>
          </View>
          <ScrollView>
            {[...listOfHobbies].slice(1).map((element, elmIndx) => {
              return (
                <View key={elmIndx}>
                  <Text style={hobbiesStyle.hobbiesCatagoryTitleList}>
                    {element.type}
                  </Text>

                  {element.lst.map((item, index) => {
                    return (
                      <TouchableOpacity
                        style={hobbiesListItemStyle(item)}
                        key={index}
                        onPress={() => addToList(item)}>
                        <Text style={{fontFamily: Theme.fontFamilyRegular}}>
                          {item}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                  <Divider style={{marginTop: 7}} />
                </View>
              );
            })}
          </ScrollView>
          <View style={{alignSelf: 'center'}}>
            <Button color={'#2C143E'} title={'close'} onPress={hideModal} />
          </View>
        </View>
      </Modal>

      {/* Item in filters menu */}
      <View style={{flexDirection: 'row'}}>
        <View>
          <Pressable style={hobbiesStyle.itemPressable} onPress={showModal}>
            <Text style={hobbiesStyle.valueItemText}>{props.text}</Text>
          </Pressable>
        </View>
        <View style={{justifyContent: 'flex-start'}}>
          <Pressable onPress={() => clearHobbies()}>
            <Ionicons
              color={Theme.backgroundColor}
              size={18}
              name={'trash-outline'}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Hobbies;
