
//import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
//import { MaterialCommunityIcons } from '@expo/vector-icons';
import _ from "lodash"

export default function Table({headerView = null}) {
  const [ columns, setColumns ] = useState([
    "Payment Date",
    "Type",
    "Amount",
  ])
  const [ direction, setDirection ] = useState(null)
  const [ selectedColumn, setSelectedColumn ] = useState(null)
  const [ pets, setPets ] = useState([
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

  const sortTable = (column) => {
    const newDirection = direction === "desc" ? "asc" : "desc" 
    const sortedData = _.orderBy(pets, [column],[newDirection])
    setSelectedColumn(column)
    setDirection(newDirection)
    setPets(sortedData)
  }
  const tableHeader = () => (
    <View style={styles.tableHeader}>
      {
        columns.map((column, index) => {
          {
            return (
              <TouchableOpacity 
                key={index}
                style={styles.columnHeader} 
                onPress={()=> sortTable(column)}>
                <Text style={styles.columnHeaderTxt}>{column + " "} 
                  {/* { selectedColumn === column && <MaterialCommunityIcons 
                      name={direction === "desc" ? "arrow-down-drop-circle" : "arrow-up-drop-circle"} 
                    />
                  } */}
                </Text>
              </TouchableOpacity>
            )
          }
        })
      }
    </View>
  )

  let flatListProps = {
    data: pets,
    style: {width:"100%"},
    nestedScrollEnabled: true,
    scrollEnabled: false,
    keyExtractor: (item, index) => index+"",
    stickyHeaderIndices: [0]
  }

  if (headerView) {
    const renderItem = ({item, index})=> {
      return (
        <View style={{...styles.tableRow, backgroundColor: index % 2 == 1 ? "#F0FBFC" : "white"}}>
          <Text style={{...styles.columnRowTxt, fontWeight:"bold"}}>{item.date}</Text>
          <Text style={styles.columnRowTxt}>{item.type}</Text>
          <Text style={styles.columnRowTxt}>{item.amount}</Text>
        </View>
      )
    }
    flatListProps = {...flatListProps, ListHeaderComponent: tableHeader, renderItem: renderItem }
  } else {
    const renderItem = ({item, index})=> {
      return (
        <View style={styles.rowWrapper}>
          <Text style={{ fontSize: 18, fontWeight:"bold" }}>{item.date}</Text>
          <Text style={{ fontSize: 12 }}>Loan Balance: {item.amount}</Text>
          <Text style={{ fontSize: 12 }}>{item.type}</Text>
        </View>
      )
    }
    flatListProps = {...flatListProps, renderItem: renderItem }
  }

  return (
    <View style={styles.container}>
      <FlatList {...flatListProps} />
      {/* <StatusBar style="auto" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#37C2D0",
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    height: 50
  },
  tableRow: {
    flexDirection: "row",
    height: 40,
    alignItems:"center",
  },
  columnHeader: {
    width: "30%",
    justifyContent: "center",
    alignItems:"center"
  },
  columnHeaderTxt: {
    color: "white",
    fontWeight: "bold",
  },
  columnRowTxt: {
    width:"30%",
    textAlign:"center",
  },
  rowWrapper: { 
    paddingLeft: 10, 
    paddingTop: 10, 
    paddingBottom: 10, 
    marginTop: 9, 
    borderRadius:10, 
    backgroundColor: '#fff',
    borderRadius: 5,
    borderColor: '#CCC',
    borderWidth: 1,
  }
});