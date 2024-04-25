/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import DeleteIcon from '../assets/DeleteIcon';

const Information = ({ navigation }) => {
    const [instructionCount, setInstructionCount] = useState(1);
    const [directionCount, setDirectionCount] = useState(1);
    const [qrLocation, setQrLocation] = useState('');
    const [directionField, setDirectionField] = useState([{ id: directionCount, building: '', instructions: [] }]);

    const addField = (directionId, instructionText) => {
        const newInstruction = { id: instructionCount + 1, text: instructionText };
        const updatedDirections = directionField.map(direction => {
            if (direction.id === directionId) {
                return { ...direction, instructions: [...direction.instructions, newInstruction] };
            }
            return direction;
        });
        setDirectionField(updatedDirections);
        setInstructionCount(instructionCount + 1);
    };

    const addDirection = () => {
        const newDirection = { id: directionCount + 1, building: '', instructions: [] };
        setDirectionField([...directionField, newDirection]);
        setDirectionCount(directionCount + 1);
    };

    const deleteDirection = (directionId) => {
        const updatedDirections = directionField.filter(direction => direction.id !== directionId);
        setDirectionField(updatedDirections);
        setDirectionCount(directionCount - 1);
    };

    const getOutput = () => {
        let outputString = '';

        outputString += `${qrLocation}, `;

        directionField.forEach(direction => {
            outputString += `DIRECTION: ${direction.building}, [${direction.instructions.map(instruction => instruction.text).join(', ')}], `;
        });

        console.log(outputString);

        navigation.navigate('Generated QR Code', { value: 'NAVIGATION, ' + outputString });
    };


    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollStyle}>
                <View>
                    <Text style={styles.titleStyle}>-QR LOCATION-</Text>
                    <View>
                        <TextInput
                            style={styles.inputStyle}
                            placeholder={'Building Name'}
                            placeholderTextColor={'white'}
                            value={qrLocation}
                            onChangeText={text => setQrLocation(text)}
                        />
                    </View>
                </View>
                {directionField.map(direction => (
                    <View key={direction.id} style={[{ marginTop: 10 }]}>
                        <View style={styles.containerDir}>
                            <Text style={styles.titleStyle}>-DIRECTION {direction.id}-</Text>
                            <TouchableOpacity onPress={() => deleteDirection(direction.id)}>
                                <DeleteIcon width={25} height={25} color={'white'}/>
                            </TouchableOpacity>
                        </View>
                        <TextInput
                            style={styles.inputStyle}
                            placeholder={'Building Name'}
                            placeholderTextColor={'white'}
                            value={direction.building}
                            onChangeText={text => {
                                const updatedDirections = directionField.map(dir =>
                                    dir.id === direction.id ? { ...dir, building: text } : dir
                                );
                                setDirectionField(updatedDirections);
                            }}
                        />
                        {direction.instructions.map(instruction => (
                            <TextInput
                                key={instruction.id}
                                style={styles.inputStyle}
                                placeholder={'Instruction'}
                                placeholderTextColor={'white'}
                                value={instruction.text}
                                onChangeText={text => {
                                    const updatedInstructions = direction.instructions.map(ins =>
                                        ins.id === instruction.id ? { ...ins, text } : ins
                                    );
                                    const updatedDirections = directionField.map(dir =>
                                        dir.id === direction.id ? { ...dir, instructions: updatedInstructions } : dir
                                    );
                                    setDirectionField(updatedDirections);
                                }}
                            />
                        ))}
                        <TouchableOpacity
                            style={[{ marginTop: 5 }]}
                            onPress={() => addField(direction.id, '')}
                        >
                            <Text style={styles.textAddStyle}>ADD INSTRUCTION...</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
            <TouchableOpacity onPress={addDirection}>
                <Text style={styles.textAddStyle}>ADD DIRECTION...</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonStyle} onPress={getOutput}>
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
    containerDir: {
        flexDirection: 'row',
    },
    scrollStyle: {
        marginTop: 20,
        marginBottom: 10,
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
        color: '#ffff',
        fontSize: 18,
    },
    textAddStyle: {
        color: 'white',
        marginBottom: 10,
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
    titleStyle: {
        color: 'white',
        fontSize: 14,
    },
});

export default Information;



