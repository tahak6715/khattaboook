/* eslint-disable prettier/prettier */
// Import necessary components and libraries
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';

import SupplierScreen from '../screens/Tab_page/SupplierScreen';
import Customer from '../screens/Tab_page/Customer';
import CustomerScreen from '../screens/Tab_page/Customer';
import CreateCustomer from '../screens/Tab_page/CustomerScreens/CreateCustomer';
import SupplierScreend from '../screens/Tab_page/SupplierScreen';

// Create a top tab navigator
const Tab = createMaterialTopTabNavigator();







// Main component with top tabs
const TopTabs = () => {
  return (
    
      <Tab.Navigator
        screenOptions={{
          labelStyle: { fontSize: 12, fontWeight: 'bold'},
          tabStyle: { width: 120,  },
          className: 'text-black dark:text-white',
          indicatorStyle: { backgroundColor: '#756ef2' },
        }}
        swipeVelocityImpact={0.2} // Adjust this value to control the sensitivity of swiping
        >
          <Tab.Screen name="Customer" component={CustomerScreen} />
          

          <Tab.Screen name="Supplier" component={SupplierScreend} />
          
        </Tab.Navigator>
      
    );
  };
  
  // Styles
  const styles = StyleSheet.create({
    tabContent: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  
  export default TopTabs;
  
