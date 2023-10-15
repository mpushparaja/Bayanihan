import React, {useEffect, useState} from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
} from "react-native";
import Table from './Table'
import {GenericStyles} from '../styles/Styles';
import {Context as context} from '../../Context';

const Accounts = ({navigation}) => {
  const auth = context();
  const [accountsData, setAccounts] = useState({
    'loan': [],
    'deposit': [],
    'loanLoading': false,
    'depositLoadng': false,
    'clientDetails': '',
  }) 
  const loanColumns = [
    {loanNumber: {'text': '', 'style': { fontSize: 16, fontWeight: "bold" }}},
    {principalBalance: {'text': 'Loan Balance'}, 'style': { fontSize: 16 }},
    {productName: {'text': ''}, 'style': { fontSize: 16 }}
  ]
  const depositColumns = [
    {'accountNumber': {'text': '', 'style': { fontSize: 16, fontWeight: "bold" }}},
    {'availableBalance': {'text': 'Available Balance'}, 'style': { fontSize: 16 }},
    {'productName': {'text': ''}, 'style': { fontSize: 16 }}
  ]
  useEffect(() => {
    auth.findClient(auth.state.clientId)
    .then((data) => {
      if (data.status === 'success') {
        console.log('success', data)
        setAccounts((prevState) => ({
          ...prevState,
          'clientDetails': data.client,
        }))
      }
    })
  }, [])
  useEffect(() => {
    setAccounts((prevState) => ({
      ...prevState,
      'loanLoading': true,
    }))
    auth.listAccounts('loan', auth.state.clientId)
    .then((data) => {
      if (data.loans.length) {
        setAccounts((prevState) => ({
          ...prevState,
          'loan': data.loans,
          'loanLoading': false,
        }))
      } else {
        setAccounts((prevState) => ({
          ...prevState,
          'loanLoading': false,
        }))
      }
    })
  }, [])
  useEffect(() => {
    setAccounts((prevState) => ({
      ...prevState,
      'depositLoading': true,
    }))
    auth.listAccounts('deposit', auth.state.clientId)
    .then((data) => {
      if (data.accounts.length) {
        setAccounts((prevState) => ({
          ...prevState,
          'deposit': data.accounts,
          'depositLoading': false,
        }))
      } else {
        setAccounts((prevState) => ({
          ...prevState,
          'depositLoading': false,
        }))
      }
    })
  }, [])
  return (
    <ScrollView nestedScrollEnabled={true} style={styles.scrollView}>
      <View style={GenericStyles.container}>
        <View style={styles.accountProfile}>
          <Text style={styles.accountTitle}>
            Welcome to Bayanihan Bank
          </Text>
          <Text style={{fontSize: 12,}}>
            Account: {accountsData.clientDetails ? accountsData.clientDetails.name: ''}
          </Text>
        </View>
        <View>
          <>
            <Text style={styles.subTitle}>Loan Accounts</Text>
            <View style={styles.wrapper} elevation={2}>
              <Table navigation={navigation} style={styles.tableData} loading={accountsData.loanLoading} headerView={false} data={accountsData.loan} dataKeys={loanColumns} type='loan' type1='payments' viewId={'Id'} profileHeaderTitle={'Loan Details'} />
            </View>
          </>
        </View>
        <View>
          <>
            <Text style={styles.subTitle}>Deposit Accounts</Text>
            <View style={styles.wrapper} elevation={2}>
              <Table navigation={navigation} headerView={false} loading={accountsData.depositLoading} data={accountsData.deposit} dataKeys={depositColumns} type='deposit' type1='transactions' viewId={'accountId'} profileHeaderTitle={'Deposit Details'} />
            </View>
          </>
        </View>
      </View> 
    </ScrollView>
  );
}

export default Accounts;

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  accountProfile: {
    paddingTop: 10,
  },
  wrapper: {
    borderRadius:4, 
    backgroundColor: '#fefefe',
    borderColor: '#e6e6e6',
    borderWidth: 1,
    shadowColor: "#000000",
    shadowOpacity: 0.2,
    shadowRadius: 1,
    shadowOffset: {
      height: 1,
      width: 1
    }
  },
  
  accountTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "bold",
    padding: 10,
    marginTop: 20,
    marginBottom: 10,
    color: "#fff",
    backgroundColor: '#01403c'
  },
});