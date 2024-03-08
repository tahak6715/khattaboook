/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useAuth } from '../../src/AuthContext';




const Settings = ({navigation}) => {
    const [phoneNumber, setPhoneNumber] = useState('123-456-7890'); // Replace with actual phone number
    const [avatar, setAvatar] = useState('path/to/avatar.jpg'); // Replace with actual avatar path
    const { signOut } = useAuth();
    const handleBackup = () => {
        // Implement backup logic here
        signOut();
        navigation.navigate('SignUp');
    };

    return (
        <View >
            <TouchableOpacity className="flex-col self-end  -mt-4" onPress={handleBackup}>
                <MaterialIcons name="logout" size={40} color="black"  />
                <Text className="font-bold relative right-4 " >Logout</Text>
            </TouchableOpacity>
            <View style={{marginTop: '90%', alignItems: 'center'}}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>AL - MUSTAFA GARMENTS</Text>
                <Text style={{ fontSize: 11, color: 'gray' }}>Version 1.0.0</Text>
            </View>
            
        </View>
    );
};

export default Settings;
