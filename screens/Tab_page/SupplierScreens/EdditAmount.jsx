/* eslint-disable prettier/prettier */
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
// eslint-disable-next-line prettier/prettier
import { useRoute, useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CurrentDateTimeComponent from '../../../components/currentDateTime';
import axios from 'axios';
import { useAppContext } from '../../../src/AppContext';
import DateTimePicker from '@react-native-community/datetimepicker';
import Entypo
    from 'react-native-vector-icons/Entypo';

const SupplierEditAmount = ({ navigation }) => {
  
  
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState('date');
  

  const onChange = (e, selectedDate) => {
    setDate(selectedDate);
    setShow(false);
  };

  const toggleDatePicker = () => {
    setShow(!show);
  };



  const route = useRoute();
  const dataFromScreenA = route.params?.command || 'Default Value';
  const custId = route.params?.supplierId || 'Default Value';
  const amountId = route.params?.amountId || 'Default Value';
  const amounta = route.params.amount;
  const comanda = route.params?.comand || '';
  const itemNamea = route.params?.itemName || '';
  const quantitya = route.params?.quantity || '';
  const datea = route.params?.time || new Date();
  console.log(datea) ;
  console.log(quantitya)
  console.log('amount', amounta);
  console.log('comand', comanda);

  const [numberInput, setNumberInput] = useState(`${amounta}`);
  const [itemName, setItemName] = useState(`${itemNamea}`);
  const [quantity, setQuantity] = useState(`${quantitya}`);
  console.log(datea);
  
const dateParts = datea.split(/[\s,]+/); // Split the date string into parts
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const month = monthNames.indexOf(dateParts[0]); // Get the month index
const day = parseInt(dateParts[1]); // Get the day
const year = parseInt(dateParts[2]); // Get the year

const parsedDate = new Date(year, month, day); // Create a new Date object

const [date, setDate] = useState(parsedDate); // Set the initial state with the parsed date

console.log('date', date); 

  const [comand, setComand] = useState(`${comanda}`); // Add this line for the comand state


  // Function to update the comand state
  const handleComandSelection = (selectedComand) => {
    setComand(selectedComand);
  };
  

   



  
  const textInputRef = useRef(null);

  const buttonColor = dataFromScreenA === 'I got' ? 'green' : 'red';


  useEffect(() => {
    // Focus the TextInput when the component mounts
    textInputRef.current?.focus();
  }, []);

  const goBack = () => {
    navigation.goBack();
  };

  // const handleSave = async () => {
    
          
  //     const accountResponse = await axios.post('https://good-pink-tuna-hat.cyclic.app/api/customers', {
  //       name: 'tah',
  //       accountId: accountId,
  //     });
  //     console.log('Account created:', accountResponse.data);
      
  //     return accountResponse.data;
      


    

  // }

  console.log('userData', custId);

  const saveData = async () => {

    
  
    
    const editData = {
        amount: comand,
        comand: numberInput,
        time: date,
        itemName: itemName,
        quantity: quantity,
    };
    
    const postUrl = `https://calm-plum-crane-slip.cyclic.app/api/suppliers/${custId}/edit-amount/${amountId}`; // Replace with your actual API endpoint
    
    axios.put(postUrl, editData)
      .then(response => {
        console.log('Response:', response.data);
        
        
        navigation.navigate('SupplierDetailsScreen',{
          'supplierId' : custId
        });
        })
      
      .catch(error => {
        console.error('Error making the request:', error);
      })
  };
  
  
  

  return (
    <SafeAreaView style={{flex: 1}}>
    <View>
      {/* Custom Header */}
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', padding: 10 }}>
        <TouchableOpacity className="text-black dark:text-white mt-2" onPress={goBack}>
        <Ionicons name="chevron-back" size={34} color="black" />
        </TouchableOpacity>
        <Text className="mx-3 text-black py-2 font-semibold ">Edit</Text>
      </View>

      <View className='items-start mt-16 max-w-[100%]  '>


      
      <View className='flex-row items-center shadow-2xl px-1 min-w-[90%] py-2 bg-gray-300 rounded-xl mx-4' >
        <Text className='text-lg mx-2 text-black'>Rs</Text>
      <TextInput
      className='border-0 shadow-lg py-0 min-w-[30%] text-black w-[70%] h-12 rounded-xl text-lg font-bold'
      
        keyboardType="numeric"
        ref={textInputRef}
        placeholderTextColor={'black'}
        value={numberInput}
        onChangeText={setNumberInput}
        placeholder='Enter Amount'
        maxLength={8}
      />
      <View>

        
        

        

       
      </View>

      </View>

      <View className='flex-row items-center my-2 shadow-2xl px-1 min-w-[50%] py-2 bg-gray-300 rounded-xl mx-4' >
        
      <TextInput
      className='border-0 shadow-lg py-0 min-w-[30%]  text-black w-[90%] h-12 rounded-xl text-lg font-semibold'
      
        keyboardType="default"
        ref={textInputRef}
        placeholderTextColor={'black'}
        value={itemName}
        onChangeText={setItemName}
        
        placeholder='Item Name (Optional)'
        
      />
      <View>

        
        

        

       
      </View>

      </View>

      <View className='flex-row items-center my-1 shadow-2xl px-1 min-w-[50%] py-2 bg-gray-300 rounded-xl mx-4' >
        
      <TextInput
      className='border-0 shadow-lg py-0 min-w-[30%]  text-black w-[90%] h-12 rounded-xl text-lg font-semibold'
      
        keyboardType="numeric"
        ref={textInputRef}
        placeholderTextColor={'black'}
        value={quantity}
        onChangeText={setQuantity}
        
        placeholder='Quantity (Optional)'
        
      />
      <View>

        
        

        

       
      </View>

      </View>


      <View className="mx-8 my-3">
      <TouchableOpacity onPress={toggleDatePicker} className='text-black rounded-xl border-black bg-gray-300 rounded-xl px-3 py-2 flex-row'>
      {show && (
        <>
            <DateTimePicker
              value={date}
              mode="date"
              is24Hour={true}
              display='default'
              onChange={onChange}
            />
            
                </>
          )}
          <Entypo
            name="calendar" size={24} color="black"/>
                        <Text className="text-black dark:text-white mx-2">{date.toString().substr(4, 12)}</Text>

            </TouchableOpacity>
      </View>

      <View className='flex-row items-center mt-6 self-center'>
    <TouchableOpacity onPress={() => handleComandSelection('I got')} className={`bg-${comand === 'I got' ? 'red' : 'green'}-600 rounded-xl px-6 py-2 mx-2`}>
      <Text className={`text-${comand === 'I got' ? 'white' : 'black'}`}>I Got</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => handleComandSelection('i gave')} className={`bg-${comand === 'i gave' ? 'red' : 'green'}-600 rounded-xl px-6 py-2 mx-2`}>
      <Text className={`text-${comand === 'i gave' ? 'white' : 'black'}`}>I Gave</Text>
    </TouchableOpacity>
  </View>

      <TouchableOpacity  className=' w-[50%] mt-[20%] h-12 rounded-xl mx-auto items-center justify-center bg-black' onPress={saveData} >
        <Text className='text-white text-xl'>Edit</Text>
      </TouchableOpacity>
      

      </View>
      

      {/* <CurrentDateTimeComponent /> */}
    </View>
    </SafeAreaView>
  );
};

export default SupplierEditAmount;