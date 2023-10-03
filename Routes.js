import React  from 'react';
import {
  Image,
  TouchableOpacity,
} from "react-native";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from "./src/screens/Login";
import Accounts from "./src/screens/Accounts";
import Verification from "./src/screens/Verification";
import {Context as context} from './Context';

const Stack = createNativeStackNavigator();

const MyRoutes = ({navigation}) => {
  const auth = context();
  const onLogout = async () => {
    auth.removeToken()
    .catch((error) => {
      navigation.navigate('Login');
    })
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {auth.state.token ? (
          <>
            <Stack.Screen name="Accounts" component={Accounts} 
              options={{ 
                headerRight: () => (
                  <TouchableOpacity onPress={onLogout}>
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
            component={Login}
            options={{title: 'Login'}}
            />
            <Stack.Screen name="Verification" component={Verification}  options={{title: 'Login'}} />
          </>
        ) 
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyRoutes