import React, { useState, useEffect } from 'react';
import { Button, View, Text, Image, StyleSheet, Alert, ScrollView } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import { bundleResourceIO } from '@tensorflow/tfjs-react-native';

const Detect = () => {
    const [imageUri, setImageUri] = useState(null);
    const [model, setModel] = useState(null);
    const navigation = useNavigation();

    // const loadModel = async () => {
    //     const modelJson = require('../../assets/models/model.tflite'); // Adjust the path accordingly
    //     const model = await tflite.loadTFLiteModel(bundleResourceIO(modelJson));
    //     setModel(model);
    // };

    // useEffect(() => {
    //     loadModel();
    // }, []);

    const handleImagePickerResponse = (response) => {
        if (response.didCancel) {
            console.log('User cancelled image picker');
        } else if (response.errorCode) {
            console.log('ImagePicker Error: ', response.errorCode);
        } else if (response.assets && response.assets.length > 0) {
            setImageUri(response.assets[0].uri);
            // processImage(response.assets[0].uri);
        }
    };

    const takePhoto = () => {
        launchCamera({ mediaType: 'photo' }, handleImagePickerResponse);
    };

    const uploadImage = () => {
        launchImageLibrary({ mediaType: 'photo' }, handleImagePickerResponse);
    };

    const processImage = async (uri) => {
        if (!model) {
            Alert.alert('Model not loaded', 'The model is not loaded yet. Please try again.');
            return;
        }

        // Perform inference using the TFLite model
        // ...

        console.log('Processing image...');
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                {imageUri && (
                    <Image source={{ uri: imageUri }} style={styles.image} resizeMode='cover' />
                )}
                {!imageUri && (
                    <Image source={require('../../assets/images/melanoma_detect.png')} style={styles.image} resizeMode='cover' />
                )}
                <View style={styles.buttonContainer}>
                    <View style={{ marginBottom: 15 }}>
                        <Button
                            title="Take Photo"
                            onPress={takePhoto}
                        />
                    </View>
                    <View>
                        <Button
                            title="Upload Image"
                            onPress={uploadImage}
                        />
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'start',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#000',
    },
    image: {
        width: 400,
        height: 400,
    },
    buttonContainer: {
        padding: 20,
        alignItems: 'space-evenly',
        width: '100%',
    },
});

export default Detect;
