/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';

const Information = ({navigation}) => {
    const [buildingName, setBuildingName] = useState('');
    const [buildingNo, setBuildingNo] = useState('');
    const [buildingInfo, setBuildingInfo] = useState('');

    const generateBarcode = () => {
        const output = {
            'BUILDING INFORMATION': {
                'buildingName':buildingName,
                'buildingNo':buildingNo,
                'buildingInfo':buildingInfo,
            },
        };

        navigation.navigate('Generated QR Code', { value: JSON.stringify(output) });
    };

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollStyle}>
                <View>
                    <TextInput
                        value={buildingName}
                        style={styles.inputStyle}
                        placeholder={'Building Name'}
                        placeholderTextColor={'white'}
                        onChangeText={text => setBuildingName(text)}
                    />
                </View>
                <View>
                    <TextInput
                        value={buildingNo}
                        style={styles.inputStyle}
                        placeholder={'Building no. (optional)'}
                        placeholderTextColor={'white'}
                        onChangeText={text => setBuildingNo(text)}
                    />
                </View>
                <View>
                    <TextInput
                        value={buildingInfo}
                        style={styles.inputStyle}
                        placeholder={'Building Information'}
                        placeholderTextColor={'white'}
                        onChangeText={text => setBuildingInfo(text)}
                    />
                </View>
            </ScrollView>
            <TouchableOpacity style={styles.buttonStyle} onPress={generateBarcode}>
                <Text style={styles.textButton}>Generate Barcode</Text>
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
    scrollStyle: {
        marginTop: 60,
        marginBottom: 10,
    },
    scrollContent: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    textStyle: {
        fontSize: 20,
        color: 'white',
        marginBottom: 5,
        marginTop: 10,
    },
    inputStyle: {
        backgroundColor: 'black',
        borderColor: 'grey',
        borderWidth: 1,
        height: 40,
        width: 370,
        padding: 5,
        color: 'white',
        fontSize: 18,
    },
    textButton: {
        color: '#ffff',
        fontSize: 18,
    },
    buttonStyle: {
        backgroundColor: 'black',
        borderColor: '#ffff',
        borderRadius: 50,
        paddingTop: 25,
        paddingBottom: 25,
        paddingStart: 35,
        paddingEnd: 35,
        marginBottom: 30,
    },
});

export default Information;
