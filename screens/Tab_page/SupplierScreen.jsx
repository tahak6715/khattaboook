/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView, Text, TouchableOpacity, View, FlatList, TextInput } from 'react-native';
import { useAppContext } from '../../src/AppContext';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const SupplierScreend = ({ navigation, route }) => {

  const { userData } = useAppContext();

  const [suppliers, setSuppliers] = useState([]);
  const [response, setResponse] = useState([]);
  const [totalDebit, setTotalDebit] = useState(0);
const [totalCredit, setTotalCredit] = useState(0);
const [totalBalance, setTotalBalance] = useState(0);
const [credit, setCredit] = useState(0);
const [debit, setDebit] = useState(0);

  console.log('Suppliersbbb:', userData.accountId);
  console.log(userData)
  // console.log('Customersaaaa:', userData.profileId);
  


  const [supplierData, setSupplierData] = useState([
    { id: '1', name: 'John Doe', amount: 100 },
    { id: '2', name: 'Jane Smith', amount: 200 },
    // Add more customer data as needed
  ]);

  // 

  const Stack = createStackNavigator();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = suppliers.filter((item) =>
  item.name.toLowerCase().includes(searchQuery.toLowerCase())
);

  const sortedResponse = filteredData.slice().sort((a, b) => a.name.localeCompare(b.name));



  const renderItem = ({ item }) => {
    const calculateAmounts = () => {
      let totalGiven = 0;
      let totalReceived = 0;
  
      item.amount.forEach((amountItem) => {
        if (amountItem.amount === 'i gave') {
          totalGiven += parseFloat(amountItem.comand);
        } else if (amountItem.amount === 'I got') {
          totalReceived += parseFloat(amountItem.comand);
        }
      });
  
      return { totalGiven, totalReceived };
    };
  
    const { totalGiven, totalReceived } = calculateAmounts();
    const netBalance = totalReceived - totalGiven;

  
    return (
      <TouchableOpacity
        className="bg-gray-300 p-4 my-1 rounded-lg flex-row justify-between shadow-xl"
        onPress={() => navigation.navigate('SupplierDetailsScreen', { supplierId: item._id })}
      >
        <Text className="text-black font-bold ">{item.name}</Text>
        <View style={{ flexDirection: 'row' }}>
         
          <Text className={`text-${netBalance < 0 ? 'green-600' : 'red-600'} ml-4`}>
            {Math.abs(netBalance)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  
  
  

  

  const getAccountId = () => {
    if (route && route.params) {
      const { accountId } = route.params;
      console.log(accountId);
      return accountId;
    } else {
      console.error('Route or route.params is undefined');
      return null;
    }
  };
 console.log(getAccountId())
  const accountId = getAccountId();
   
  console.log('account id')
  // console.log(accountId)


 
  const getCustomersByAccountId = async () => {
    try {
      const response = await axios.get(`https://calm-plum-crane-slip.cyclic.app/api/suppliers/by-account/${userData.accountId}`);
      setSuppliers(response.data);
  
      // Calculate total debit, total credit, and balance
      const totalDebit = response.data.reduce((sum, supplier) => {
        return sum + supplier.amount.reduce((debitSum, amountItem) => {
          return amountItem.amount === 'i gave' ? debitSum + parseFloat(amountItem.comand) : debitSum;
        }, 0);
      }, 0);
  
      const totalCredit = response.data.reduce((sum, supplier) => {
        return sum + supplier.amount.reduce((creditSum, amountItem) => {
          return amountItem.amount === 'I got' ? creditSum + parseFloat(amountItem.comand) : creditSum;
        }, 0);
      }, 0);
  
      const totalBalance = totalCredit - totalDebit;
      
  
      setTotalDebit(totalDebit.toFixed(2));
      setTotalCredit(totalCredit.toFixed(2));
      setTotalBalance(totalBalance.toFixed(2));
    } catch (error) {
      console.error('Error retrieving suppliers by account ID:', error);
    }
  };

  const calculateAmounts = (amounts) => {
    let totalGiven = 0;
    let totalReceived = 0;
  
    amounts.forEach((amountItem) => {
      if (amountItem.amount === 'i gave') {
        totalGiven += parseFloat(amountItem.comand);
      } else if (amountItem.amount === 'I got') {
        totalReceived += parseFloat(amountItem.comand);
      }
    });
  
    return { totalGiven, totalReceived };
  };
  

  const calculateTotalAmounts = () => {
    let totalPositive = 0;
    let totalNegative = 0;

    suppliers.forEach((supplier) => {
      const { totalGiven, totalReceived } = calculateAmounts(supplier.amount);
      const netBalance = totalReceived - totalGiven;

      if (netBalance > 0) {
        totalPositive += netBalance;
      } else if (netBalance < 0) {
        totalNegative += Math.abs(netBalance);
      }
    });

    return { totalPositive, totalNegative };
  };

  const { totalPositive, totalNegative } = calculateTotalAmounts();

  


    useFocusEffect(
      React.useCallback(() => {
        // This code will be executed when the screen comes into focus
        getCustomersByAccountId();
  
        // Optionally, you can return a cleanup function if needed
        // return () => {
        //   // Cleanup code here (if needed)
        // };
      }, [userData.accountId]))
    
      
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 16 }}>

      <View className="bg-white px-8 rounded-xl py-1   " style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 }}>
        <View>
          <Text style={{ fontSize: 10 }} className="text-black text-xs font-bold">Total Debit</Text>
        <Text style={{ fontSize: 10}} className="text-black text-sm self-center text-green-600">{totalPositive}</Text>

        </View>
          <View     >
            <Text style={{ fontSize: 10 }} className="text-black text-xs font-bold">Total Credit</Text>
          <Text style={{ fontSize: 10}} className="text-red-600 text-sm self-center">{totalNegative}</Text>
          </View>
        </View>



        <View className="flex-row bg-gray-200 -mt-1 rounded-xl">
        <TextInput
        style={{ color: 'black' }}
          className="border-2 border-gray-300 p-2 mb-4 w-[85%]  rounded-md text-black "
          placeholder="Search by name"
          placeholderTextColor={'black'}
          
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
         <TouchableOpacity className="border-gray-300 rounded-md w-[15%]" onPress={() => {
          navigation.navigate('SupplierReportByAccount', {
            'SupplierData' : suppliers,

          })
         }}>
              <MaterialCommunityIcons
                name="file-pdf-box"
                size={48}
                color="black"/>
            </TouchableOpacity>
            
        </View>

        {/* <Text>{userData ? userData.profileId : 'No data available'}</Text>
        <Text>taha</Text> */}
        <FlatList
          data={sortedResponse}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
        <View style={{ marginTop: 8 }}>
          <TouchableOpacity
          className="bg-black py-2 px-4 rounded-2xl"
            
            onPress={() => navigation.navigate('CreateScreeddd',{
              'accountId' : accountId
            })}
          >
            <Text className="text-white  self-center  font-bold">ADD SUPPLIER</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SupplierScreend;
