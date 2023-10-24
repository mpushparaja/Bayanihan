import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import Table from './Table';
import {GenericStyles} from '../styles/Styles';
import {Context as context} from '../../Context';

/**
 * Functional component variables
 */
const Accounts = ({navigation}) => {
  const auth = context();
  const [accountsData, setAccounts] = useState({
    loan: [],
    deposit: [],
    loanLoading: false,
    depositLoadng: false,
    clientDetails: '',
  });
  const loanColumns = [
    {loanNumber: {text: '', style: {fontSize: 16, fontWeight: 'bold'}}},
    {principalBalance: {text: 'Loan Balance'}, style: {fontSize: 16}},
    {productName: {text: ''}, style: {fontSize: 16}},
  ];
  const depositColumns = [
    {accountNumber: {text: '', style: {fontSize: 16, fontWeight: 'bold'}}},
    {availableBalance: {text: 'Available Balance'}, style: {fontSize: 16}},
    {productName: {text: ''}, style: {fontSize: 16}},
  ];
  useEffect(() => {
    auth.findClient(auth.state.clientId).then(data => {
      if (data.status === 'success') {
        setAccounts(prevState => ({
          ...prevState,
          clientDetails: data.client,
        }));
      }
    });
  }, []);
  useEffect(() => {
    setAccounts(prevState => ({
      ...prevState,
      loanLoading: true,
    }));
    auth.listAccounts('loan', '491183').then(data => {
      if (data.loans.length) {
        setAccounts(prevState => ({
          ...prevState,
          loan: data.loans,
          loanLoading: false,
        }));
      } else {
        setAccounts(prevState => ({
          ...prevState,
          loanLoading: false,
        }));
      }
    });
  }, []);
  useEffect(() => {
    setAccounts(prevState => ({
      ...prevState,
      depositLoading: true,
    }));
    auth.listAccounts('deposit', auth.state.clientId).then(data => {
      if (data.accounts.length) {
        setAccounts(prevState => ({
          ...prevState,
          deposit: data.accounts,
          depositLoading: false,
        }));
      } else {
        setAccounts(prevState => ({
          ...prevState,
          depositLoading: false,
        }));
      }
    });
  }, []);
  return (
    <ScrollView nestedScrollEnabled={true} style={styles.scrollView}>
      <View style={GenericStyles.container}>
        <View style={styles.accountProfile}>
          <View style={styles.accountContainer}>
            <View style={styles.logo}>
              <Image
                style={{height: 25, width: 25}}
                source={require('../../assets/user.png')}
              />
            </View>
            <Text style={styles.accountTitle}>Welcome to Bayanihan Bank </Text>
            <Text style={{fontSize: 14, paddingLeft: 40}}>
              Account:
              <Text style={{textTransform: 'uppercase'}}>
                {' '}
                {auth.state.userName ? auth.state.userName : ''}
              </Text>
            </Text>
          </View>
        </View>
        <View>
          <>
            <Text style={styles.subTitle}>Loan Accounts</Text>
            <View style={styles.wrapper} elevation={2}>
              <Table
                navigation={navigation}
                style={styles.tableData}
                loading={accountsData.loanLoading}
                headerView={false}
                data={accountsData.loan}
                dataKeys={loanColumns}
                type="loan"
                type1="payments"
                viewId={'id'}
                profileHeaderTitle={'Loan Details'}
              />
            </View>
          </>
        </View>
        <View>
          <>
            <Text style={styles.subTitle}>Deposit Accounts</Text>
            <View style={styles.wrapper} elevation={2}>
              <Table
                navigation={navigation}
                headerView={false}
                loading={accountsData.depositLoading}
                data={accountsData.deposit}
                dataKeys={depositColumns}
                type="deposit"
                type1="transactions"
                viewId={'accountId'}
                profileHeaderTitle={'Deposit Details'}
              />
            </View>
          </>
        </View>
      </View>
    </ScrollView>
  );
};

export default Accounts;

/**
 * Functional component Styles
 */
const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  accountProfile: {
    paddingTop: 20,
  },
  wrapper: {
    borderRadius: 15,
    padding: 10,
    backgroundColor: '#fefefe',
    borderColor: '#e6e6e6',
    borderWidth: 1,
    shadowColor: '#000000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: {
      height: 1,
      width: 1,
    },
  },
  accountContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 0,
    paddingLeft: 10,
  },
  accountTitle: {
    paddingLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 10,
    paddingLeft: 20,
    marginTop: 20,
    marginBottom: 10,
    color: '#fff',
    backgroundColor: '#01403c',
  },
  logo: {
    paddingTop: 5,
  },
});
