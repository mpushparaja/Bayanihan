import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Button,
  TextInput,
  Text,
  TouchableOpacity,
} from 'react-native';
import {GenericStyles} from '../styles/Styles';

/**
 * Functional component variables
 */
const AddRecipient = ({navigation}) => {
  const [number, onChangeNumber] = React.useState('');

  return (
    <ScrollView nestedScrollEnabled={true} style={styles.scrollView}>
      <View style={GenericStyles.container}>
        <Text style={styles.title}>Create Recipient</Text>
      </View>
      <View style={GenericStyles.container}>
        <Text style={styles.title}>Name:</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeNumber}
          value={number}
          placeholderTextColor="#888"
          placeholder="Account holder name"
        />
      </View>
      <View style={GenericStyles.container}>
        <Text style={styles.title}>Account Number:</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeNumber}
          value={number}
          placeholder="Account number"
          keyboardType="numeric"
        />
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={styles.btnWrapper}
          onPress={() => navigation.navigate('FundTransferView')}
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
