
import React, {createContext, useState, useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from './Config'

const initialState = {loading: false, token: '', error: '', secured: '', pwd: '', clientId: ''}

const MyContext = createContext(initialState);

export const Provider = ({ children }) => {
  const [state, setState] = useState(initialState);
  
  // Update AsyncStorage & context state
  const saveToken = async (auth) => {
    try {
      const response = await fetch(config.API_URL + 'auth/login', {
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
      const response = await fetch(config.API_URL + 'auth/password/mfa', {
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

  const listAccounts = async (type, clientId) => {
    try {
      const response = await fetch(config.API_URL + type +'/account/list', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: clientId,
      }),
      })
      const responseJson = await response.json();
      return responseJson
    }
    catch(error) {
        console.error(error);
    }
  }

  const findAccounts = async (type, id) => {
    try {
      const response = await fetch(config.API_URL + type +'/account/find', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
      }),
      })
      const responseJson = await response.json();
      return responseJson
    }
    catch(error) {
        console.error(error);
    }
  }

  const findClient = async (clientId) => {
    try {
      const response = await fetch(config.API_URL + '/client/find/detail?id='+ clientId, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
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
      const resp = await AsyncStorage.getAllKeys().then(keys => AsyncStorage.multiRemove(keys));
      return resp;
    }
    catch (error) {
      Promise.reject(error);
    }
  }

  return (
    <MyContext.Provider value={{
      state,
      setState,
      findClient,
      listAccounts,
      findAccounts,
      saveToken,
      saveMFA,
      getToken,
      removeToken 
    }}>
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
