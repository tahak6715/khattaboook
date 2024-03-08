/* eslint-disable prettier/prettier */
import { StyleSheet, Text, View, TouchableOpacity, Alert, Image } from 'react-native';
import React, { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Modal from 'react-native-modal';

const Details = ({ navigation, route }) => {
  const { customerId, amountId, time, comand, amount, name, itemName, quantity, image } = route.params;
  console.log('Details:', customerId, amountId, time, comand, amount, name, itemName, quantity, image);

  const cus = customerId;
    const amt = amountId;
    const [isModalVisiblea, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisiblea);
  };

  

    const deleteData = async () => {
        // Replace with the actual customer ID
      
        const deleteUrl = `https://calm-plum-crane-slip.cyclic.app/api/customers/${cus}/delete-amount/${amt}`;
      
        Alert.alert(
          'Confirm Deletion',
          'Are you sure you want to delete this customer?',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Delete',
              onPress: async () => {
                try {
                  // Make the DELETE request
                  const response = await axios.delete(deleteUrl);
                  console.log('Customer deleted:', response.data);
                  navigation.navigate('Customer', {}, -2);
                  // Handle success or update the UI accordingly
                } catch (error) {
                  console.error('Error deleting customer:', error);
                  // Handle the error or update the UI accordingly
                }
              },
            },
          ],
          { cancelable: false }
        );
      };
  const name1 = name.charAt(0);

  return (
    <View style={{ flex: 1, padding: 16 }}>
       <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }} className="justify-between">
        <View className="flex flex-row">
        <TouchableOpacity onPress={() => navigation.navigate('Customer', {}, -2)}>
        <Ionicons name="chevron-back" size={34} color="black" />
        </TouchableOpacity>
        <Text style={{ fontSize: 18, marginLeft: 8 }} className="font-semibold text-black ">Details</Text>
        </View>

        <View className="flex-row">
        <TouchableOpacity className="mx-2" onPress={() => navigation.navigate('EdditCustomer', { customerId, amountId, time, comand, amount, name, itemName, quantity })}>
        <AntDesign
          name="edit" size={30} color="black" />
          </TouchableOpacity>
        <TouchableOpacity onPress={deleteData} >
        
        <MaterialCommunityIcons name="delete" size={30} color="black" />

        </TouchableOpacity>
      </View>
        
      </View>
     
      <View className="bg-gray-400 py-4 pb-8 rounded-lg">
        <View className="  shadow-inner bg-gray-200 rounded-xl p-6 shadow-gray-500 mt-8 mx-4 border-b-4 border-black">
          <View className=" flex flex-row">
            <Text className=" text-xl px-4 py-1 mr-4 self-center rounded-full border-black border-2 ">{name1}</Text>
            <Text className=" text-xl my-2  ">{name}</Text>
          </View>
          <View className="my-8">
            <Text className="text-xl py-2 px-4">Rs {amount}</Text>
            <Text className="text-md font-semibold text-black mx-5 -my-3">{comand}</Text>
          </View>
          <View>
            {itemName.trim() !== '' && (
              <Text className="text-xl font-semibold bg-gray-200 rounded-xl text-black ">Item Name: {itemName}</Text>
            )}
            {quantity !== 0  && (
              <Text className="text-xl font-semibold bg-gray-200 rounded-xl text-black ">Quantity: {quantity}</Text>
            )}
          </View>
        </View>

        <View>
          <Text className="text-xl font-semibold bg-gray-200 py-4 px-2 rounded-xl text-black mx-8 my-3">{time}</Text>
        </View>

        <View className="">
      <TouchableOpacity className="items-center" onPress={toggleModal}>
        <Image source={{ uri: image }} style={{ width: '50%', height: 250,  }} />
      </TouchableOpacity>

      <Modal isVisible={isModalVisiblea} onBackdropPress={toggleModal}>
        <View style={styles.modalContainer}>
          <Image source={{ uri: image }} style={styles.modalImage} />
        </View>
      </Modal>
    </View>



        
      </View>
    </View>
  );
};

export default Details;


const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
  },
});

