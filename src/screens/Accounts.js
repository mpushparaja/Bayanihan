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
  const [loanData, setLoan] = useState([]) 
  useEffect(() => {
    auth.loanAccounts('kmglj7vbudsosei85es4rckra')
    .then((data) => {
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
            <Table headerView={false} />
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
    backgroundColor: "#898989",
    paddingTop: 8,
    paddingLeft: 8,
    paddingBottom: 8,
    marginTop: 20,
    marginBottom: 10,
    color: "#FFF",
  },
});