/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Text } from 'react-native';
import CustomHeader from '../../../components/CustomHeader';

const CreateSupplier = ({ navigation, route }) => {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const { accountId } = route.params;
    console.log('accountId', accountId);
    


    const handleSave = () => {

        if (name.trim() === '' || !/^[a-zA-Z\s]+$/.test(name)) {
            alert('Please enter a valid name with alphabetic characters only.');
            return;
        }

        if (phoneNumber.trim() === '' || !/^\d+$/.test(phoneNumber)) {
            alert('Please enter a valid phone number with numeric characters only.');
            return;
        }

        // Perform save logic here
        console.log('Saving supplier:', name, phoneNumber);
        
        navigation.navigate('SupplierTransaction', { 'name': name,'phoneNumber': phoneNumber, 'accountId' : accountId });
        

    };

    return (
        
        <View>
            <CustomHeader title="Create Supplier" /> 
            <View style={styles.contaainer}>    
            <TextInput
                placeholder="Enter supplier name"
                value={name}
                className="text-black rounded-xl  "
                placeholderTextColor={'black'}
                onChangeText={setName}
                style={styles.textFeild}
            />
            <TextInput
                placeholder="Enter phone number"
                value={phoneNumber}
                className="text-black rounded-xl  "
                placeholderTextColor={'black'}
                onChangeText={setPhoneNumber}
                style={styles.textFeild}
            />
            <TouchableOpacity className="bg-black py-3 px-8 min-w-[60%] rounded-xl  my-40s"  title="Save" onPress={handleSave} >
                <Text className="text-white  self-center  font-bold">Save</Text>
            </TouchableOpacity>
            </View>   
        </View>
    );
};

const styles = StyleSheet.create({
    contaainer: {
        alignItems: 'center',
        paddingTop: '30%',
    },
    textFeild: {
        borderWidth: 1.5,
        borderColor: 'black',
        padding: 10,
        marginBottom: 10,
        color: 'black', 
        width: '80%',
        fontWeight: 'bold',
        borderRadius: 20,
        marginVertical: 10,
    },
    btn: {
        marginTop: '35%',
        width: '40%',
        borderRadius: 20,
        marginVertical: 10,
    },

});

export default CreateSupplier;
