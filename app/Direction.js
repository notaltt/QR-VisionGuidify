/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { TextInput, View, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';

const Direction = ({ navigation }) => {
    const [countInput, setCountInput] = useState(1);
    const [inputFields, setInputFields] = useState([{ id: countInput, placeholder: 'Input ' + countInput, text: '' }]);

    const addField = () => {
        const newInputField = { id: countInput + 1, placeholder: 'Input ' + (countInput + 1), text: '' };
        setInputFields([...inputFields, newInputField]);
        setCountInput(countInput + 1);
    };

    const generateBarcode = () => {
        const instructions = inputFields.map(input => input.text);
        const output = `${instructions.map(ins => ins).join(', ')}`;
        console.log('DIRECTION, ' + output);

        navigation.navigate('Generated QR Code', { value: 'DIRECTION, ' + output });
    };

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollStyle}>
                {inputFields.map(input => (
                    <TextInput
                        key={input.id}
                        style={styles.inputStyle}
                        placeholder={input.placeholder}
                        placeholderTextColor={'white'}
                        value={input.text}
                        onChangeText={text => {
                            const updatedInputFields = inputFields.map(item => {
                                if (item.id === input.id) {
                                    return { ...item, text };
                                }
                                return item;
                            });
                            setInputFields(updatedInputFields);
                        }}
                    />
                ))}
            </ScrollView>
            <TouchableOpacity onPress={addField}>
                <Text style={styles.textAddStyle}>ADD DIRECTION...</Text>
            </TouchableOpacity>
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
    inputStyle: {
        backgroundColor: 'black',
        borderColor: 'grey',
        borderWidth: 1,
        marginTop: 10,
        height: 40,
        width: 370,
        padding: 5,
        color: 'white',
        fontSize: 18,
    },
    textButton: {
        color: '#fff',
        fontSize: 18,
    },
    textAddStyle: {
        color: 'white',
        marginBottom: 10,
    },
    buttonStyle: {
        backgroundColor: 'black',
        borderColor: '#fff',
        borderRadius: 50,
        paddingTop: 15,
        paddingBottom: 15,
        paddingHorizontal: 35,
        marginBottom: 30,
    },
    scrollStyle: {
        marginTop: 20,
        marginBottom: 10,
    },
});

export default Direction;


