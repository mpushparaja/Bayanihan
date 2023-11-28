import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  Keyboard,
} from 'react-native';
import {GenericStyles} from '../styles/Styles';
import {Context as context} from '../../Context';
import Loader from './Loader';

/**
 * Functional component variables
 */
const MoneyTransfer = ({navigation}) => {
  const auth = context();
  const [state, setState] = useState({'senderaccountid': '', amount: 0, error: '', loading: false});
  const onTransferAmount = () => {
    setState(prevState => ({
      ...prevState,
      'loading': true,
    }));
    auth.moneyTransfer(state.senderaccountid, auth.state.fundsView.id, state.amount).then((data) => {
      if (data.status === 'success') {
        navigation.navigate('FundTransferView', {'paramPropKey': 'paramPropValue'});
      } else {
        setState(prevState => ({
          ...prevState,
          'error': data.code,
          'loading': false,
        }));
      }
    });
  }

  useEffect(() => {
    auth.listAccounts('deposit', auth.state.clientId).then((data) => {
      if (data.status === 'success') {
        setState(prevState => ({
          ...prevState,
          'senderaccountid': data.accounts[0]['accountId'],
        }));
      }
    });
  }, [])

  const handleChange = (value) => {
    setState(prevState => ({
      ...prevState,
      'amount': value,
    }));
  }

  const onTransferRequest = () => {
    Alert.alert('', 'Are you sure to transfer the amount', [
      {text: 'Confirm', onPress: onTransferAmount},
      {
        text: 'Cancel',
      },
    ]);
  }

  const sendButtonStyle = [
    styles.btnWrapper,
    state.amount <= 0 && {
      opacity: 0.5,
    },
  ];

  return (
    <View style={styles.container}>
      <Loader loading={state.loading} />
      <View style={GenericStyles.container}>
        <View>
          <View>
            <Text style={styles.title}>Payee Details</Text>
          </View>
          <View style={styles.viewWrapper}>
            <Text style={styles.textData}>Name</Text>
            <Text>{auth.state.fundsView.firstName} {auth.state.fundsView.lastName}</Text>
          </View>
          <View style={styles.viewWrapper}>
            <Text style={styles.textData}>Account Number</Text>
            <Text>{auth.state.fundsView.accountNumber}</Text>
          </View>
          <View style={styles.viewWrapper}>
            <Text style={styles.textData}>Amount</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange}
              value={parseFloat(state.amount)}
              onSubmitEditing={Keyboard.dismiss}
              placeholder="XXXX"
              blurOnSubmit={false}
              returnKeyType="next"
              keyboardType="numeric"
              />
          </View>
        </View>
        {state.error ? <Text style={styles.error}>{state.error}</Text> : ''}
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={sendButtonStyle}
            onPress={onTransferRequest}
            disabled={state.amount > 0 ? false : true}
            activeOpacity={0.5}>
            <Text style={styles.buttonTextStyle}>Send</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnWrapper}
            onPress={() => navigation.navigate('FundAccountView')}
            activeOpacity={0.5}>
            <Text style={styles.buttonTextStyle}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default MoneyTransfer;

/**
 * Functional component Styles
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  error: {
    paddingTop: 25,
    color: '#ff0000'
  },
  viewWrapper: {
     flexDirection: 'row',
     paddingTop: 10,
     alignItems: 'center',
  },
  textData: {
    width: '40%',
    fontWeight: 'bold'
  },
  title: {
    paddingLeft: 0,
    paddingTop: 20,
    paddingBottom: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  input: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 4,
    borderColor: '#ccc',
  },
  btnContainer: {
    paddingTop: 30,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnWrapper: {
    marginBottom: 40,
    height: 50,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#01403c',
    opacity: 1,
  },
  buttonTextStyle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
