import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

const CurrentDateTimeComponent = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    // Update the current date and time every second
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  const options = {
    
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };

  const formattedDate = currentDateTime.toLocaleDateString(undefined, options);
  const formattedTime = currentDateTime.toLocaleTimeString(undefined, options);

  const formattedDateTime = `${formattedDate}`;

  return (
    <View className='m-0 p-0'>
      
      <Text>{formattedDateTime}</Text>
    </View>
  );
};

export default CurrentDateTimeComponent;


