
//import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
//import { MaterialCommunityIcons } from '@expo/vector-icons';
import _ from "lodash"

export default function Table({headerView = null, data=[]}) {
  const [ columns, setColumns ] = useState([
    "Payment Date",
    "Type",
    "Amount",
  ])
  const [ direction, setDirection ] = useState(null)
  const [ selectedColumn, setSelectedColumn ] = useState(null)
  const [ pets, setPets ] = useState(data)

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