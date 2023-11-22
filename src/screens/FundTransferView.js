import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Button,
  Text,
  TouchableOpacity,
} from 'react-native';
import {GenericStyles} from '../styles/Styles';

/**
 * Functional component variables
 */
const FundTransferView = ({navigation}) => {
  return (
    <ScrollView nestedScrollEnabled={true} style={styles.scrollView}>
      <View style={GenericStyles.container}>
        <Text style={styles.title}>Add recepeint</Text>
      </View>
      <View style={GenericStyles.container}>
        <Text style={styles.title}>Account Details:</Text>
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={styles.btnWrapper}
          onPress={() => navigation.navigate('FundAccountView')}
          activeOpacity={0.5}>
          <Text style={styles.buttonTextStyle}>View</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnWrapper}
          onPress={() => navigation.navigate('Accounts')}
          activeOpacity={0.5}>
          <Text style={styles.buttonTextStyle}>Transfers</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnWrapper}
          onPress={() => navigation.navigate('AddRecipient')}
          activeOpacity={0.5}>
          <Text style={styles.buttonTextStyle}>Add Recp</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default FundTransferView;

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
    fontSize: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#01403c',
  },
  buttonTextStyle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
