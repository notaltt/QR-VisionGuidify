/* eslint-disable prettier/prettier */
import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet, StatusBar } from 'react-native';

const Main = ({navigation}) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'#262626'}/>
      <Text style={styles.title}>Generate QR Code</Text>
      <TouchableOpacity style={styles.buttonStyle2} onPress={() => navigation.navigate('Navigation QR Code')}>
        <Text style={styles.buttonTextStyle}>Navigation QR Code</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonStyle3} onPress={() => navigation.navigate('Direction QR Code')}>
        <Text style={styles.buttonTextStyle}>Direction QR Code</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonStyle} onPress = {() => navigation.navigate('Information QR Code')}>
        <Text style={styles.buttonTextStyle}>Information QR Code</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#262626',
  },
  title: {
    fontSize: 45,
    color: '#ffff',
    marginBottom: 80,
  },
  buttonStyle: {
    backgroundColor: 'black',
    borderColor: '#ffff',
    borderRadius: 50,
    marginTop: 10,
    paddingTop: 30,
    paddingBottom: 30,
    paddingStart: 40,
    paddingEnd: 40,
  },
  buttonStyle2: {
    backgroundColor: 'black',
    borderColor: '#ffff',
    borderRadius: 50,
    marginTop: 10,
    paddingTop: 30,
    paddingBottom: 30,
    paddingStart: 43,
    paddingEnd: 43,
  },
  buttonStyle3: {
    backgroundColor: 'black',
    borderColor: '#ffff',
    borderRadius: 50,
    marginTop: 10,
    paddingTop: 30,
    paddingBottom: 30,
    paddingStart: 55,
    paddingEnd: 55,
  },
  buttonTextStyle: {
    color: '#ffff',
    fontSize: 24,
  },
});

export default Main;
