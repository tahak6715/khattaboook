/* eslint-disable prettier/prettier */
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
// eslint-disable-next-line prettier/prettier
import { useRoute, useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CurrentDateTimeComponent from '../../../components/currentDateTime';
import axios from 'axios';
import { useAppContext } from '../../../src/AppContext';
import DateTimePicker from '@react-native-community/datetimepicker';
import Entypo
    from 'react-native-vector-icons/Entypo';
    import ImagePicker from 'react-native-image-crop-picker';
    import Feather 
    from 'react-native-vector-icons/Feather';
    import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
    import ActionSheet from 'react-native-action-sheet';
    import ActionSheetAndroid from 'react-native-actionsheet';

const SupplierTodo = ({ navigation }) => {
  const [numberInput2, setNumberInput] = useState();
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState(1);

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState('date');
  const [receiptImageUri, setReceiptImageUri] = useState('');
  const [receiptImageBase64, setReceiptImageBase64] = useState(''); 
  const [image, setImage] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  

  const onChange = (e, selectedDate) => {
    setDate(selectedDate);
    setShow(false);
  };

  const toggleDatePicker = () => {
    setShow(!show);
  };



  const route = useRoute();
  const dataFromScreenA = route.params?.command || 'Default Value';
  const getAccountId = () => {
    if (route && route.params) {
      const { accountId } = route.params;
      console.log(accountId);
      return accountId;
    } else {
      console.error('Route or route.params is undefined');
      return null;
    }
  };
 console.log(getAccountId())
  const accountIdd = getAccountId();
   
  const name = route.params?.name || 'Default Value';
  const phoneNumber = route.params?.phoneNumber || 'Default Value';
  const { userData } = useAppContext();
  const { setUserDataContext } = useAppContext();

  console.log('dataFromScreenA', dataFromScreenA);
  console.log(accountIdd)
  console.log(name)
  console.log(numberInput2)

  
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

  const handleImageResponse = (response) => {
    if (!response.didCancel) {
      setImage(response);
      console.log(response.path);
      handleUpload(response);
    }
  };

  const pickImage = async () => {
    try {
      const options = {
        mediaType: 'photo',
      };
  
      const imagePickerOptions = {
        title: 'Select Image',
        cancelButtonTitle: 'Cancel',
        takePhotoButtonTitle: 'Take Photo',
        chooseFromLibraryButtonTitle: 'Choose from Library',
        quality: 1,
        mediaType: 'photo',
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      };
  
      ActionSheet.showActionSheetWithOptions(
        {
          ...imagePickerOptions,
          options: ['Take Photo', 'Choose from Library', 'Cancel'],
          cancelButtonIndex: 2,
        },
        async (buttonIndex) => {
          if (buttonIndex === 0) {
            // Take Photo
            try {
              const result = await ImagePicker.openCamera(options);
              handleUpload(result);
            } catch (error) {
              console.error('Error taking photo:', error);
            }
          } else if (buttonIndex === 1) {
            // Choose from Library
            try {
              const result = await ImagePicker.openPicker(options);
              handleUpload(result);
            } catch (error) {
              console.error('Error picking image:', error);
            }
          }
        }
      );
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };
  
  const handleUpload = async (image) => {
    try {
      setIsLoading(true); // Set loading state to true before making the fetch request
  
      const data = new FormData();
      data.append('file', {
        uri: image.path,
        type: image.mime,
        name: image.filename || `test.${image.path.split('.').pop()}`,
      });
      data.append('upload_preset', 'rjnrqy8u');
      data.append('cloud_name', 'deg4ohfvn');
  
      const response = await fetch('https://api.cloudinary.com/v1_1/deg4ohfvn/image/upload', {
        method: 'post',
        body: data,
      });
  
      const responseData = await response.json();
      console.log(responseData);
  
      setReceiptImageUri(responseData.url);
      setReceiptImageBase64(responseData.data);
    } catch (error) {
      console.log('An Error Occurred While Uploading', error);
      // Handle error as needed
    } finally {
      setIsLoading(false); // Set loading state to false once the request is completed
    }
  };

  console.log('userData', userData);

  const saveDatad = async () => {

    if (!numberInput2.trim()) {
      alert('Amount is required');
      return;
    }

    if (!/^\d+$/.test(numberInput2)) {
      alert('Amount should contain only numeric characters');
      return;
    }

     setIsLoading(true);
      const uploadedImageUrl = await receiptImageUri; 



    const postDatad = {
      name: name,
      phoneNumber: phoneNumber,
      commandTime: "2023-01-01T12:00:00Z",
      accountId: userData.accountId,
      amount: [
        {
          amount: dataFromScreenA,
          comand: numberInput2,
          time: date,
          itemName: itemName,
          quantity: quantity,
          image: uploadedImageUrl,
        }
      ]
    };
    
    const postUrld = 'https://calm-plum-crane-slip.cyclic.app/api/suppliers'; // Replace with your actual API endpoint
    
    axios.post(postUrld, postDatad)
      .then(response => {
        
   

        console.log('Response:', response.data);
        console.log('Request Payload:', postDatad);

        
        navigation.navigate('SupplierDetailsScreen',{
          'supplierId' : response.data.supplierId,
        });
        })
      
      .catch(error => {
        console.error('Error making the request:', error);
      }).finally(() => {
        setIsLoading(false);
      });

      if (!isButtonDisabled) {
        setIsButtonDisabled(true);
  
        setTimeout(() => {
          setIsButtonDisabled(false);
        }, 2000);
      }
  };
  
  
  

  return (
    <SafeAreaView style={{flex: 1}}>
    <View>
      {/* Custom Header */}
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', padding: 10 }}>
        <TouchableOpacity className="text-black dark:text-white mt-2" onPress={goBack}>
        <Ionicons name="chevron-back" size={34} color="black" />
        </TouchableOpacity>
        <Text className="mx-3 text-black py-2 font-semibold ">{dataFromScreenA}</Text>
      </View>

      <View className='items-start mt-16 max-w-[100%]  '>


      
      <View className='flex-row items-center shadow-2xl px-1 min-w-[90%] py-2 bg-gray-300 rounded-xl mx-4' >
        <Text className='text-lg mx-2 text-black'>Rs</Text>
      <TextInput
      className='border-0 shadow-lg py-0 min-w-[30%] text-black w-[70%] h-12 rounded-xl text-lg font-bold'
      
        keyboardType="numeric"
        ref={textInputRef}
        placeholderTextColor={'black'}
        value={numberInput2}
        onChangeText={(text) => {
          // Use regular expression to allow only numeric characters
          const numericText = text.replace(/[^0-9]/g, '');
          setNumberInput(numericText);
        }}
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
        onChangeText={(text) => {
          // Use regular expression to allow only numeric characters
          const numericText = text.replace(/[^0-9]/g, '');
          setQuantity(numericText);
        }}
        
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

      <View className=" bg-gray-300 rounded-xl">
      <TouchableOpacity className=" flex flex-row absolute left-[50%] bg-gray-300 rounded-xl py-2 px-2" onPress={pickImage}>
        <Feather name="image" size={24} color="black" />
  <Text className="mx-2">Select Receipt</Text>
</TouchableOpacity>
</View>



<TouchableOpacity  className=' w-[50%] mt-[20%] h-12 rounded-xl mx-auto items-center justify-center bg-black' disabled={isButtonDisabled || isLoading} onPress={saveDatad} >
        {isLoading ? (
              <ActivityIndicator color="white" /> // Show loading indicator when uploading
            ) : (
              <Text className="text-white text-xl">Save</Text>
            )}</TouchableOpacity>
      

      </View>
      

      {/* <CurrentDateTimeComponent /> */}
    </View>
    </SafeAreaView>
  );
};

export default SupplierTodo;
