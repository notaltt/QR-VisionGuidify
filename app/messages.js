/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export const ConfirmMessage = ({message, onCancel, onConfirm}) => {
    return (
        <View style={confirmStyle.container}>
           <View style={confirmStyle.container2}>
                <Text style={confirmStyle.textMessage}>{message}</Text>
                <View style={confirmStyle.container3}>
                        <TouchableOpacity onPress={onConfirm}>
                            <Text style={confirmStyle.buttonMessage}>Confirm</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onCancel}>
                            <Text style={confirmStyle.buttonMessage}>Cancel</Text>
                        </TouchableOpacity>
                </View>
           </View>
        </View>
    );
};

export const ErrorMessage = ({message, onOkay}) => {
    return (
        <View style={confirmStyle.container}>
           <View style={confirmStyle.container2}>
                <Text style={confirmStyle.textMessage}>{message}</Text>
                    <TouchableOpacity onPress={onOkay}>
                        <Text style={confirmStyle.buttonMessage}>Okay</Text>
                    </TouchableOpacity>
           </View>
        </View>
    );
};

const confirmStyle = StyleSheet.create({
    container: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    container2: {
        backgroundColor: 'black',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        width: '100%',
        position: 'absolute',
        bottom: 0,
    },
    container3: {
        flex: 1,
        flexDirection: 'row',
        gap: 10,
    },
    textMessage: {
        color: 'white',
        fontSize: 24,
    },
    buttonMessage: {
        color: 'white',
        fontSize: 18,
    },
});
