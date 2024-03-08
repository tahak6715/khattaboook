/* eslint-disable prettier/prettier */
// SplashScreen.js
import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import styless from '../native_styles/styling';
import { ImageBackground } from 'react-native';
import { Image } from 'react-native';
import image from '../images/premium2.png'
import { StyleSheet } from 'react-native';


const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    // Simulate some initialization tasks
    setTimeout(() => {
      navigation.replace('OnBoarding');
    }, 2000);
  }, [navigation]);

  return (
    
      
      <View style={styles.container} >
      <Image source={image} style={styles.tinyLogo} />
      <Text style={[styless.textCenter, styless.textBlack, styless.fs1, styles.text]} >
      AL - MUSTAFA
      </Text>
      <Text style={[styless.textCenter, styless.textBlack, styless.fs1,styles.text2]}>
      GARMENTS
      </Text>

      <Text style={[styles.text1]}>Safe Secure and Trusted</Text>
      
      
      </View>
   
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    
    
    
    
    
  },
  text: {
    color: 'white',
    fontSize: 22,
    lineHeight: 84,
    fontWeight: 'bold',
    
    textAlign: 'center',
    marginTop: -10,
    
    
    
    
  
    

  
  
  },
  text2: {
    color: 'white',
    fontSize: 20,
    lineHeight: 84,
    fontWeight: 'bold',
    
    textAlign: 'center',
    marginTop: -68,
    
    
    
    
  
    

  
  
  },
  text1: {
    color: 'white',
    position: 'relative',
    top: '20%',
    fontSize: 15,

  }
  ,
  tinyLogo: {
    
    
    
    
    opacity: 1,
    
    marginVertical: 6,
    
    
    
  },
  flex1: {
    flex: 1,
  },
});

export default SplashScreen;
