import React, {useEffect, useState} from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
} from "react-native";
import Table from './Table'
import {Context as context} from '../../Context';

const Accounts = ({navigation}) => {
  const auth = context();
  const [loanData, setLoan] = useState([
    {
        date: "01-01-2023",
        type: "Cash Deposit",
        amount: "PHP 5000.00"
    },
    {
        date: "01-02-2023",
        type: "Check Withdrawal",
        amount: "PHP 1000.00"
    },
    {
        date: "01-05-2023",
        type: "Online Transfer",
        amount: "PHP 2500.00"
    },
    {
        date: "01-06-2023",
        type: "ATM Withdrawal",
        amount: "PHP 500.00"
    },
    {
        date: "01-07-2023",
        type: "Cash Deposit",
        amount: "PHP 10000.00"
    },
    {
        date: "18-09-2023",
        type: "Check Withdrawal",
        amount: "PHP 5000.00"
    },
    {
        date: "07-01-2023",
        type: "ATM Withdrawal",
        amount: "PHP 98900.00"
    },
    {
        date: "31-07-2023",
        type: "Online Transfer",
        amount: "PHP 6000.00"
    },
    {
        date: "17-11-2023",
        type: "Cash Deposit",
        amount: "PHP 88000.00"
    },
    {
        date: "12-12-2023",
        type: "Online Transfer",
        amount: "PHP 39000.00"
    },
    {
        date: "21-09-2023",
        type: "ATM Withdrawal",
        amount: "PHP 4000.00"
    },
    {
        date: "30-01-2023",
        type: "Check Withdrawal",
        amount: "PHP 70000.00"
    }
  ]) 
  const [depositData, setDeposit] = useState([
    {
        date: "01-01-2023",
        type: "Cash Deposit",
        amount: "PHP 5000.00"
    },
    {
        date: "01-02-2023",
        type: "Check Withdrawal",
        amount: "PHP 1000.00"
    },
    {
        date: "01-05-2023",
        type: "Online Transfer",
        amount: "PHP 2500.00"
    },
    {
        date: "01-06-2023",
        type: "ATM Withdrawal",
        amount: "PHP 500.00"
    },
    {
        date: "01-07-2023",
        type: "Cash Deposit",
        amount: "PHP 10000.00"
    },
    {
        date: "18-09-2023",
        type: "Check Withdrawal",
        amount: "PHP 5000.00"
    },
    {
        date: "07-01-2023",
        type: "ATM Withdrawal",
        amount: "PHP 98900.00"
    },
    {
        date: "31-07-2023",
        type: "Online Transfer",
        amount: "PHP 6000.00"
    },
    {
        date: "17-11-2023",
        type: "Cash Deposit",
        amount: "PHP 88000.00"
    },
    {
        date: "12-12-2023",
        type: "Online Transfer",
        amount: "PHP 39000.00"
    },
    {
        date: "21-09-2023",
        type: "ATM Withdrawal",
        amount: "PHP 4000.00"
    },
    {
        date: "30-01-2023",
        type: "Check Withdrawal",
        amount: "PHP 70000.00"
    }
  ])
  useEffect(() => {
    auth.loanAccounts('kmglj7vbudsosei85es4rckra')
    .then((data) => {
      console.log('loan', data)
      setLoan(data)
    })
  }, [])
  return (
    <ScrollView nestedScrollEnabled={true} style={styles.scrollView}>
      <View style={styles.container}>
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
            <Table headerView={false} data={loanData} />
          </>
        </View>
        <View>
          <>
            <Text style={styles.subTitle}>Deposit Accounts</Text>
            <Table headerView={false} data={depositData} />
          </>
        </View>
      </View> 
    </ScrollView>
  );
}

export default Accounts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
  },
  scrollView: {
    flexGrow: 1,
  },
  accountProfile: {
    paddingTop: 10,
  },
  accountTitle: {
    fontSize: 15,
  },
  subTitle: {
    fontSize: 16,
    backgroundColor: "#01403c",
    paddingTop: 8,
    paddingLeft: 8,
    paddingBottom: 8,
    marginTop: 20,
    marginBottom: 10,
    color: "#FFF",
  },
});