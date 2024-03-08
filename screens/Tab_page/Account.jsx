/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image, StyleSheet } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import RNFS from 'react-native-fs';
import { PermissionsAndroid } from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';


const requestStoragePermission = async () => {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
                title: 'Storage Permission',
                message: 'App needs access to your storage to download files.',
                buttonPositive: 'OK',
            }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Storage permission granted');
            return true;
        } else {
            console.log('Storage permission denied');
            return false;
        }
    } catch (err) {
        console.warn(err);
        return false;
    }
};



const Account = () => {
    const [amount, setAmount] = useState('');
    const [quantity, setQuantity] = useState('');
    const [billNumber, setBillNumber] = useState('');
    const [date, setDate] = useState('');
    const [photo, setPhoto] = useState(null);

    

     

    const handleChoosePhoto = async () => {
        try {
            const image = await ImagePicker.openPicker({
                width: 300,
                height: 400,
                cropping: true,
            });

            setPhoto(image.path);
        } catch (error) {
            console.log('ImagePicker Error: ', error);
        }
    };

    const handleDownload = async () => {
        // Request storage permission
        const hasPermission = await requestStoragePermission();
    
        // Proceed with download if permission is granted
        if (hasPermission) {
            const transactionDetails = `
                <html>
                    <body>
                        <p>Amount: ${amount}</p>
                        <p>Quantity: ${quantity}</p>
                        <p>Bill Number: ${billNumber}</p>
                        <p>Date: ${date}</p>
                        ${photo ? `<img src="${photo}" width="300" height="400" />` : ''}
                    </body>
                </html>
            `;
    
            try {
                const options = {
                    html: transactionDetails,
                    fileName: 'transaction_details',
                    directory: RNFS.DocumentDirectoryPath,
                };
    
                const pdfFile = await RNHTMLtoPDF.convert(options);
    
                console.log('Transaction details downloaded successfully:', pdfFile.filePath);
            } catch (error) {
                console.error('Error downloading transaction details:', error);
            }
        }
    };
    
    return (
        <View className="text-black" style={styles.container}>
            {/* Amount */}

            <Text className="text-black text-2xl font-bold text-center mb-4">Transaction Details</Text>
            <View className="flex-col" style={styles.inputContainer}>
                <Text className="text-black " >Amount:</Text>
                <TextInput
                className="text-black my-1 border-4  rounded-xl"
                    
                    keyboardType="numeric"
                    value={amount}
                    onChangeText={(text) => setAmount(text)}
                />
            </View>

            {/* Quantity */}
            <View style={styles.inputContainer}>
                <Text className="text-black">Quantity:</Text>
                <TextInput
                className="text-black my-1 border-4 rounded-xl"
                    keyboardType="numeric"
                    value={quantity}
                    onChangeText={(text) => setQuantity(text)}
                />
            </View>

            {/* Bill Number */}
            <View style={styles.inputContainer}>
                <Text className="text-black">Bill Number:</Text>
                <TextInput
                className="text-black my-1 border-4 rounded-xl"
                    value={billNumber}
                    onChangeText={(text) => setBillNumber(text)}
                />
            </View>

            {/* Date */}
            <View style={styles.inputContainer}>
                <Text className="text-black">Date:</Text>
                <TextInput
                className="text-black my-1 border-4 rounded-xl"
                    placeholder="YYYY-MM-DD"
                    value={date}
                    onChangeText={(text) => setDate(text)}
                />
            </View>

            {/* Photo */}
            <TouchableOpacity className="rounded-lg border-black border-4 w-[50%] self-center my-4" style={styles.photoContainer} onPress={handleChoosePhoto}>
                <Text className="text-black my-3">Choose Photo</Text>
                {photo && <Image source={{ uri: photo }} style={styles.photo} />}
            </TouchableOpacity>

            {/* Download Button */}
            <TouchableOpacity onPress={handleDownload} style={styles.button}>
                <Text  style={styles.buttonText}>Download Transaction</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    inputContainer: {
        flexDirection: 'col',
        
       
    },
    input: {
        flex: 1,
        marginLeft: 10,
        borderWidth: 1,
        
        borderRadius: 5,
        
    },
    photoContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    photo: {
        width: 100,
        height: 100,
        marginTop: 10,
        borderRadius: 5,
    },
    button: {
        backgroundColor: '#3498db',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginHorizontal: 20,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default Account;
