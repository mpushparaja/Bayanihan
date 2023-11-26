import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {GenericStyles} from '../styles/Styles';
import {Context as context} from '../../Context';

/**
 * Functional component variables
 */
const FundTransferView = ({navigation}) => {
  const auth = context();
  const [receipient, setRecipient] = useState({
    loading: false,
    receipientDetails: [],
  });
  useEffect(() => {
    setRecipient(prevState => ({
      ...prevState,
      loading: true,
    }));
    auth.listRecipient(auth.state.clientId).then(data => {
      if (data.recipients.length) {
        setRecipient(prevState => ({
          ...prevState,
          receipientDetails: data.recipients,
          loading: false,
        }));
      }
    });
  }, []);

  return (
    <ScrollView nestedScrollEnabled={true} style={styles.scrollView}>
      <View style={GenericStyles.container}>
        <TouchableOpacity
          style={styles.addRecp}
          onPress={() => navigation.navigate('AddRecipient')}
          activeOpacity={0.5}>
          <Text style={styles.buttonTextStyle}>Add recepeint</Text>
        </TouchableOpacity>
      </View>
      <View style={GenericStyles.container}>
        <Text style={styles.title}>All Receipients</Text>
      </View>
      {receipient.receipientDetails.map((item, index) => (
        <View key={index} style={styles.wrapperItems}>
          <TouchableOpacity
              onPress={() => navigation.navigate('FundAccountView', {
                viewName: item.firstName
              })}
              activeOpacity={0.5}>
            <View>
              <Text>{item.firstName} {item.lastName}</Text>
              <Image source={require('./assets/left-arrow.png')} />
            </View>
          </TouchableOpacity>
        </View>
      ))}
      {receipient.loading && <ActivityIndicator />}
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
  wrapperItems: {
    paddingLeft: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderColor: '#e6e6e6',
    borderBottomWidth: 1,
  },
  btnContainer: {
    paddingTop: 20,
    paddingLeft: 20,
    flex: 1,
    flexDirection: 'row',
    padding: 30,
    justifyContent: 'space-between',
  },
  addRecp: {
    width: '45%',
    borderRadius: 5,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginRight: 35,
    backgroundColor: '#01403c',
    opacity: 1,
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
