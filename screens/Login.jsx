/* eslint-disable prettier/prettier */
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, Button, Alert, KeyboardAvoidingView, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import clockCall from 'react-native';

const VerificationScreen = ({ navigation }) => {

    const et1 = useRef();
    const et2 = useRef();
    const et3 = useRef();
    const et4 = useRef();

    const [field1, setField1] = useState('');
    const [field2, setField2] = useState('');
    const [field3, setField3] = useState('');
    const [field4, setField4] = useState('');

    const [count, setCount] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            if(count == 0){
                clearInterval(interval);
            }else{
                setCount(count - 1);
            }
            
        }, 1000);
        return () => clearInterval(interval);

    }, [count]);









  

  return (

    <View style={styles.container}>
        <Text style={styles.title}>OTP</Text>

        <View style={styles.otpView}>
            <TextInput
                ref={et1}
                maxLength={1}
                value={field1}
                keyboardType="numeric"
                style={{ height: 50, width: 50, borderColor: field1 >= 1 ? 'blue' : 'gray', borderWidth: 0.5, borderRadius: 10, marginHorizontal: 10, textAlign: 'center', fontSize: 18, fontWeight: '700', color: 'black' }}
                onChangeText={(text) => {
                    setField1(text);
                    if (text.length >= 1) {
                        et2.current.focus();
                    }
                }}
            />
            <TextInput
                ref={et2}
                maxLength={1}
                value={field2}
                keyboardType="numeric"
                style={{ height: 50, width: 50, borderColor: field2 >= 1? 'blue' : 'gray', borderWidth: 0.5, borderRadius: 10, marginHorizontal: 10, textAlign: 'center', fontSize: 18, fontWeight: '700', color: 'black' }}
                onChangeText={(text) => {
                    setField2(text);
                    if (text.length >= 1) {
                        et3.current.focus();
                    }else if(text.length == 0){
                        et1.current.focus();
                    }
                }}
            />
            <TextInput
                ref={et3}
                maxLength={1}
                value={field3}
                keyboardType="numeric"
                style={{ height: 50, width: 50, borderColor: field3 >= 1? 'blue' : 'gray', borderWidth: 0.5, borderRadius: 10, marginHorizontal: 10, textAlign: 'center', fontSize: 18, fontWeight: '700', color: 'black' }}
                onChangeText={(text) => {
                    setField3(text);
                    if (text.length >= 1) {
                        et4.current.focus();
                    }else if(text.length == 0){
                        et2.current.focus();
                    }
                }}
            />
            <TextInput
                ref={et4}
                maxLength={1}
                value={field4}
                keyboardType="numeric"
                style={{ height: 50, width: 50, borderColor: field4 >= 1? 'blue' : 'gray', borderWidth: 0.5, borderRadius: 10, marginHorizontal: 10, textAlign: 'center', fontSize: 18, fontWeight: '700', color: 'black' }}
                onChangeText={(text) => {
                    setField4(text);
                    if (text.length >= 1) {
                        et4.current.focus();
                    }else if(text.length == 0){
                        et3.current.focus();
                    }
                }}
            />

        </View>

        {/* <View style={styles.resend}>
            <Text>Resend</Text>
            <Text>{count}</Text>
        </View> */}

<TouchableOpacity 
    onPress={() => {
        const enteredOTP = `${field1}${field2}${field3}${field4}`;
        if (enteredOTP === "0321") {
            // Correct OTP, navigate to the next screen (e.g., 'Home')
            navigation.navigate('Home');
        } else {
            // Incorrect OTP, show an alert or perform other actions
            Alert.alert('Invalid OTP', 'Please enter the correct OTP', [
                { text: 'OK' },
            ]);
            // Optionally, you can clear the entered OTP fields
            setField1('');
            setField2('');
            setField3('');
            setField4('');
            // Optionally, you can focus on the first OTP input field
            et1.current.focus();
        }
    }}
    style={[styles.styleOtpBtn, { backgroundColor: field1 !== '' && field2 !== '' && field3 !== '' && field4 !== '' ? 'blue' : 'gray', width: '50%' }]}
    disabled={field1 !== '' && field2 !== '' && field3 !== '' && field4 !== '' ? false : true}
>
    <Text style={{ color: 'white', fontSize: 20, fontWeight: '700' }}>Verify</Text>
</TouchableOpacity>



        </View>
    
  );


};

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        marginTop: 100,
        alignSelf: 'center',
        color: 'black',
    },
    otpView: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 100,
    },
    styleOtpBtn: {
        width: '90%',
        height: 55,
        backgroundColor: '#244DB7',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        marginTop: 90,
        alignSelf: 'center',
        
    },
    resend: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: 30,
        marginBottom: 30,
    },
});



export default VerificationScreen;
