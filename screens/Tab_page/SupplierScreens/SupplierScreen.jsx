/* eslint-disable prettier/prettier */
import { useRoute } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CurrentDateTimeComponent from '../../../components/currentDateTime';
import AnimatedArrowDown from '../../../components/animatedArrowDown';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SupplierTransactionScreen = ({ navigation }) => {
    const goBack = () => {
        navigation.goBack();navigation.goBack();

    };

    const route = useRoute();
  const dataFromScreenA = route.params?.name || 'Default Value';
  const accountId = route.params?.accountId || 'Default Value';
  const phoneNumber = route.params?.phoneNumber || 'Default Value';

  console.log('dataFromScreenA', dataFromScreenA);
  const a = "i gave"
    const b = "I got"

    const maineliye = () => {
        navigation.navigate('SupplierTodo', {
            'command' : a,
            'accountId' : accountId,
            'name': dataFromScreenA,
            'phoneNumber': phoneNumber,
        });        

    }

    const mainediye = () => {
        navigation.navigate('SupplierTodo', {
            'command' : b,
            'accountId' : accountId,
            'name' : dataFromScreenA,
            'phoneNumber': phoneNumber,

        });        

    }

    

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 15 }}>
            <TouchableOpacity onPress={goBack}>
      <Ionicons name="chevron-back" size={34} color="black" />
      </TouchableOpacity>
            </View>
            <View style={styles.cantainer}>
                <Text className="self-center text-xs text-black font-bold">Only you and {dataFromScreenA} can see these entries</Text>
                <View style={styles.bottomContainer}>
                    <Text className='text-md text-black font-bold shadow-inner' >Add transaction of {dataFromScreenA}</Text>
                    <AnimatedArrowDown/>
                    <View className="flex-row mb-[10%] mt-[6%]" >
                    <TouchableOpacity className=' bg-red-500 shadow-lg shadow-red-500/50 px-5 rounded-xl text-black m-4' value={a} onPress={maineliye} >
                        <Text className='text-black text-lg font-bold'>{a}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className=' bg-green-500 shadow-lg shadow-green-500/50 px-6 rounded-xl text-black m-4'  onPress={mainediye}>
                        <Text className='text-black text-lg font-bold'>{b}</Text>
                        
                    </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cantainer: {
        alignItems: 'center',
        paddingTop: 30,
        flex: 1,
    },
    text: {
        fontSize: 15,
        fontWeight: '800',
        color: 'black',
    },
    bottomContainer: {
        flex: 1,
        justifyContent : 'flex-end',
        alignItems: 'center',
        marginBottom: '10%',
    },      
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '70%',
        marginTop: 20,
        marginTop: 120,
    },
    btn: {
       
       
        padding: 10,
        borderWidth: 1.5,
        
        color: 'black', 
        width: '50%',
        fontWeight: 'bold',
        borderRadius: 8,
        marginVertical: 10,
        marginHorizontal: 10,
        alignItems: 'center',
    },


});

export default SupplierTransactionScreen;
