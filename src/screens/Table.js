
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
//import { MaterialCommunityIcons } from '@expo/vector-icons';
import _ from "lodash"

export default function Table({headerView = null, data=[], dataKeys}) {
  const [ columns, setColumns ] = useState([
    "Payment Date",
    "Type",
    "Amount",
  ])
  const [ direction, setDirection ] = useState(null)
  const [ selectedColumn, setSelectedColumn ] = useState(null)
  const [ rowsData, setRowData ] = useState(data)
  const sortTable = (column) => {
    const newDirection = direction === "desc" ? "asc" : "desc" 
    const sortedData = _.orderBy(pets, [column],[newDirection])
    setSelectedColumn(column)
    setDirection(newDirection)
    setRowData(sortedData)
  }
  useEffect(() => (
    setRowData(data)
  ), [data])
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
    data: rowsData,
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
          <Text style={{...styles.columnRowTxt, fontWeight:"bold"}}>{item.loanNumber}</Text>
          <Text style={styles.columnRowTxt}>{item.principalBalance}</Text>
          <Text style={styles.columnRowTxt}>{item.productName}</Text>
        </View>
      )
    }
    flatListProps = {...flatListProps, ListHeaderComponent: tableHeader, renderItem: renderItem }
  } else {
    const renderItem = ({item, index})=> {
      return (
        <View style={styles.rowWrapper}>
          {dataKeys.map((key, index) => {
              const keyItem = Object.keys(key)[0]
              let keyValue = key[keyItem]
              const keyText = keyValue.text ? keyValue.text + ": ": ""
              return <Text key={index} style={keyValue.style}>{keyText}{item[keyItem]}</Text>
          })}
        </View>
      )
    }

    flatListProps = {...flatListProps, renderItem: renderItem }
  }

  return (
    <View style={styles.container}>
      {rowsData.length ?
        <FlatList {...flatListProps} />
      :
        <ActivityIndicator />
      }
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
    paddingTop: 10, 
    marginLeft: 10, 
    marginRight: 10, 
    paddingBottom: 10, 
    borderBottomColor: '#e6e6e6',
    borderBottomWidth: 1,
  }
});