/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {updateMyStatus} from '../store/Slices/generalSlice';
import {View, TextInput, Pressable, Modal, Text} from 'react-native';
import axios from 'axios';
import styles from '../Styles/StatusModal';
import Theme from '../Styles/Theme';
import {getCurrentPath} from '../utils/generalFunctions';

const StatusModal = props => {
  useEffect(() => {}, []);
  const [myStatus, setStatus] = useState('enter your status...');
  const dispatch = useDispatch();
  const user_id = useSelector(state => state.configuration.userConfig.user_id);
  const path = getCurrentPath();
  const updateStatus = async () => {
    try {
      const res = await axios.post(`${path}/userStatus/${user_id}`, {
        status: myStatus,
      });
      dispatch(updateMyStatus({status: myStatus}));
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <Modal transparent={true} visible={props.visible}>
      <View style={styles.container}>
        <View style={styles.scroll}>
          <Pressable
            style={{height: 30, width: 30, alignSelf: 'flex-start'}}
            onPress={() => props.closeModal()}>
            <Text>X</Text>
          </Pressable>

          <View>
            <Text style={styles.title}>Update your status</Text>
          </View>
          <TextInput
            style={{
              height: 120,
              margin: 12,
              borderWidth: 1,
              padding: 10,
            }}
            onChangeText={setStatus}
          />
          <Pressable
            style={{
              height: 50,
              width: 120,
              alignSelf: 'center',
              justifyContent: 'center',
              backgroundColor: Theme.highLightColor,
              borderRadius: 10,
            }}
            onPress={() => {
              updateStatus();
              props.closeModal();
            }}>
            <Text
              style={{
                alignSelf: 'center',
                fontFamily: Theme.fontFamilyBold,
                fontSize: 18,
              }}>
              Update
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default StatusModal;
