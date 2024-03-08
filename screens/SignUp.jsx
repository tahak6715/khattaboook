/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useRef, useContext } from 'react';
import { Button, TextInput, View, StyleSheet, KeyboardAvoidingView, TouchableOpacity, SafeAreaView, FlatList, TouchableWithoutFeedback, Modal } from 'react-native';
import { Text } from 'react-native'
import { Countries } from '../components/countries';
import styless from '../native_styles/styling';
import axios from 'axios';
import { useAppContext } from '../src/AppContext';
import { useAuth } from '../src/AuthContext';



function RegisterScreen({ navigation }) {
  const { setUserDataContext } = useAppContext();
  const { userData } = useAppContext();
  const { isAuthenticated, signIn } = useAuth();
  

  


  let textInput = useRef(null);

  const defaultCountryCode = '+92';
  const defaultMask = '999 999 9999';
  const [phoneNumber, setPhoneNumber] = useState('');
  const [focusInput, setFocusInput] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [dataCountries, setDataCountries] = useState(Countries);
  const [countryCode, setCountryCode] = useState(defaultCountryCode);
  const [placeholder, setPlaceholder] = useState(defaultMask);


  const onShowHideModal = () => {
    setModalVisible(!modalVisible);
  }

  const onChangePhone = (number) => {
    setPhoneNumber(number);
  }

  const onPressContinue = async () => {
    if (phoneNumber.length > 8) {
      try {
        const response = await axios.post('https://calm-plum-crane-slip.cyclic.app/api/profiles', {
          phoneNumber: phoneNumber,
        });
  
        if (response.status === 403) {
          console.log('Maximum allowed profiles reached');
          // Display a message to the user about the limit reached
          // You can handle this case in your React Native code
          return;
        }
  
        console.log(response.data);
        setUserDataContext(response.data);
        signIn('abc');
  
        // If the profile already exists, navigate to login
        if (response.data.message === 'Profile already exists') {
          
          
          navigation.navigate('login', { data: response.data });
          signIn('abc');
        } else {
          // Otherwise, continue with creating the default account
          const accountResponse = await axios.post('https://calm-plum-crane-slip.cyclic.app/api/accounts', {
            name: 'Default Account',
            profileId: response.data.profileId,
          });
  
          console.log('Account created:', accountResponse.data);
          
          
  
          navigation.navigate('login', { data: response.data });
          
          
        }
  
        return response.data;
      } catch (error) {
        console.error('Error creating or fetching profile:', error);
        // Handle the error as needed
      }
    }
  };
  
  

  const onChangeFocus = () => {
    setFocusInput(true);
  }

  const onChangeBlur = () => {
    setFocusInput(false);
  }

  useEffect(() => {
    if (textInput.current) {
      textInput.current.focus();
    }
  },[])

  const filterCountries = (value) => {

    if(value) {
      const countryData = Countries.filter((obj) => 
      (obj.en.indexOf(value) > -1) || (obj.dialCode.indexOf(value) > -1)) 
      setDataCountries(countryData);
    } else {
      setDataCountries(Countries);
    }

  }

  const onCountryChange = (item) => {
    setCountryCode(item.dialCode);
    setPlaceholder(item.mask);
    console.log(item);
    onShowHideModal();


  }




  const renderModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => onShowHideModal()}
      >
        <SafeAreaView style={{flex: 1}}>
          <View style={styles.modalContainer}>
            <View style={styles.filterInputContainer}>
            <TextInput
            autoFocus={true}
            onChangeText={filterCountries}
            placeholder='filter'
            focusable={true}
            style={styles.filterInput}
            />

            </View>
            
             <FlatList
            style={{flex: 1}}
            data={dataCountries}
            extraData={dataCountries}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <TouchableWithoutFeedback onPress={() => onCountryChange(item)}>
                <View style={styles.countryModalStyle}>
                  <View style={styles.modalItemContainer}>
                  <Text style={styles.modalItemName}>{item.en}</Text>
                  <Text style={styles.modalItemDial}>{item.dialCode}</Text>
                  
                  </View>

                </View>

              </TouchableWithoutFeedback>
    )}
            />
          
            </View>

            <TouchableOpacity onPress={() => onShowHideModal()} style={styles.closeButtonStyle}>
              <Text style={styles.closeTextStyle}>{'CLOSE'}</Text>
              </TouchableOpacity>
           

          </SafeAreaView>
      </Modal>
    )
  }


  return (
    <View style={styles.container}>
      <KeyboardAvoidingView 
      keyboardVerticalOffset={50}
      behavior={'padding'}
      style={styles.containerAvoidingView}>
        
        <Text style={[styles.textTitle,styless.textCenter,styless._black]}>
          Please input your mobile phone number
        </Text>
        <View style={[
          styles.containerInput,
          {
            borderBottomColor: focusInput ? '#244DB7' : 'gray',
          }
          ]}>
          <TouchableOpacity onPress={onShowHideModal}>
          <View style={styles.openDialogView}>
            <Text className="text-black" >{countryCode + "|"}</Text>
          </View>
          </TouchableOpacity>
          {renderModal()}
          <TextInput
          className="text-black"
            style={styles.phoneInputStyle}
            placeholder={placeholder}
            keyboardType={'numeric'}
            maxLength={11}
            onChangeText={onChangePhone}
            secureTextEntry={false}
            value={phoneNumber}
            onFocus={onChangeFocus}
            onBlur={onChangeBlur}
            autoFocus={focusInput}


            />

        </View>

        <View style={styles.viewBottom}>
          <TouchableOpacity onPress={onPressContinue}>

            <View style={[
              styles.btnContinue,
              {
                backgroundColor: phoneNumber? '#244DB7' : 'gray',
              }
            ]}>
              <Text style={{color: '#ffffff', alignItems: 'center', }}>Continue</Text>
            </View>

          </TouchableOpacity>

          

        </View>

        </KeyboardAvoidingView>
      </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  containerAvoidingView: {
    flex: 1,
    justifyContent: 'center',
    padding: 8,
  },
  textTitle: {
    color: 'black',
    fontSize: 13,
    marginBottom: 50,
    marginTop: 50,
    fontWeight: 'bold',
    
    

  },
  containerInput: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    borderBottomwidth: 1.5,
    color: 'black',
    marginHorizontal: 10,

  },
  openDialogView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'black',
  },
  phoneInputStyle: {
    marginLeft: 5,
    flex: 1,
    height: 50,
    fontWeight: 'bold',
    color: 'black',
  },
  viewBottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 50,
    alignItems: 'center',
  },
  btnContinue: {
    width: 150,
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  modalContainer: {
    paddingTop: 15,
    paddingLeft: 25,
    paddingRight: 25,
    flex: 1,  
    backgroundColor: 'white'
  },
  filterInput: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#fff',
    color: '#424242',
  },
  countryModalStyle: {
    flex: 1,
    borderColor: 'black',
    borderTopWidth: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'

  },
  modalItemContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 5,
  },
  modalItemName: {
    fontSize: 16,
  
  },
  modalItemDial: {
    fontSize: 16,
  },
  filterInputContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  closeButtonStyle: {
    padding: 12,
    alignItems: 'center',
  },
  closeTextStyle: {
    padding: 5,
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  }

  

});

export default RegisterScreen;

// import React, { useState } from 'react';
// import { View, TextInput, Button, Alert } from 'react-native';
// import { Auth, Client } from 'appwrite';

// const PhoneAuthentication = () => {
//   const { client } = new Client();
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [verificationCode, setVerificationCode] = useState('');

//   const handleSendCode = async () => {
//     try {
//       // Send phone authentication code using Appwrite
//       const response = await client.account.createSession('phone', {
//         phone: phoneNumber,
//         locale: 'en', // Set your preferred locale
//       });

//       // Appwrite will send a verification code to the user's phone number
//       console.log('Verification Code Sent:', response);
//     } catch (error) {
//       console.error('Error sending code:', error);
//     }
//   };

//   const handleVerifyCode = async () => {
//     try {
//       // Verify phone authentication code using Appwrite
//       await client.account.createSession('phone', {
//         phone: phoneNumber,
//         verification: verificationCode,
//       });

//       // If verification is successful, you can perform further actions
//       Alert.alert('Success', 'Phone number verified successfully');
//     } catch (error) {
//       console.error('Error verifying code:', error);
//     }
//   };

//   return (
//     <View>
//       <TextInput
//         placeholder="Phone Number"
//         value={phoneNumber}
//         onChangeText={setPhoneNumber}
//       />
//       <Button title="Send Code" onPress={handleSendCode} />
//       <TextInput
//         placeholder="Verification Code"
//         value={verificationCode}
//         onChangeText={setVerificationCode}
//       />
//       <Button title="Verify Code" onPress={handleVerifyCode} />
//     </View>
//   );
// };

// export default PhoneAuthentication;



// import React, { useState } from 'react';
// import { View, TextInput, Button, Alert } from 'react-native';
// import auth from '@react-native-firebase/auth';

// const SignUp = () => {
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [verificationCode, setVerificationCode] = useState('');
//   const [confirm, setConfirm] = useState(null);

//   const handleSendCode = async () => {
//     try {
//       const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
//       setConfirm(confirmation);
//     } catch (error) {
//       Alert.alert('Error', error.message);
//     }
//   };

//   const handleVerifyCode = async () => {
//     try {
//       await confirm.confirm(verificationCode);
//       Alert.alert('Success', 'Phone number verified successfully!');
//     } catch (error) {
//       Alert.alert('Error', error.message);
//     }
//   };

//   return (
//     <View>
//       <TextInput
//         placeholder="Phone Number"
//         value={phoneNumber}
//         onChangeText={setPhoneNumber}
//       />
//       <Button title="Send Code" onPress={handleSendCode} />

//       {confirm && (
//         <>
//           <TextInput
//             placeholder="Verification Code"
//             value={verificationCode}
//             onChangeText={setVerificationCode}
//           />
//           <Button title="Verify Code" onPress={handleVerifyCode} />
//         </>
//       )}
//     </View>
//   );
// };

// export default SignUp;
