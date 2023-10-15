
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import _ from "lodash"

export default function Table({navigation = null, headerView = null, data=[], dataKeys = [], type = '',  type1 = '', loading, viewId = null, profileHeaderTitle = null}) {
  const [ query, setQuery ] = useState('')
  const [ rowsData, setRowData ] = useState(data)

  useEffect(() => (
    setRowData(data)
  ), [data])


  const handleSearch = text => {
    const formattedQuery = text;
    let filteredData = data.filter((item) => {
      return item.postedDate.includes(formattedQuery)
    })

    if (text === '' ) {
      filteredData = data
    }
    setRowData(filteredData)
    setQuery(text);
  };

  const tableHeader = () => (
    <>
      <View style={styles.searchWrapper}>
        <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        clearButtonMode="always"
        value={query}
        onChangeText={queryText => handleSearch(queryText)}
        placeholder="Search"
        style={{ backgroundColor: 'transparent', paddingHorizontal: 20 }}
      />
      </View>
      <View style={styles.tableHeader}>
        {
          dataKeys.map((key, index) => {
            const keyItem = Object.keys(key)[0]
            let keyValue = key[keyItem]
            return (
              <TouchableOpacity 
                key={index}
                style={styles.columnHeader}>
                <Text style={styles.columnHeaderTxt}>{keyValue.text}</Text>
              </TouchableOpacity>
            )
          })
        }
      </View>
    </>
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
        <View style={{...styles.tableRow}}>
          {dataKeys.map((key, index) => {
            const keyItem = Object.keys(key)[0]
            return <Text key={index} style={styles.columnRowTxt}>{item[keyItem]}</Text>
          })}
        </View>
      )
    }
    flatListProps = {...flatListProps, ListHeaderComponent: tableHeader, renderItem: renderItem }
  } else {
    const renderItem = ({item})=> {
      return (
        <TouchableOpacity
          onPress={() => navigation.navigate('AccountView', { name: profileHeaderTitle, viewId: item[viewId], type: type, type1: type1 })}
          activeOpacity={0.5}
        >
          <View style={styles.rowWrapper}>
            {dataKeys.map((key, index) => {
                const keyItem = Object.keys(key)[0]
                let keyValue = key[keyItem]
                const keyText = keyValue.text ? keyValue.text + ": ": ""
                return <Text key={index} style={keyValue.style}>{keyText}{item[keyItem]}</Text>
            })}
            </View>
        </TouchableOpacity>
      )
    }

    flatListProps = {...flatListProps, renderItem: renderItem }
  }

  return (
    <View style={styles.container}>
      {
        rowsData.length ?
          <FlatList {...flatListProps} />
        : 
          (
            loading ?
            <ActivityIndicator animating={loading} />
            : <Text style={styles.noRecords}>No records</Text>
          )
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  noRecords: {
    padding: 8,
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    height: 50
  },
  searchWrapper: {
    marginTop: 15,
    borderRadius:4, 
    backgroundColor:'#ccc',
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
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    height: 40,
    marginBottom: 5,
    alignItems:"center",
    borderColor: '#e6e6e6',
    borderBottomWidth: 1,
  },
  columnHeader: {
    width: "30%",
    justifyContent: "center",
    alignItems:"center"
  },
  columnHeaderTxt: {
    color: "#000",
    fontWeight: "bold",
  },
  columnRowTxt: {
    width:"30%",
    color: "#000",
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