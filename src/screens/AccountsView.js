import React, {useEffect, useState} from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import Table from './Table'
import {GenericStyles} from '../styles/Styles';
import {Context as context} from '../../Context';

const Accounts = ({route}) => {
  const auth = context();
  const [accountsData, setAccounts] = useState({
    'loan': {dataKey: 'loans', data: {}},
    'deposit': {dataKey: 'account', data: {}}
  }) 
  const columns = { 'loans' : [
    {loanNumber: {'text': 'Loan Number', 'style': { fontSize: 16, fontWeight: "bold" }}},
    {productName: {'text': 'Loan Poduct Name', 'style': { fontSize: 16, fontWeight: "bold" }}},
    {principalBalance: {'text': 'Loan Balance', 'style': { fontSize: 16 }}},
    {branchName: {'text': 'Loan Branch Name', 'style': { fontSize: 16, fontWeight: "bold" }}},
    {maturityDate: {'text': 'Maturity Date', 'style': { fontSize: 16, fontWeight: "bold" }}},
    {loanNumber: {'text': 'Next Payment Due Date', 'style': { fontSize: 16, fontWeight: "bold" }}},
    {status: {'text': 'Loan Status', 'style': { fontSize: 16, fontWeight: "bold" }}},
    {term: {'text': 'Tenure', 'style': { fontSize: 16 }}}
  ],
  'account': [
    {accountNumber: {'text': 'Account Number', 'style': { fontSize: 16, fontWeight: "bold" }}},
    {productName: {'text': 'Deposit Name', 'style': { fontSize: 16, fontWeight: "bold" }}},
    {availableBalance: {'text': 'Available Balance', 'style': { fontSize: 16 }}},
    {branchName: {'text': 'Account Branch Name', 'style': { fontSize: 16, fontWeight: "bold" }}},
    {maturityDate: {'text': 'Maturity Date', 'style': { fontSize: 16, fontWeight: "bold" }}},
    {interestBalance: {'text': 'Interest Balance', 'style': { fontSize: 16, fontWeight: "bold" }}},
    {term: {'text': 'Tenure', 'style': { fontSize: 16 }}}
  ]
}
const method = accountsData[route.params.type]
const details = method['data'] ? method['data'] : {} 
useEffect(() => {
  auth.findAccounts(route.params.type, route.params.viewId)
  .then(data => {
    setAccounts(prevState => {
      return {
        ...prevState, 
        [route.params.type]: {...method ,'data': data[method['dataKey']]}
      }
    })
})}, [])


const [transData, setTrans] = useState({
  'loan': {dataKey: 'payments', data: {}},
  'deposit': {dataKey: 'transactions', data: {}},
  loading: false,
}) 
const columns1 = { 'payments' : [
  {postedDate: {'text': 'Payment Date', 'style': { fontSize: 16, fontWeight: "bold" }}},
  {amount: {'text': 'Amount', 'style': { fontSize: 16, fontWeight: "bold" }}}
  ],
  'transactions': [
    {postedDate: {'text': 'Payment Date', 'style': { fontSize: 16 }}},
    {transactionType: {'text': 'Type', 'style': { fontSize: 16, fontWeight: "bold" }}},
    {amount: {'text': 'Amount', 'style': { fontSize: 16, fontWeight: "bold" }}}
  ]
}
const method2 = transData[route.params.type]
const details2 = method2['data'] ? method2['data'] : {} 

useEffect(() => {
  setTrans((prevState) => ({
    ...prevState,
    'loading': true,
  }))
  auth.listTrans(route.params.type, route.params.type1, route.params.viewId)
  .then(data => {
    setTrans(prevState => {
      return {
        ...prevState, 
        [route.params.type]: {...method2 ,'data': data[route.params.type1]},
        loading: false
      }
    })
})}, [])
return (
  <ScrollView nestedScrollEnabled={true} style={styles.scrollView}>
    <View style={GenericStyles.container}>
      <View>
        {Object.keys(details) ? <View style={styles.wrapper}>
          {columns[method['dataKey']].map((item, index) => {
            const keyItem = Object.keys(item)[0]
            return <Text key={index}>{item[keyItem].text}: {details[keyItem]}</Text> 
          })}
        </View> : <ActivityIndicator />}
      </View> 
        <Table headerView={true} loading={transData.loading} data={details2} dataKeys={columns1[method2['dataKey']]} />
    </View>
  </ScrollView>);
}

export default Accounts;

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  wrapper: {
    marginTop: 30,
    padding: 10,
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
});