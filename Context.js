
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
  const saveToken = async () => {
    try {
      await AsyncStorage.setItem('userToken', 'abc');
      setState({token: 'valid'})
    } 
    catch (error) {
      Promise.reject(error);
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
    <MyContext.Provider value={{ state, saveToken, getToken, removeToken }}>
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
