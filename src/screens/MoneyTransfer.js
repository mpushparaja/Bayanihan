import React, {useState} from 'react';
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

/**
 * Functional component variables
 */
const MoneyTransfer = ({navigation}) => {
  const auth = context();
  const [amount, setAmount] = useState(0);
  const onTransferAmount = () => {
    auth.moneyTransfer(auth.state.clientId, auth.state.fundsView.id, amount).then((data) => {
      if (data.status === 'success') {
        navigation.navigate('FundTransferView', {'paramPropKey': 'paramPropValue'});
      }
    });
  }

  const handleChange = (value) => {
    setAmount(value);
  }

  const onTransferRequest = () => {
    Alert.alert('', 'Are you sure to transfer the amount', [
      {text: 'Confirm', onPress: onTransferAmount},
      {
        text: 'Cancel',
      },
    ]);
  }

  return (
    <View style={styles.container}>
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
              value={amount}
              onSubmitEditing={Keyboard.dismiss}
              placeholder="XXXX"
              blurOnSubmit={false}
              returnKeyType="next"
              />
          </View>
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={styles.btnWrapper}
            onPress={onTransferRequest}
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
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 4,
    borderColor: '#d6d6d6',
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
