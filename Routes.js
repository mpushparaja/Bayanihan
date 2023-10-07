import React, {useState}  from 'react';
import {
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from "./src/screens/Login";
import Accounts from "./src/screens/Accounts";
import Verification from "./src/screens/Verification";
import {Context as context} from './Context';

const Stack = createNativeStackNavigator();

const MyRoutes = () => {
  const auth = context();
  const [isProtectedRoutes, setProtected] = useState(false)
  const onLogout = () => {
    auth.removeToken()
    .then(() => {
      setProtected(false)
    })
  };

  const showConfirmDialog = () => {
    Alert.alert('', 'Are you sure to Logout', [
      {text: 'Yes', onPress: onLogout},
      {
        text: 'No',
      }
    ]);
  }

  const handleVerification = (data) => {
    setProtected(data)
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isProtectedRoutes ? (
          <>
            <Stack.Screen name="Accounts" component={Accounts} 
              options={{ 
                headerTintColor: '#fff',
                headerStyle: {
                  backgroundColor: '#01403c'
                },
                headerRight: () => (
                  <TouchableOpacity onPress={showConfirmDialog}>
                    <Image source={require("./assets/logout.png")} />
                  </TouchableOpacity>
                ),
              }} 
            />
          </>
        ) : (
          <>
           <Stack.Screen
            name="Login"
            options={{
              title: 'Login',
              headerTintColor: '#fff',
              headerStyle: {
                backgroundColor: '#01403c'
              },
            }}
            >
            {(props) => (
              <Login {...props} />
            )}
            </Stack.Screen>
            <Stack.Screen name="Verification" options={{
              title: 'Login',
              headerTintColor: '#fff',
              headerStyle: {
                backgroundColor: '#01403c'
              },
              }} >
            {(props) => (
              <Verification {...props} onVerification={handleVerification} />
            )}
            </Stack.Screen>
          </>
        ) 
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyRoutes