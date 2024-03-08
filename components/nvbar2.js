/* eslint-disable prettier/prettier */
// BottomHalfModal.js
import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import { useAppContext } from '../src/AppContext';
import axios from 'axios';


const BottomHalfModal1 = ({ isVisible, onClose, buttonRef, navigation, onTextChange }) => {

    const [accountName, setAccountName] = useState('');

    const { userData } = useAppContext();
    console.log("User Data:", userData.profileId);



    


    const handleSave = async () => {
        // onTextChange(accountName);
        try {
          
          const accountResponse = await axios.post('https://calm-plum-crane-slip.cyclic.app//api/accounts', {
            name: accountName,
            profileId: userData.profileId,
          });
          console.log('Account created:', accountResponse.data);
          onClose();
          return accountResponse.data;
          
  
          
        } catch (error) {
          console.error('Error creating profile:', error);
          throw error;
        }



        
      };
      
      
  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={styles.modalContainer}>
        {/* Content of your modal */}
        <View style={styles.modalContent}>
          <Text className='text-xl font-black my-2 text-black  ' >Create An Account</Text>
          {/* Add your three elements here */}
          
          <TextInput 
           onChangeText={(text) => setAccountName(text) } 
           placeholder='Account Name'
           placeholderTextColor={'black'}
           
           className='border-2 border-gray-300 bg-gray-300 rounded-xl p-2 w-[90%] self-center mt-3 placeholder-black dark:placeholder-white ' />

          <TouchableOpacity onPress={handleSave} className='p-2 bg-black text-white border-gray-300 border-4 w-[40%] self-center mt-5 rounded-xl ' >
            <Text className='text-white font-bold self-center '>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <Text className="text-black"><Entypo name="cross" className="text-black " size={30}/></Text>
      </TouchableOpacity>
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
  button: {
    alignItems: 'start',
    padding: 10,
    marginLeft:6,
    
    
    width:'100%',
  },
  closeButton: {
    backgroundColor: 'white',
    width: '100%',
    alignItems: 'center',
    padding: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
});

export default BottomHalfModal1;