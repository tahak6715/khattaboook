/* eslint-disable prettier/prettier */
import * as React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import BottomSSheet1 from '../components/bottomSSheet';

// Screens
import Khata from './Tab_page/Khata';
import Account from './Tab_page/Account';
import BottomHalfModal from '../components/nvbar';
import SettingsScreen from './Tab_page/Settings';
import Settings from './Tab_page/Settings';

// Screen names
const homeName = "Khata";
const detailsName = "Account";
const settingsName = "Accountt";

const Tab = createBottomTabNavigator();









function MainContainer() {

  const [isModalVisible, setIsModalVisible] = React.useState(false);
const buttonRef = React.useRef();

const toggleModal = () => {
  setIsModalVisible(!isModalVisible);
};

const CustomHeader = ({ navigation, openBottomSheet }) => (
  
  <View className='py-3 px-3' style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
    <TouchableOpacity onPress={toggleModal}>
      <Text className="text-black" style={{ fontSize: 18, marginRight: 8 }}>Accounts</Text>
    </TouchableOpacity>
    <View className="mt-2">
    <AntDesign name="down" color={'black'}  size={20} />
    </View>
  </View>
  
);
  


  return (

    <>
    
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === homeName) {
              iconName = focused ? 'book-outline' : 'book-outline';
            } else if (route.name === detailsName) {
              iconName = focused ? 'account' : 'account-list';
            } else if (route.name === settingsName) {
              iconName = focused ? 'person' : 'person';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          header: ({  }) => (
            <CustomHeader />
          ),
          
          
        })}
        tabBarOptions={{
          activeTintColor: 'black',
          inactiveTintColor: 'grey',
          labelStyle: { paddingBottom: 2, fontSize: 10, },
          
          style: { padding: 10, height: 80, backgroundColor: '',  },
        }}
      >
        <Tab.Screen name={homeName} component={Khata} />
        
        <Tab.Screen name={settingsName} component={Settings} />
      </Tab.Navigator>

      <BottomHalfModal isVisible={isModalVisible} onClose={toggleModal} buttonRef={buttonRef} />

</>
    
  );
}

export default MainContainer;
