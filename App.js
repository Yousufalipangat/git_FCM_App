import React, { useEffect } from "react";

import { View ,Text} from 'react-native';
import firebase from "react-native-firebase";


function App (){
useEffect(()=>{
checkPermission();
messageListner();

},[])

const checkPermission = async () =>{
  const enabled = await firebase.messaging().hasPermission();
  if(enabled){
console.log("permission enabled")
    getFCMToken();

  }else{
    console.log("permission not enabled")
    requestPermission();
    getFCMToken();
    
  }
}

const requestPermission = async ()=>{
try {
  await firebase.messaging().requestPermission();
  
} catch (error) {
  console.log("authorization issue happened")
}
}

const getFCMToken = async ()=>{
  const fcmTocken = await firebase.messaging().getToken();
  console.log("fmc tokn---", fcmTocken);
}

const messageListner = async ()=>{
  this.notificationListner  = firebase.notifications().onNotification(
    (notification)=>{
      const {title,body} = notification;
      console.log("notif listener ",title,body);
    })
    this.notificationOpenedListner = firebase.notifications().onNotificationOpened(
      (notification)=>{
        const {title,body} = notification;
        console.log("notif open listner",title,body);
      }
    )
    const notificationOpen = await firebase.notifications().getInitialNotification()

    if(notificationOpen){
      const {title,body} = notificationOpen;
      console.log("notif open",title,body);
    }

    this.messageListner = firebase.messaging().onMessage(
      (message)=>{
        console.log("message",message);
      })
}

return(
<View style={{backgroundColor:'white',height:'100%',width:'100%',alignItems:'center',justifyContent:'center'}}>
  <Text>Home</Text>
</View>

)

}

export default App