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

const Accounts = () => {
  const auth = context();
  const [accountsData, setAccounts] = useState({'loan': [], 'deposit': []}) 
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
    auth.listAccounts('loan', '491183')
    .then((data) => {
      setAccounts((prevState) => ({
        ...prevState,
        'loan': data.loans,
      }))
    })
  }, [])
  useEffect(() => {
    auth.listAccounts('deposit', '491183')
    .then((data) => {
      setAccounts((prevState) => ({
        ...prevState,
        'deposit': data.accounts,
      }))
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
            Account: Bayani Agbayani
          </Text>
        </View>
        <View>
          <>
            <Text style={styles.subTitle}>Loan Accounts</Text>
            <View style={styles.wrapper} elevation={2}>
              <Table headerView={false} data={accountsData.loan} dataKeys={loanColumns} />
            </View>
          </>
        </View>
        <View>
          <>
            <Text style={styles.subTitle}>Deposit Accounts</Text>
            <View style={styles.wrapper} elevation={2}>
              <Table headerView={false} data={accountsData.deposit} dataKeys={depositColumns} />
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
    borderRadius:10, 
    backgroundColor: '#fefefe',
    borderRadius: 5,
    borderColor: '#e6e6e6',
    borderWidth: 1,
    shadowColor: "#000000",
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1
    }
  },
  accountTitle: {
    fontSize: 15,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "bold",
    paddingTop: 8,
    marginTop: 20,
    marginBottom: 10,
    color: "#01403C",
  },
});