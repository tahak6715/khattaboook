/* eslint-disable prettier/prettier */
// CustomerDetailsScreen.js
import React, {useEffect, useState} from 'react';
import { View, Text, TouchableOpacity, ScrollView, TouchableWithoutFeedback, SafeAreaView, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import MaterialCommunityIcons
  from 'react-native-vector-icons/MaterialCommunityIcons';
  import AntDesign from 'react-native-vector-icons/AntDesign';
import { useFocusEffect } from '@react-navigation/native';
import { useAppContext } from '../../../src/AppContext';
import { FlatList } from 'react-native-gesture-handler';
import moment from 'moment';

const CustomerDetailsScreen = ({ route, navigation }) => {

  const goBackk = () => {
    navigation.navigate('Customer', {}, -3);
  }

  const [customerData, setCustomerData] = useState('');
  const [customerAmount, setCustomerAmount] = useState('');
  const [customercomand, setCustomercomand] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const [response, setResponse] = useState([]);
  const { userData } = useAppContext();
  const [Data, setData] = useState();
  console.log('data', Data);

  const [filterType, setFilterType] = useState('oldest'); // 'latest' or 'oldest'

  // ... (your existing code)

  const toggleFilterType = () => {
    // Toggle between 'latest' and 'oldest'
    setFilterType((prevType) => (prevType === 'latest' ? 'oldest' : 'latest'));
  };

  // Sort the response array based on the selected filter type
  const sortedResponse = response.slice().sort((a, b) => {
    if (filterType === 'latest') {
      return new Date(b.time) - new Date(a.time);
    } else {
      return new Date(a.time) - new Date(b.time);
    }
  });
  
 

  

 



  const { customerId } = route.params;
  console.log(customerId);
  const Id = customerId.customerId;
  console.log(customerId.customerId);
  const customerIdd = customerId;

const getData = async () => {

 
    const getUrl = `https://calm-plum-crane-slip.cyclic.app/api/customers/${customerId}`; // Replace with your actual API endpoint

axios.get(getUrl)
  .then(response => {
    console.log('Customer retrievedaaaa:', response.data);
    setData(response.data);
    setCustomerData(response.data.name);
    setCustomerAmount(response.data.amount[0].amount);
    setCustomercomand(response.data.amount[0].comand);
    setResponse(response.data.amount);
    
    console.log('hello');
    console.log(response.data.amount[6]);
    console.log(customerData.name)
    
    
  })
  .catch(error => {
    console.error('Error retrieving customer:', error);
  });

}

useFocusEffect(
  React.useCallback(() => {
    // This code will be executed when the screen comes into focus
    getData();

    // Optionally, you can return a cleanup function if needed
    // return () => {
    //   // Cleanup code here (if needed)
    // };
  }, [userData.amountSend,]))

  const deleteData = async () => {

 
    const deleteUrl = `https://calm-plum-crane-slip.cyclic.app/api/customers/${customerId}`; // Replace with your actual API endpoint

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
              const response = await axios.delete(deleteUrl);
              console.log('Customer deleted:', response.data);
              navigation.navigate('Customer', {}, -1);
            } catch (error) {
              console.error('Error deleting customer:', error);
            }
          },
        },
      ],
      { cancelable: false }
    );

}


  const renderItem = ({ item, index }) => {
    

    const transactionSum = sortedResponse.slice(0, index + 1).reduce((acc, transaction) => {
      if (transaction.amount === 'I got') {
        return acc - transaction.comand;
      } else {
        return acc + transaction.comand;
      }
    }, 0);
    

     // Convert ISO timestamp to readable date
  const formattedDate = new Date(item.time).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
    return (
      <>
      <TouchableOpacity
      onPress={() => {
        navigation.navigate('Details', {
         
          'comand' : item.amount,
          'amount' : item.comand,
          'time' : formattedDate,
          'itemName': item.itemName,
          'name' : customerData,  
          'quantity': item.quantity,
          'amountId': item._id,
          'customerId': customerId,
          'image': item.image,
          
         
          
        });
      }}
       className="flex-row bg-gray-300 rounded-md my-1 border-b-2 border-black"  key={index}>
  
  <View className="min-w-[50%] max-w-[50%]  py-4  my-2 flex-col">
        <Text className="text-md pl-4 font-bold text-black">{formattedDate}</Text>
        <Text className="text-xs pl-4 font-semibold text-black ">
  Bal: {transactionSum}
</Text>
      </View>
      
      <View className="min-w-[25%] max-w-[25%]">
        <Text className="text-sm pl-4 font-semibold text-black bg-green-300 py-4  my-2">{item.amount === 'i gave' ? item.comand : ''}</Text>
      </View>
      <View className="min-w-[25%] max-w-[25%]">
        <Text className="text-sm pl-4 font-semibold text-black  my-2 bg-red-300 py-4">{item.amount === 'I got' ? item.comand : ''}</Text>
      </View>
    </TouchableOpacity>
    </>


    
  );
} 

  
  const calculateSum = () => {
    let sum = 0;

    response.forEach((item) => {
      console.log('h1223');
      console.log(item);
      if (item.amount === 'I got') {
        sum -= item.comand;
        
        
      } else {
        sum += item.comand;
        
        
      }
    });

    return Math.abs(sum);
  };

  const calculateSuma = () => {
    let sum = 0;

    response.forEach((item) => {
      
      if (item.amount === 'I got') {
        sum -= item.comand;
        
        
      } else {
        sum += item.comand;
        
        
      }
    });

    return sum;
  };




  
    

  

  

  return (
    
    <View style={{ flex: 1, padding: 16 }}  >
      {/* Custom Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }} className="justify-between">
        <View className="flex flex-row">
        <TouchableOpacity onPress={goBackk}>
        <Ionicons name="chevron-back" size={34} color="black" />
        </TouchableOpacity>
        <Text style={{ fontSize: 18, marginLeft: 8 }} className="font-semibold text-black ">{customerData}</Text>
        </View>

        <View>
        <TouchableOpacity onPress={deleteData} >
        <MaterialCommunityIcons name="delete" size={28} color="black" />

        </TouchableOpacity>
      </View>
        
      </View>
     

      <View>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
        <Text style={{ fontSize: 16, marginRight: 8 }}>Sort by:</Text>
        <TouchableOpacity onPress={toggleFilterType}>
          <Text className="bg-gray-500 py-1 px-2 rounded-lg">
            {filterType === 'oldest' ? 'Oldest' : 'Latest'}
          </Text>
        </TouchableOpacity>
      </View>

        

        <View className="shadow-lg">
            {/* Icon and Amount */}
            {calculateSuma() < 0 ? (
              <View className="bg-red-500 py-1 rounded-xl  flex-col px-4" >
                <View className="flex-row">
                <View className="border-2 rounded-2xl mt-2">
                <Ionicons name="arrow-up" size={24}  />
                </View>
                <Text  className="ml-2 text-lg text-black  font-bold">Rs {calculateSum()}</Text>
                </View>
                <View>
                  <Text className="ml-8 -mt-1 text-xs font-semibold text-black">{'I have to give...'}</Text>
                </View>
              </View>
            ) : (
              <View className="bg-green-600 py-1 rounded-xl  flex-col px-4" >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View className="border-2 rounded-2xl mt-2">
                <Ionicons name="arrow-up" size={24}  />
                </View>
                <Text className="ml-2 text-lg text-black  font-bold">Rs {calculateSum()}</Text>
                </View>
                <View>
                  <Text className="ml-8 -mt-1 text-xs font-semibold text-black">{'I have to get...'}</Text>
                </View>
              </View>
            )}
          </View>

          <View className="flex flex-row ">

          <TouchableOpacity onPress={() => {
            navigation.navigate('Report',{
              'Data': Data,
              
            })}}>
          <View className=' flex-col justify-start items-start m-2 rounded-lg bg-gray-300 pr-3 '>
            <View className="pl-5" >
              <MaterialCommunityIcons
                name="file-pdf-box"
                size={44}
                color="black"/>
            </View>
            <View>
              <Text className="text-xs font-bold pl-4 -mt-1 mb-1 text-black ">Report</Text>
            </View>
          </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {
            navigation.navigate('Report',{
              'Data': Data,
              
            })}}>
          <View className=' flex-col justify-start items-start m-2 rounded-lg bg-gray-300 '>
            <View className="pl-5 pr-5 pt-1" >
              <MaterialCommunityIcons
                name="whatsapp"
                size={35}
                color="black"/>
            </View>
            <View>
              <Text className="text-xs font-bold pl-4  mb-1 text-black ">Send</Text>
            </View>
          </View>
          </TouchableOpacity>

          </View>

          <View className="flex-row pt-2 bg-gray-200 border-gray-900 border-b-2 pb-1 rounded-lg">
            <View className="min-w-[50%] max-w-[50%]">
              <Text className="text-md pl-4 font-extrabold text-black ">Date</Text>

            </View>
            <View className="min-w-[25%] max-w-[25%]">
              <Text className="text-md pl-4 font-extrabold text-black  ">I gave</Text>

            </View>
            <View className="min-w-[25%] max-w-[25%]">
              <Text className="text-md pl-4 font-extrabold text-black ">I got</Text>

            </View>
          </View>

          <FlatList
        data={sortedResponse}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        className="max-h-[60%]"
      />
        
        

     
          
          
        </View>

        <View className=" flex-row justify-around self-center absolute top-[96%]"  >
          <TouchableOpacity className="bg-green-600 w-[50%] rounded-2xl  " disabled={isButtonDisabled} onPress={() => {
            if (!isButtonDisabled) {
              // Disable the button to prevent multiple taps
              setIsButtonDisabled(true);
        
              // Your button's action goes here
              console.log('Button pressed!');
        
              // Enable the button after a delay (e.g., 2 seconds)
              setTimeout(() => {
                setIsButtonDisabled(false);
              }, 2000);
            }
            navigation.navigate('CustomerAmountSend', {
              'customerId' : customerId,
              'comand' : 'i gave'
            });
          }}>
            <View className="text-white text-2xl self-center justify-center text-center flex-row m-2">
              <AntDesign name="arrowup" size={24} color="white" />
              <Text className="text-white">I GAVE</Text>

            </View>
            </TouchableOpacity>
            <TouchableOpacity className="bg-red-600 w-[50%] rounded-2xl " onPress={() => {
            navigation.navigate('CustomerAmountSend', {
              'customerId' : customerId,
              'comand' : 'I got'
              
            });
          }}>
            <View className="text-white text-2xl self-center justify-center text-center flex-row m-2">
              <AntDesign name="arrowdown" size={24} color="white" />
              <Text className="text-white">I GOT</Text>

            </View>
            </TouchableOpacity>

        </View>

        


      </View>
      
      );
    };

    export default CustomerDetailsScreen;
