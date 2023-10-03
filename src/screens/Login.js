import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Keyboard,
  TouchableOpacity,
  Alert,
} from "react-native";
import {GenericStyles} from '../styles/Styles';
//import {Context as context} from './Context';

const Login = ({navigation}) => {
  //const auth = context();
  const [login, setLogin] = useState({"email": "", "password": ""})
  const passwordInputRef = useRef();

  const onLogin = () => {
    if (!login.email) {
      Alert.alert('Please fill Email');
      return;
    }
    if (!login.password) {
      Alert.alert('Please fill Password');
      return;
    }
    //auth.setAuth({token: 'valid'})
    navigation.navigate('Verification');
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
          onChangeText={handleInput('email')}
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