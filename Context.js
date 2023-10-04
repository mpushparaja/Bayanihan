
import React, {createContext, useState, useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// const configureAxiosHeaders = (token, phone) => {
//   axios.defaults.headers["X-Auth-Token"] = token;
//   axios.defaults.headers["X-Auth-Phone"] = phone;
// };


const initialState = {loading: false, token: '', error: ''}

const MyContext = createContext();

export const Provider = ({ children }) => {
  const [state, setState] = useState(initialState);
  
  // Update AsyncStorage & context state
  const saveToken = async (auth) => {
    try {
      const response = await fetch('https://pa0ykzslfh.execute-api.ap-southeast-1.amazonaws.com/auth/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: auth.username,
        password: auth.password,
      }),
      })
      const responseJson = await response.json();
      return responseJson
    }
    catch(error) {
        console.error(error);
    }
  }

  const saveMFA = async (auth) => {
    try {
      console.log('auth', auth)
      const response = await fetch('https://pa0ykzslfh.execute-api.ap-southeast-1.amazonaws.com/password/mfa', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: auth.username,
        code: auth.code,
        hash: auth.hash,
        session: auth.session,
      }),
      })
      const responseJson = await response.json();
      return responseJson
    }
    catch(error) {
        console.error(error);
    }
  }

  const getToken = async () => {
    try {
        const resp = await AsyncStorage.getItem('userToken');
        return resp;
    }
    catch (error) {
      Promise.reject(error);
    }
  }

  const removeToken = async () => {
    try {
      await AsyncStorage.getAllKeys().then(keys => AsyncStorage.multiRemove(keys));
      setState({token: ''})
    }
    catch (error) {
      Promise.reject(error);
    }
  }

  return (
    <MyContext.Provider value={{ state, saveToken, saveMFA, getToken, removeToken }}>
      {children}
    </MyContext.Provider>
  );
};

export function Context() {
  const context = useContext(MyContext)
  // if (!context) {
  //   throw new Error('useAuth must be used within an AuthProvider');
  // }
  return context
}
