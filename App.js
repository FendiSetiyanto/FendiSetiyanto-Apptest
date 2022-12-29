/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  Modal,
  Dimensions, 
  Platform
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import contacts from './app/asset/contact-page-banner.png';
import result from 'lodash/result';
import axios from 'axios';
import { isEmpty, map } from 'lodash';
const {width, height} = Dimensions.get('window');


const App = () => {
  const [fistName, onChangeFirstName] = React.useState(null);
  const [lastName, onChangeLastName] = React.useState(null);
  const [Age, onChangeAge] = React.useState(null);
  const photo = "http://vignette1.wikia.nocookie.net/lotr/images/6/68/Bilbo_baggins.jpg/revision/latest?cb=20130202022550";
  const data = {fistName, lastName, Age, photo};
  const [contactJenius, setDataContact] = React.useState([]);
  const [showModal, setVisible] = React.useState(false);
  const [showDelet, setDelet] = React.useState(false);
  const [deleteContact, onChangeDelete] = React.useState(null);
  const [byId, onChangeSearch] = React.useState(null);
  const [showById, setShowById] = React.useState(false);
  const [dataById, setDataById] = React.useState(null);
  setShowUpdate
  const [showUpdate, setShowUpdate] = React.useState(false);
  const [idData, onChangeUpdate] = React.useState(null);
  const [dataAll, setDataAll] = React.useState(null);


  const addContact = (data) => () => {
    const firstName = result(data, 'fistName', '');
    const lastName = result(data, 'lastName', '');
    const Age = parseInt(result(data, 'Age', 0));
    const photo = result(data, 'photo', '');
    axios
      .post('https://contact.herokuapp.com/contact', {
          firstName: firstName,
          lastName: lastName,
          age: Age,
          photo: photo
      })
      .then(function (response) {
        alert('Succes save data!');
      })
      .catch(function (error) {
        alert('Failed to save data!');
      });
  }
  
  const UpdateContact = (data) => () => {
    const firstName = result(data, 'fistName', '');
    const lastName = result(data, 'lastName', '');
    const Age = parseInt(result(data, 'Age', 0));
    const photo = result(data, 'photo', '');
    const id = idData;
    axios
      .post(`https://contact.herokuapp.com/contact/${id}`, {
          firstName: firstName,
          lastName: lastName,
          age: Age,
          photo: photo
      })
      .then(function (response) {
        alert('Succes save data!');
      })
      .catch(function (error) {
        alert('Failed to save data!');
      });
  }

  const getDataContacts = () => () => {
    setVisible(!showModal);
    axios
      .get('https://contact.herokuapp.com/contact')
      .then(function (response) {
        console.log('helloku', response);
        const dataAll = result(response, 'data.data', []);
        {!isEmpty(dataAll) ?
          setDataAll(dataAll)
          :
          null
        }
      })
      .catch(function (error) {
        alert(error.message);
      });
  };

  const goDeleteContact = (deleteContact) => () => {
    const id = deleteContact;
    axios
      .post(`https://contact.herokuapp.com/contact/${id}`)
      .then(function (response) {
        alert('Succes delete data');
        setDelet(!showDelet);
      })
      .catch(function (error) {
        alert('Failed to delete data!');
        setDelet(!showDelet);
      });
  }

  const goSearchContact = () => () => {
    const id = byId;
    axios
      .get(`https://contact.herokuapp.com/contact/${id}`)
      .then(function (response) {
        console.log('response', response);
        const dataById = result(response, 'data.data', {});
        alert('Succes search', response.data);
        setDataById(dataById);
      })
      .catch(function (error) {
        alert('Failed to search data!');
      });
  }
  

  const deleteData = () => () => {
    setDelet(!showDelet);
  }

  const showDataById = () => () => {
    setShowById(!showById);
  }

  const editData = () => () => {
    setShowUpdate(!showUpdate);
  }
  
  console.log('dataAll', dataAll);
  const firstNameById = result(dataById, 'firstName', '');
  const lastNameById = result(dataById, 'lastName', '');
  const ageById = result(dataById, 'age', '');
  return (
    <ScrollView keyboardShouldPersistTaps='handled' extraHeight={120}>
        <View style={styles.body}>
          <View style={styles.sectionContainer}>
            <Image source={contacts} style={styles.iconSize}/>
            <Text style={styles.sectionTitle}>Contact Person</Text>
          </View>
          {
          showDelet ?
          <View style={styles.formContainer}>
            <View style={styles.headerForm}>
              <Text style={styles.textHeader}>Menu Delete Contact</Text>
            </View>
            <View>
              <TextInput
                style={styles.input}
                onChangeText={onChangeDelete}
                value={deleteContact}
                placeholder="id contact"
                keyboardType="default"
                placeholderTextColor = "black"
              />
            </View>
            <View style={styles.containerButton}>
              <Button
                onPress={goDeleteContact(deleteContact)}
                title="Yes"
                style={styles.buttonDisplay}
                color="red"
              />
            </View>
          </View>
          :
          showById ?
          <View>
            <View style={styles.formContainer}>
            <View style={styles.headerForm}>
              <Text style={styles.textHeader}>Menu Search Contact</Text>
            </View>
            <View>
              <TextInput
                style={styles.input}
                onChangeText={onChangeSearch}
                value={byId}
                placeholder="id contact"
                keyboardType="default"
                placeholderTextColor = "black"
              />
            </View>
            <View style={styles.containerButton}>
              <Button
                onPress={goSearchContact()}
                title="Search"
                style={styles.buttonDisplay}
                color="red"
              />
            </View>
            </View>
            {
              !isEmpty(dataById) ?
                <View style={styles.byIdStyle}>
                  <Text>Nama: {firstNameById} {lastNameById}</Text>
                  <Text>Age: {ageById}</Text>
                </View>
              :
                null
            }
          </View>
          :
          showUpdate ?
          <View style={styles.formContainer}>
             <View>
              <TextInput
                style={styles.input}
                onChangeText={onChangeUpdate}
                value={idData}
                placeholder="id contact"
                keyboardType="default"
                placeholderTextColor = "black"
              />
            </View>
            <View>
              <TextInput
                style={styles.input}
                onChangeText={onChangeFirstName}
                value={fistName}
                placeholder="First Name"
                keyboardType="default"
                placeholderTextColor = "black"
              />
            </View>
            <View>
              <TextInput
                style={styles.input}
                onChangeText={onChangeLastName}
                value={lastName}
                placeholder="Last Name"
                keyboardType="default"
                placeholderTextColor = "black"
              />
            </View>
            <View>
              <TextInput
                style={styles.input}
                onChangeText={onChangeAge}
                value={Age}
                placeholder="Age"
                keyboardType="numeric"
                placeholderTextColor = "black"
              />
            </View>
            <View style={styles.paddingButton}>
            <Button
              onPress={UpdateContact(data)}
              title="Save"
              color="#4CC552"
            />
            </View>
          </View>
          :
          <View style={styles.formContainer}>
          <View>
            <TextInput
              style={styles.input}
              onChangeText={onChangeFirstName}
              value={fistName}
              placeholder="First Name"
              keyboardType="default"
              placeholderTextColor = "black"
            />
          </View>
          <View>
            <TextInput
              style={styles.input}
              onChangeText={onChangeLastName}
              value={lastName}
              placeholder="Last Name"
              keyboardType="default"
              placeholderTextColor = "black"
            />
          </View>
          <View>
            <TextInput
              style={styles.input}
              onChangeText={onChangeAge}
              value={Age}
              placeholder="Age"
              keyboardType="numeric"
              placeholderTextColor = "black"
            />
          </View>
          <View style={styles.paddingButton}>
          <Button
            onPress={addContact(data)}
            title="Save"
            color="#4CC552"
          />
          </View>
          <View style={styles.containerButton}>
            <Button
              onPress={getDataContacts()}
              title="Data"
              style={styles.buttonDisplay}
              color="red"
            />
          </View>
          <View style={styles.containerButton}>
            <Button
              onPress={deleteData()}
              title="Delete"
              style={styles.buttonDisplay}
              color="orange"
            />
          </View>
          <View style={styles.containerButton}>
            <Button
              onPress={showDataById()}
              title="Search"
              style={styles.buttonDisplay}
              color="grey"
            />
          </View>
          <View style={styles.containerButton}>
            <Button
              onPress={editData()}
              title="Update"
              style={styles.buttonDisplay}
              color="black"
            />
          </View>
          </View>
          }
          {
            !isEmpty(dataAll) ?
            <View style={styles.containerHeaderdata}>
              <Text style={styles.textHeader2}>Data Nasabah</Text>
            </View>
            :
            null
          }
          {map(dataAll, (value, k) => (
            <View index={k}>
              <View style={styles.containerData}>
                <View>
                  <Image
                    style={styles.tinyLogo}
                    source={{
                      uri:`http://vignette1.wikia.nocookie.net/lotr/images/6/68/Bilbo_baggins.jpg/revision/latest?cb=20130202022550`,
                    }}
                  />
                </View>
                <Text style={styles.Txt1}>Nama: {result(value, 'firstName', '')} {result(value, 'lastName', '')}</Text>
                <Text style={styles.Txt2}>Age: {result(value, 'age', '')}</Text>
                <Text style={styles.Txt3}>Id: {result(value, 'id', '')}</Text>
              </View>
            </View>)
          )}
        </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#3BB9FF',
    height: height * 5
  },
  sectionContainer: {
    paddingHorizontal: 25,
    paddingBottom: 20
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: 'white',
    fontWeight: 'bold'
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  iconSize: {
    width: 100,
    height: 100,
  },
  inputField: {
    marginLeft: 0,
    justifyContent: 'flex-start',
    paddingVertical: 10,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10
  },
  buttonSave: {
    color: '#4CC552'
  },
  paddingButton: {
    paddingHorizontal: 15,
    borderRadius: 20,
    paddingVertical: 20
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white',
},
buttonStyle: {
  justifyContent:'center',
  alignItems: 'center',
  backgroundColor: '#DDDDDD',
},
containerFlate: {
  flex: 1,
  margin: 16,
  height: 150,
  borderRadius: 8,
  elevation: 4,
  backgroundColor: '#c91111',
  shadowColor: 'black',
  shadowOpacity: 0.25,
  shadowOffset: {
      width: 0,
      height: 2,
  },
  shadowRadius: 8,
},
innerContainer: {
  flex: 1,
  borderRadius: 8,
  justifyContent: 'center',
  alignItems: 'center',
},
containerButton: {
  paddingTop: 20,
  paddingHorizontal: 15,
  borderRadius: 20,
},
buttonDisplay: {
  justifyContent:'center',
  alignItems: 'center'
},
centeredView: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 22
},
modalView: {
  margin: 20,
  backgroundColor: "white",
  borderRadius: 20,
  padding: 35,
  alignItems: 'center',
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2
  },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 5
},
formContainer: {
  backgroundColor: 'white',
  marginHorizontal: 20,
  paddingVertical: 20,
  borderRadius: 20
},
headerForm: {
  paddingHorizontal: 15
},
textHeader: {
  color: 'black',
  fontSize: 20
},
byIdStyle: {
  marginVertical: 20,
  marginHorizontal: 20,
  backgroundColor: 'white'
},
containerData: {
  paddingHorizontal: 30,
  backgroundColor: 'white',
  borderRadius: 10,
  marginHorizontal: 20,
},
containerHeaderdata: {
  marginHorizontal: 20,
  marginTop: 20
},
textHeader2: {
  color: 'black',
  fontWeight: 'bold'
},
Txt1: {
  paddingTop: 20,
},
Txt2: {
  //
},
Txt3: {
  paddingBottom: 20
}
});

export default App;
