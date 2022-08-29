import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import database from '@react-native-firebase/database';
// import MapScreen from './Components/MapScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';




function App() {

  const [inpValue, setInpValue] = useState([])
  const [data, setData] = useState("")
  const [indexNum, setIndexNum] = useState()
  const [ifd, setIfd] = useState()


  useEffect(() => {
    const bookingKey = database().ref('/Users Book Hotels/').push();
    let boKIdsnkos = bookingKey.key
    setIfd(boKIdsnkos)

  }, [])

  let HandleChange = () => {

    const bookingKey = database().ref('/Users Book Hotels/').push();
    let boKIdsnkos = bookingKey.key
    if (indexNum) {
      setIndexNum()
      inpValue[indexNum] = data
      setInpValue([...inpValue])
      setData("")

    } else {
      setInpValue([...inpValue, data])
      setData(null)
      let obj = {
        data,
        userId: boKIdsnkos

      }
      database()
        .ref(`${"/Todos/"} ${boKIdsnkos}`)
        .set(obj)
    }
  }

  let editHandle = (v, i) => {
    setIndexNum(i)
    setData(v)

  }

  let deleteHandle = (i) => {
    database().ref(`${"/Todos/"} ${ifd}`).remove()
    console.log(ifd);
    let array = [...inpValue]
    array.splice(i, 1)
    setInpValue(array)
  }

  let deleteAll = () => {
    database().ref('/Todos/').remove()

    setInpValue([])
  }


  return (
    <View style={styles.container}>

      <View style={styles.todoWordMain}>
        <Text style={styles.todoword}>Todo App</Text>
      </View>




      <View style={styles.printBtn}>

        {inpValue.map((v, i) => (

          <View key={i} style={styles.bigbt}>
            <Text key={i} style={{ color: "black", fontSize: 20, marginHorizontal: 13, marginTop: 23, flex: 2 }}>{v}</Text>
            <TouchableOpacity onPress={() => editHandle(v, i)} style={{ backgroundColor: "black", width: 70, height: 39, alignItems: "center", borderRadius: 20, flex: 1, marginTop: 12, marginRight: 4 }}   >

              <Text style={{ color: "lightgray", marginTop: 8 }}>Edit</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => deleteHandle(i)} style={{ width: 75, height: 39, alignItems: "center", borderRadius: 20, backgroundColor: "red", flex: 1, marginRight: 10, marginTop: 12 }}   >
              <Text style={{ color: "lightgray", marginTop: 8 }}>Delete</Text>

            </TouchableOpacity>
          </View>

        ))}

      </View>





      <View style={styles.inpbtnMain}>

        <TextInput placeholder='Add Todo' value={data} onChangeText={e => setData(e)} placeholderTextColor={"black"} style={styles.inp} />
        {indexNum ? <TouchableOpacity onPress={HandleChange} style={styles.touchOpcay} >
          <Text style={styles.touchopcyText}>Edit</Text>


        </TouchableOpacity>

          :
          <TouchableOpacity onPress={HandleChange} style={styles.touchOpcay} >
            <Text style={styles.touchopcyText}>Add</Text>

          </TouchableOpacity>}


        <TouchableOpacity onPress={deleteAll} style={styles.DeleteAll} >
          <Text style={styles.deleteText}>Delete All</Text>


        </TouchableOpacity>

      </View>


      {/* <MapScreen /> */}
    </View>
  )
}
export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  todoWordMain: {
    flex: 0.5,
    alignItems: "center",
    height: 160,
  },
  todoword: {
    color: "black",
    fontFamily: 'sans-serif-light',
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 25,

  },
  printBtn: {
    flex: 2,


  },

  bigbt: {
    flexDirection: "row",
    width: "100%",
    flexWrap: "wrap"


  },

  inpbtnMain: {
    marginHorizontal: 6,
    justifyContent: "flex-end",
    flexDirection: "row"
  },

  inp: {
    backgroundColor: "lightgray",
    borderRadius: 25,
    marginTop: 2,
    flex: 4,
    paddingHorizontal: 16,
    marginBottom: 5
  }
  ,
  touchOpcay: {
    backgroundColor: "black",
    borderRadius: 25,
    padding: 5,
    alignItems: "center",
    alignItems: "center",
    flex: 0.7,
    marginBottom: 3,
    marginLeft: 3

  },

  touchopcyText: {
    marginTop: 9,
    color: "lightgray"
  },
  DeleteAll: {
    backgroundColor: "black",
    borderRadius: 25,
    padding: 5,
    alignItems: "center",
    flex: 1.3,
    marginBottom: 3,
    marginLeft: 3
  },
  deleteText: {
    marginTop: 9,
    color: "lightgray"
  }


})

