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
const FundAccountView = ({navigation}) => {
  return (
    <ScrollView nestedScrollEnabled={true} style={styles.scrollView}>
      <View style={GenericStyles.container}>
        <Text style={styles.title}>Account Transfer View</Text>
      </View>
      <View style={GenericStyles.container}>
        <Text style={styles.title}>Name:</Text>
      </View>
      <View style={GenericStyles.container}>
        <Text style={styles.title}>Account Number:</Text>
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={styles.btnWrapper}
          onPress={() => navigation.navigate('FundTransferView')}
          activeOpacity={0.5}>
          <Text style={styles.buttonTextStyle}>Back</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default FundAccountView;

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
  buttonTextStyle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
