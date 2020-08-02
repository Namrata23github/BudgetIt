import React from 'react';
import {
 Text,
 View,
 Button,
} from 'react-native';
import  {configure, localNotification,}  from '../Containers/Notification.js';
configure();
const AppContainer = () => {
 const handleOnPress = () => {
   localNotification();
 };

 return (
   <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
     <Text>
       Press the button to see push Notification
     </Text>
     <Button
       title={'Press Me'}
       onPress={handleOnPress}/>
   </View>
 );
};

export default AppContainer; 