/* eslint-disable prettier/prettier */
import React, { useRef, useState } from 'react';
import QRCode from 'react-native-qrcode-svg';
import {
  StyleSheet,
  View,
  Button,
  PermissionsAndroid,
  Platform,
  Image,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';
import RNQRGenerator from 'rn-qr-generator';

const {height} = Dimensions.get('screen');

const GenerateBarcode = ({ route }) => {
  const { value } = route.params;
  const viewShotRef = useRef(null);
  const [imageUri, setImageUri] = useState(null);

  const generateQRCode = async () => {
    if (!value.trim()) {
      return;
    }

    try {
      const qrCodeData = await RNQRGenerator.generate({
        value: 'VisionGuidify, ' + value,
        height: 300,
        width: 300,
        base64: true,
        backgroundColor: 'white',
        color: 'black',
        correctionLevel: 'M',
      });

      setImageUri({ uri: qrCodeData.uri });
      console.log('VisionGuidify, ' + value);
    } catch (error) {
      console.log('Error generating QR code:', error);
    }
  };

  const saveAsPng = async () => {
    if (Platform.OS === 'android' && !(await requestStoragePermission())) {
      return;
    }

    viewShotRef.current.capture().then((uri) => {
      const options = {
        title: 'Share QR Code',
        url: uri,
        type: 'image/png',
      };
      Share.open(options)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          err && console.log(err);
        });
    });
  };

  const requestStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message: 'This app needs access to your storage to save QR codes.',
          buttonPositive: 'OK',
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  return (
    <View style={styles.container}>
      <ViewShot ref={viewShotRef} options={{ format: 'png', quality: 1.0 }}>
      {imageUri ? (
        <Image style={styles.image} source={imageUri} />
      ) : (
        <TouchableOpacity style={styles.buttonGenerate} onPress={generateQRCode}>
          <Text style={styles.buttonTextStyle}>TAP TO GENERATE QR CODE</Text>
        </TouchableOpacity>
      )}
      </ViewShot>
      <TouchableOpacity style={styles.buttonShare} onPress={saveAsPng}>
        <Text style={styles.buttonText}>Share QR Code</Text>
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
  image: {
    backgroundColor: '#F3F3F3',
    width: 300,
    height: 300,
    borderWidth: StyleSheet.hairlineWidth,
    marginBottom: 16,
  },
  buttonGenerate: {
    backgroundColor: 'white',
    width: height / 3,
    height: height / 3,
    borderWidth: StyleSheet.hairlineWidth,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  buttonTextStyle: {
    fontSize: 30,
    color: 'black',
    textAlign: 'center',
  },
  buttonShare: {
    backgroundColor: 'black',
    borderColor: '#ffff',
    borderRadius: 50,
    marginTop: 10,
    paddingTop: 30,
    paddingBottom: 30,
    paddingStart: 55,
    paddingEnd: 55,
  },
  buttonText: {
    color: '#ffff',
    fontSize: 24,
  }
});


export default GenerateBarcode;
