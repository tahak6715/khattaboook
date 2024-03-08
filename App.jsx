/* eslint-disable prettier/prettier */
// App.js
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './screens/OnBoarding.jsx';
import Splash from './screens/Splash.jsx';
import RegisterScreen from './screens/SignUp.jsx';
import TabNavigation from './screens/Home.jsx';
import VerificationScreen from './screens/Login.jsx';
import { AuthenticationProvider } from './auth/AuthenticationContext';
import SignUp from './screens/SignUp.jsx';
import CreateCustomer from './screens/Tab_page/CustomerScreens/CreateCustomer.jsx';
import Customer from './screens/Tab_page/Customer.jsx';
import TransactionScreen from './screens/Tab_page/CustomerScreens/CustomerScreen.jsx';
import CustomerTodo from './screens/Tab_page/CustomerScreens/CustomerTodo.jsx';
import PhoneAuthentication from './screens/SignUp.jsx';
import { Router } from './routes/Router';
import MainContainer from './screens/Home.jsx';
import CreateSupplier from './screens/Tab_page/SupplierScreens/CreateSupplier.jsx';
import SupplierTransactionScreen from './screens/Tab_page/SupplierScreens/SupplierScreen.jsx';
import SupplierTodo from './screens/Tab_page/SupplierScreens/SupplierTodo.jsx';
import CustomerDetailsScreen from './screens/Tab_page/CustomerScreens/CustomerDetailsScreen.jsx';
import { AppProvider } from './src/AppContext.js';
import SupplierDetailsScreen from './screens/Tab_page/SupplierScreens/SupplierDetailScreen.jsx';
import CustomerAmountSend from './screens/Tab_page/CustomerScreens/CustomerAmountSend.jsx';
import SupplierAmountSend from './screens/Tab_page/SupplierScreens/SupplierAmountSend.jsx';
import CustomerReportByAccount from './screens/Tab_page/CustomerScreens/CustomerReportByAccount.jsx';
import IndividulCustomerReport from './screens/Tab_page/CustomerScreens/IndividulCustomerReport.jsx';
import SupplierReportByAccount from './screens/Tab_page/SupplierScreens/SupplierReportByAccount.jsx';
import IndividulSupplierReport from './screens/Tab_page/SupplierScreens/IndividualSupplierReport.jsx';
import { AuthProvider } from './src/AuthContext.js';
import Details from './screens/Tab_page/CustomerScreens/Details.jsx';
import EditAmount from './screens/Tab_page/CustomerScreens/EdditAmount.jsx';
import SupplierDetailsa from './screens/Tab_page/SupplierScreens/Details.jsx';
import SupplierEditAmount from './screens/Tab_page/SupplierScreens/EdditAmount.jsx';


const Stack = createStackNavigator();

const App = () => {



  return (
    <AuthProvider>
    <AppProvider>
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="OnBoarding" component={Splash} />
        <Stack.Screen name="SignUp" component={RegisterScreen} />
        <Stack.Screen name="login" component={VerificationScreen} />
        <Stack.Screen name="Home" component={MainContainer} />
        <Stack.Screen name="CreateScree" component={CreateCustomer} />
        <Stack.Screen name="CreateScreeddd" component={CreateSupplier} />

        <Stack.Screen name="Transaction" component={TransactionScreen} />
        <Stack.Screen name="SupplierTransaction" component={SupplierTransactionScreen} />
        <Stack.Screen name='CustomerTodo' component={CustomerTodo} />
        <Stack.Screen name='SupplierTodo' component={SupplierTodo} />
        <Stack.Screen name='CustomerDetailsScreen' component={CustomerDetailsScreen} />
        <Stack.Screen name='SupplierDetailsScreen' component={SupplierDetailsScreen} />
        <Stack.Screen name="CustomerAmountSend" component={CustomerAmountSend} />
        <Stack.Screen name="SupplierAmountSend" component={SupplierAmountSend} />
        <Stack.Screen name="CustomerReportByAccount" component={CustomerReportByAccount} />
        <Stack.Screen name="Report" component={IndividulCustomerReport} />
        <Stack.Screen name="SupplierReportByAccount" component={SupplierReportByAccount} />
        <Stack.Screen name="Reportd" component={IndividulSupplierReport} />
        <Stack.Screen name="Details" component={Details} />
        <Stack.Screen name="EdditCustomer" component={EditAmount} />
        <Stack.Screen name="SupplierDetails" component={SupplierDetailsa} />
        <Stack.Screen name="EdditSupplier" component={SupplierEditAmount} />



    </Stack.Navigator>
    </NavigationContainer>
    </AppProvider>
    </AuthProvider>
   

     
  );
};

export default App;
