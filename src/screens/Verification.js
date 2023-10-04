import React, {useState, useRef} from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Platform,
} from "react-native";
import {Context as context} from '../../Context';

const Verification = ({route, navigation}) => {
  const auth = context();
  const firstTextInputRef = useRef(null);
  const secondTextInputRef = useRef(null);
  const thirdTextInputRef = useRef(null);
  const fourthTextInputRef = useRef(null);
  const fifthTextInputRef = useRef(null);
  const sixthTextInputRef = useRef(null);

  
  const [otpArray, setOtpArray] = useState(['', '', '', '', '', '']);

  const onConfirm = async () => {
    let params = {};
    params = {...route.params, code: otpArray.toString().split(",").join("")}
    auth.saveMFA(params)
    .then((data) => {
      console.log('data', data)
      navigation.replace('Accounts');
    })
    .catch((error) => {
      navigation.navigate('Login');
    })
  }

  const onOtpChange = index => {
    return value => {
      if (isNaN(Number(value))) {
        // do nothing when a non digit is pressed
        return;
      }
      const otpArrayCopy = otpArray.concat();
      otpArrayCopy[index] = value;
      setOtpArray(otpArrayCopy);

      // auto focus to next InputText if value is not blank
      if (value !== '') {
        if (index === 0) {
          secondTextInputRef.current.focus();
        } else if (index === 1) {
          thirdTextInputRef.current.focus();
        } else if (index === 2) {
          fourthTextInputRef.current.focus();
        } else if (index === 3) {
          fifthTextInputRef.current.focus();
        } else if (index === 4) {
          sixthTextInputRef.current.focus();
        }
      }
    };
  };

  const onOtpKeyPress = index => {
    return ({nativeEvent: {key: value}}) => {
      // auto focus to previous InputText if value is blank and existing value is also blank
      if (value === 'Backspace' && otpArray[index] === '') {
        if (index === 1) {
          firstTextInputRef.current.focus();
        } else if (index === 2) {
          secondTextInputRef.current.focus();
        } else if (index === 3) {
          thirdTextInputRef.current.focus();
        } else if (index === 4) {
          fourthTextInputRef.current.focus();
        } else if (index === 5) {
          fifthTextInputRef.current.focus();
        }

        /**
         * clear the focused text box as well only on Android because on mweb onOtpChange will be also called
         * doing this thing for us
         * todo check this behaviour on ios
         */
        if (Platform.OS === 'android' && index > 0) {
          const otpArrayCopy = otpArray.concat();
          otpArrayCopy[index - 1] = ''; // clear the previous box which will be in focus
          setOtpArray(otpArrayCopy);
        }
      }
    };
  };

  const refCallback = textInputRef => node => {
    textInputRef.current = node;
  };


  const onResendOtpButtonPress = () => {
    if (firstTextInputRef) {
      setOtpArray(['', '', '', '']);
      firstTextInputRef.current.focus();
    }

    //setResendButtonDisabledTime(RESEND_OTP_TIME_LIMIT);
    //startResendOtpTimer();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verification</Text>
      <Text>We sent you a SMS Code on your registered phone number with us.</Text>
      <View style={styles.buttonWrapper}>
        {[
          firstTextInputRef,
          secondTextInputRef,
          thirdTextInputRef,
          fourthTextInputRef,
          fifthTextInputRef,
          sixthTextInputRef
        ].map((textInputRef, index) => (
          <TextInput
            style={styles.TextInput}
            placeholderTextColor="#003f5c"
            value={otpArray[index]}
            onKeyPress={onOtpKeyPress(index)}
            onChangeText={onOtpChange(index)}
            maxLength={1}
            autoFocus={index === 0 ? true : undefined}
            keyboardType="numeric"
            key={index}
            ref={refCallback(textInputRef)}
          /> 
        ))}
      </View>
      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={onResendOtpButtonPress}
          activeOpacity={0.5}
        >
          <Text style={styles.buttonTextStyle}>Resend</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => onConfirm(auth)}
          activeOpacity={0.5}
        >
          <Text style={styles.buttonTextStyle}>Confirm</Text>
        </TouchableOpacity> 
      </View>
    </View> 
  );
}

export default Verification;

const styles = StyleSheet.create({
  container: {
    marginLeft: 35,
    marginRight: 35,
  },
  title:{
    fontWeight: "bold",
    fontSize:20,
    marginTop: 20,
    color:"#000",
    marginBottom: 20,
  },
  loginBtn: {
    width: "40%",
    borderRadius: 5,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginRight: 35,
    backgroundColor: "#FF1493",
  },
  TextInput: {
    flex: 1,
    width: "15%",
    height:40,
    paddingLeft: 15,
    paddingRight: 15,
    marginRight: 10,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: '#dedede',
    color: "#000",
    backgroundColor: "#dedede",
  },
  buttonTextStyle: {
    color: "#FFF",
    fontSize: 16,
    paddingVertical: 10,
  },
  buttonWrapper: {
    flex: 1,
    flexDirection: "row",
    marginTop: 40,
  },
});