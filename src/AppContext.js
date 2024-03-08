/* eslint-disable prettier/prettier */
// AppContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [userData, setUserData] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setUserDataContext = (data) => {
    setUserData(data);
    // Save userData to AsyncStorage whenever it changes
    saveUserDataToStorage(data);
  };

  const saveUserDataToStorage = async (data) => {
    try {
      // Save userData to AsyncStorage
      await AsyncStorage.setItem('userData', JSON.stringify(data));
    } catch (error) {
      console.error('Error saving user data to AsyncStorage:', error);
    }
  };

  useEffect(() => {
    // Check for stored authentication token
    const checkAuthentication = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('authToken');
        const storedUserData = await AsyncStorage.getItem('userData');

        if (storedToken) {
          // Set the user as authenticated
          setIsAuthenticated(true);
        }

        if (storedUserData) {
          // Set the user data from AsyncStorage
          setUserData(JSON.parse(storedUserData));
        }
      } catch (error) {
        console.error('Error reading authentication token or user data:', error);
      }
    };

    checkAuthentication();
  }, []);

  return (
    <AppContext.Provider value={{ userData, setUserDataContext, isAuthenticated }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};

