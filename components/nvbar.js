/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import BottomHalfModal1 from './nvbar2'
import { useAppContext } from '../src/AppContext';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const BottomHalfModal = ({ isVisible, onClose, buttonRef }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [accounts, setAccounts] = useState();
  const { userData } = useAppContext();
  const navigation = useNavigation();
  const [actDta, setActDta] = useState([]);
  const { setUserDataContext } = useAppContext();
  // Initialize with 0 for the first item
  

  

  useEffect(() => {
    getAccountsByProfileId();
    
    
  }, []); // Empty dependency array ensures that this effect runs once when the component mounts

  const id = userData.profileId;
  console.log("Profile ID:", id);
  const getAccountsByProfileId = async () => {
    try {
      const response = await axios.get(`https://calm-plum-crane-slip.cyclic.app/api/accounts/by-profile/${userData.profileId}`);
      setUserDataContext({ ...userData, accountId: response.data[0]._id });
      console.log('pak',response.data[0].profileId)
      const accountData = response.data;
      setActDta(response.data)
      // setUserDataContext({ ...userData, accountId: accountData[0] });
      console.log("Accounts:aaaaa");
      console.log("Accounts:", response.data);  
      // console.log("Accountsabc:", response.data[0].customers[0].accountId);
      
      setAccounts(accountData);
     
      
      return accountData
    } catch (error) {
      console.error('Error fetching accounts by profile ID:', error);
    }
  };



  const accountIdSend = (accountData) => {
    // Handle the specific account ID here
    
    console.log("Clicked on Account ID:", accountData);
    setUserDataContext({ ...userData, accountId: accountData });
    
    navigation.navigate('Customer', {
      'accountId': accountData
    })
    onClose();
    
    
    
    
  };


  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
    getAccountsByProfileId();
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
    onPress={() => {
      
      accountIdSend(item._id)}} 
      className="bg-gray-300 my-1 shadow-md rounded-xl p-2 min-w-[80%] max-w-[90%] self-center"
    >
      <Text className="text-black self-center">{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text className='text-xl font-bold text-black my-2'>Accounts</Text>
          <FlatList
          
            data={accounts}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
          <TouchableOpacity className='p-2 border-gray-300 bg-black border-4 w-[40%] self-center mt-5 rounded-2xl shadow-black shadow-xl -mb-2' onPress={toggleModal}>
            <Text className='text-white  font-bold self-center '>Add Account</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <Text><Entypo name="cross" size={25} /></Text>
      </TouchableOpacity>
      <BottomHalfModal1 isVisible={isModalVisible} onClose={toggleModal} buttonRef={buttonRef} />
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    width: '100%',
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  closeButton: {
    backgroundColor: 'white',
    color: 'black',
    width: '100%',
    alignItems: 'center',
    padding: 6,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
});

export default BottomHalfModal;
