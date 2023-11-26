import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Alert,
  TextInput,
  Text,
  TouchableOpacity,
} from 'react-native';
import {GenericStyles} from '../styles/Styles';
import {Context as context} from '../../Context';
import Loader from './Loader';

/**
 * Functional component variables
 */
const AddRecipient = ({navigation}) => {
  const auth = context();
  const [state, setAdd] = React.useState({firstname: '', lastname: '', accountnumber: '', confirmaccountnumber:''});

  const handleChange = name => value => {
    setAdd(prevState => ({
      ...prevState,
      [name]: value,
    }))
  }

  const onAdd = () => {
    if (!state.firstname) {
      Alert.alert('Please fill First Name');
      return;
    }
    if (!state.lastname) {
      Alert.alert('Please fill Last Name');
      return;
    }
    if (!state.accountnumber) {
      Alert.alert('Please fill Account Number');
      return;
    }
    if (!state.confirmaccountnumber) {
      Alert.alert('Please fill Confirm Account Number');
      return;
    }

    if (state.accountnumber !== state.confirmaccountnumber) {
      Alert.alert('Please Confirm Account Number should be match');
      return;
    }

    auth.setState(prevState => ({
      ...prevState,
      loading: true,
    }));

    auth.addRecipient(state, auth.state.clientId).then(data => {
      if (data && data.status === 'success') {
        auth.setState(prevState => ({
          ...prevState,
          loading: false,
        }));
        navigation.navigate('FundTransferView');
      }
    });
  }

  // const submitEditing = (name) => () => {
  //   return passwordInputRef.current && passwordInputRef.current.focus()
  // }

  return (
    <ScrollView nestedScrollEnabled={true} style={styles.scrollView}>
      <Loader loading={auth.state.loading} />
      <View style={GenericStyles.container}>
        <Text style={styles.title}>Create Recipient</Text>
      </View>
      <View style={GenericStyles.container}>
        <Text style={styles.title}>First Name:</Text>
        <TextInput
          style={styles.input}
          onChangeText={handleChange('firstname')}
          value={state.firstname}
          placeholderTextColor="#888"
          blurOnSubmit={false}
          returnKeyType="next"
          placeholder="First Name"
        />
      </View>
      <View style={GenericStyles.container}>
        <Text style={styles.title}>Last Name:</Text>
        <TextInput
          style={styles.input}
          onChangeText={handleChange('lastname')}
          value={state.lastname}
          placeholderTextColor="#888"
          placeholder="Last Name"
          blurOnSubmit={false}
          returnKeyType="next"
        />
      </View>
      <View style={GenericStyles.container}>
        <Text style={styles.title}>Account Number:</Text>
        <TextInput
          style={styles.input}
          onChangeText={handleChange('accountnumber')}
          value={state.accountnumber}
          placeholderTextColor="#888"
          placeholder="Account number"
          blurOnSubmit={false}
          returnKeyType="next"
        />
      </View>
      <View style={GenericStyles.container}>
        <Text style={styles.title}>Confirm Account Number:</Text>
        <TextInput
          style={styles.input}
          onChangeText={handleChange('confirmaccountnumber')}
          value={state.confirmaccountnumber}
          placeholderTextColor="#888"
          placeholder="Confirm Account number"
          blurOnSubmit={false}
          returnKeyType="next"
        />
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={styles.btnWrapper}
          onPress={onAdd}
          activeOpacity={0.5}>
          <Text style={styles.buttonTextStyle}>Add</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnWrapper}
          onPress={() => navigation.navigate('FundTransferView')}
          activeOpacity={0.5}>
          <Text style={styles.buttonTextStyle}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AddRecipient;

/**
 * Functional component Styles
 */
const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  title: {
    paddingLeft: 0,
    paddingTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  btnContainer: {
    paddingTop: 20,
    paddingLeft: 20,
    flex: 1,
    flexDirection: 'row',
    padding: 30,
    justifyContent: 'space-between',
  },
  btnWrapper: {
    marginBottom: 40,
    height: 50,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#01403c',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: '#d6d6d6',
  },
  buttonTextStyle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
