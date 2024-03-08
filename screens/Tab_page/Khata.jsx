import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import styless from '../../native_styles/styling';
import TopTabs from '../../components/topbar';
import { NavigationContainer } from '@react-navigation/native';


const Khata = () => {
    return (
        
        <> 
        
                <TopTabs />
                
            
        
        </>
    );
};


const styles = StyleSheet.create({
    bg:{
        backgroundColor:'white',
    },
    khata:{
        fontSize:40,
        fontWeight:'bold',
        color:'black',
        textAlign:'center',
        marginTop:20,
        justifyContent:'center',
    }
});
export default Khata;
