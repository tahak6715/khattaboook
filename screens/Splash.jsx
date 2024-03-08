/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet, useColorScheme } from 'react-native';
import { useTheme } from '@react-navigation/native';
import image from '../images/premium2.png';
import { useAuth } from '../src/AuthContext';

const Splash = ({ navigation }) => {
  const colorScheme = useColorScheme();
  const { colors } = useTheme();
  const { isAuthenticated } = useAuth(); // Access authentication context

 

  const toggleTheme = () => {
    // Implement your theme toggle logic here
    // You can use a state management library or React's Context API to manage the theme
    // For simplicity, you can just toggle between 'light' and 'dark' here
    const newTheme = colorScheme === 'light' ? 'dark' : 'light';
    // Apply the new theme
    // Example: You might set the theme using AsyncStorage or Context API
    console.log('Theme toggled to:', newTheme);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Image  source={image} style={styles.image} />
      <Text style={[styles.text, { color: colors.text }]}>AL - MUSTAFA GARMENTS</Text>
      <Text style={[styles.text1, { color: colors.text }]}>Welcome!</Text>
      <TouchableOpacity
        style={[styles.btn, { borderColor: colors.border, color: colors.text }]}
        onPress={() => {
          navigation.navigate('SignUp')
          if (isAuthenticated) {
            // If authenticated, navigate to the home screen or any other authenticated screen
            navigation.navigate('Home');
            console.log('User is authenticated');
             // Update with the actual screen name
          }
      
      }}
      >
        <Text style={{ color: colors.text, textAlign: 'center' }}>Get Started</Text>
      </TouchableOpacity>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'start',
    paddingTop: '30%',
  },
  image: {
    
    opacity: 1,
    marginVertical: 4,
    
    
  },
  text: {
    fontSize: 18,
    lineHeight: 44,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    width: '90%',
    marginBottom: '20%',
  },
  text1: {
    fontSize: 20,
    marginBottom: '44%',
  },
  btn: {
    borderWidth: 2,
    borderRadius: 80,
    paddingHorizontal: 20,
    width: '90%',
    height: 50,
    justifyContent: 'center',
    fontSize: 20,
    marginBottom: 10,
  },
  themeButton: {
    marginTop: 20,
  },
});

export default Splash;
