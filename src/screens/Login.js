import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Keyboard,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import {GenericStyles} from '../styles/Styles';
import {Context as context} from '../../Context';
import Loader from './Loader';

const Login = ({navigation}) => {
  const auth = context();
  const [login, setLogin] = useState({"username": "", "password": "", "error": "", "loading": false, hidePassword: true})
  const passwordInputRef = useRef();

  const onLogin = () => {
    if (!login.username) {
      Alert.alert('Please fill Username');
      return;
    }
    if (!login.password) {
      Alert.alert('Please fill Password');
      return;
    }
    setLogin((prevState) => ({
      ...prevState,
      'loading': true,
    }))
    auth.saveToken(login)
    .then((data) => {
      if (data.status === 'mfa') {
        setLogin((prevState) => ({
          ...prevState,
          'error': '',
          'loading': false,
        }))
        navigation.navigate('Verification', {
          hash: data.hash,
          session: data.session,
          username: login.username
        });
      }
      else { 
        setLogin((prevState) => ({
          ...prevState,
          'error': 'Invalid username or password',
          'loading': false,
        }))
      }
    })
    .catch((error) => {
      navigation.navigate('Login');
    })
  };

  const handleInput = (name) => (value) => {
    setLogin((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const setPasswordVisibility = () => {
    setLogin((prevState) => ({
      ...prevState,
      'hidePassword': !login.hidePassword,
    }))
  }

  return (
    <View style={styles.container}>
      <Loader loading={login.loading} />
      <Image source={require("../../assets/splashlogo.png")} />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Username"
          placeholderTextColor="#ccc"
          autoCapitalize="none"
          returnKeyType="next"
          onSubmitEditing={() =>
            passwordInputRef.current &&
            passwordInputRef.current.focus()
          }
          onChangeText={handleInput('username')}
          underlineColorAndroid="#f000"
          blurOnSubmit={false}
        /> 
      </View> 
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          ref={passwordInputRef}
          placeholderTextColor="#ccc"
          onSubmitEditing={Keyboard.dismiss}
          secureTextEntry={login.hidePassword}
          returnKeyType="next"
          underlineColorAndroid="#f000"
          blurOnSubmit={false}
          onChangeText={handleInput('password')}
        /> 
        <TouchableOpacity activeOpacity={0.8} style={styles.touachableButton} onPress={setPasswordVisibility}>
            <Image source={(login.hidePassword) ? require('../../assets/eye.png') : require('../../assets/eye-slash.png')} style={styles.buttonImage} />
          </TouchableOpacity>
      </View> 
      <TouchableOpacity>
        <Text style={styles.forgot_button}>Forgot Password?</Text> 
      </TouchableOpacity> 
      {login.error &&
        <Text style={styles.error}>{login.error}</Text>
      }
      <TouchableOpacity
        style={GenericStyles.btnWrapper}
        onPress={onLogin}
        activeOpacity={0.5}
      >
        <Text style={GenericStyles.buttonTextStyle}>LOGIN</Text>
      </TouchableOpacity> 
    </View> 
  );
}

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  touachableButton: {
    position: 'absolute',
    top: 5,
    right: 3,
    height: 40,
    width: 35,
    padding: 2
  },
  buttonImage: {
    resizeMode: 'contain',
    height: '70%',
    width: '70%',
  },
  error: {
    color: "#ff0000",
  },
  title:{
    fontWeight: "bold",
    fontSize:50,
    color:"#fb5b5a",
    marginBottom: 40,
  },
  image: {
    marginBottom: 40,
  },
  inputView: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  TextInput: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#CCC',
    color: "#000",
    backgroundColor: "#FFF",
  },
  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
});