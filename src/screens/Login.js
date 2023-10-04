import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Keyboard,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import {GenericStyles} from '../styles/Styles';
import {Context as context} from '../../Context';

const Login = ({navigation}) => {
  const auth = context();
  const [login, setLogin] = useState({"username": "", "password": "", "error": "", "isLoading": false})
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
      'isLoading': true,
    }))
    auth.saveToken(login)
    .then((data) => {
      if (data.status === 'mfa') {
        navigation.navigate('Verification', {
          hash: data.hash,
          session: data.session.Session,
          username: login.username
        });
      }
      else { 
        setLogin((prevState) => ({
          ...prevState,
          'error': 'Invalid username or password',
          'isLoading': false,
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

  return (
    <View style={styles.container}>
       <Text style={styles.title}>Login Screen</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Username"
          placeholderTextColor="#003f5c"
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
          placeholderTextColor="#003f5c"
          onSubmitEditing={Keyboard.dismiss}
          secureTextEntry={true}
          returnKeyType="next"
          underlineColorAndroid="#f000"
          blurOnSubmit={false}
          onChangeText={handleInput('password')}
        /> 
      </View> 
      <TouchableOpacity>
        <Text style={styles.forgot_button}>Forgot Password?</Text> 
      </TouchableOpacity> 
      {login.error &&
        <Text style={styles.error}>{login.error}</Text>
      }
      <View>
        <ActivityIndicator size="large" animating={login.isLoading} />
      </View>
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
    borderColor: '#FFC0CB',
    color: "#000",
    backgroundColor: "#FFC0CB",
  },
  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
});