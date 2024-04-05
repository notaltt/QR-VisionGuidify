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
} from 'react-native';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';
import RNQRGenerator from 'rn-qr-generator';

const {height} = Dimensions.get('screen');

const GenerateBarcode = ({ route }) => {
  const { value } = route.params;
  const qrCodeRef = useRef(null);
  const viewShotRef = useRef(null);
  const [imageUri, setImageUri] = useState(null);

  const generateQRCode = async () => {
    if (!value.trim()) {
      return;
    }

    try {
      const qrCodeData = await RNQRGenerator.generate({
        value: value,
        height: 300,
        width: 300,
        base64: true,
        backgroundColor: 'white',
        color: 'black',
        correctionLevel: 'M',
      });

      setImageUri({ uri: qrCodeData.uri });
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
        <Image style={styles.image} source={imageUri} />
      </ViewShot>
      <Button title="Generate QR Code" onPress={generateQRCode} />
      <Button title="Save QR Code" onPress={saveAsPng} />
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
        width: height / 3,
        height: height / 3,
        borderWidth: StyleSheet.hairlineWidth,
        marginBottom: 16,
      },
});

export default GenerateBarcode;
