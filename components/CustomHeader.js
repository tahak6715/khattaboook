import React from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Foundation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';  



const CustomHeader = ({ title }) => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    // Handle the back button press, e.g., navigate back
    navigation.goBack();
  };

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
      
      {/* <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{title}</Text> */}
    </View>
  );
};

export default CustomHeader;
