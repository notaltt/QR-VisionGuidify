/* eslint-disable prettier/prettier */
import React from 'react';
import QRCode from 'react-native-qrcode-svg';
import { StyleSheet, View } from 'react-native';

const GenerateBarcode = ({route}) => {
    const { value } = route.params;
    return (
        <View style={styles.container}>
            <QRCode
                value={value}
                size={200}
            />
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
});

export default GenerateBarcode;
