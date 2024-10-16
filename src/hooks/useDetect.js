import React, { createContext, useContext, useMemo, useEffect, useState, useRef } from "react";
import { Camera, getCameraDevice } from 'react-native-vision-camera';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import ToastManager, { Toast } from 'toastify-react-native'
import RNFS from 'react-native-fs';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DetectContext = createContext();

export const DetectProvider = ({ children }) => {

    const camera = useRef();

    const [showCamera, setShowCamera] = useState(false);
    const [imageSource, setImageSource] = useState('');
    const [result, setResult] = useState(null);
    const [uploading, setUploading] = useState(false);

    const devices = Camera.getAvailableCameraDevices()
    const device = getCameraDevice(devices, 'back')

    const capturePhoto = async () => {
        if (camera.current !== null) {
            const photo = await camera.current.takePhoto();
            const imageUri = "file://" + photo.path
            setImageSource(imageUri);
            setShowCamera(false);
            console.log("file://" + photo.path);

            detect(imageUri);
        }
    };

    const handleImagePickerResponse = (response) => {
        if (response.didCancel) {
            console.log('User cancelled image picker');
        } else if (response.errorCode) {
            console.log('ImagePicker Error: ', response.errorCode);
        } else if (response.assets && response.assets.length > 0) {
            const imageUri = response.assets[0].uri
            setImageSource(imageUri);
            setShowCamera(false);
            console.log(response.assets[0].uri);

            detect(imageUri);
        }
    };

    const uploadImage = () => {
        if (!uploading) {
            launchImageLibrary({ mediaType: 'photo' }, handleImagePickerResponse);
            setUploading(true);
        }
    };

    const detect = async (imageUri) => {
        const base64Image = await getBase64(imageUri);

        try {
            const response = await axios({
                method: "POST",
                url: "https://detect.roboflow.com/melanoma-detection-2/6",
                params: {
                    api_key: "QV5deGyUVsKKlZ4rThSI"
                },
                data: `data:image/jpeg;base64,${base64Image}`, // Prepend with data URI scheme
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                }
            });

            setResult(response.data);
            console.log(response.data);
            Toast.success('Detection complete!');
            return response;
        } catch (error) {
            console.error(error.message);
            Toast.error('Detection error!');
            throw error; // Re-throw the error if needed
        }
    };

    const getBase64 = (uri) => {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = () => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const base64String = reader.result.split(',')[1];
                    resolve(base64String);
                };
                reader.readAsDataURL(xhr.response);
            };
            xhr.onerror = reject;
            xhr.open('GET', uri);
            xhr.responseType = 'blob';
            xhr.send();
        });
    };

    const saveImageAndResult = async (imageUri, result) => {
        const timestamp = Date.now();
        const fileName = `${timestamp}.jpg`; // Generate unique filename
        const directory = RNFS.DocumentDirectoryPath;
        const filePath = `${directory}/${fileName}`; // Note the added '/' before fileName

        try {
            // Move the image file
            await RNFS.moveFile(imageUri, filePath);

            // Prepare the result file path
            const resultFilePath = `${directory}/${timestamp}.json`; // Also added '/' before filename
            await RNFS.writeFile(resultFilePath, JSON.stringify(result));

            const savedFiles = await AsyncStorage.getItem('savedFiles');
            const updatedFiles = savedFiles ? JSON.parse(savedFiles) : [];

            const resultJSON = {
                image: {height: result.image.height, width: result.image.width},
                inference_id: result.inference_id,
                predictions: [...result.predictions.map((prediction) => {
                    return ({
                        class: prediction.class,
                        class_id: prediction.class_id,
                        confidence: prediction.confidence,
                        detection_id: prediction.detection_id,
                        height: prediction.height,
                        width: prediction.width,
                        x: prediction.x,
                        y: prediction.y
                    })
                })],
                time: result.time
            }
            updatedFiles.push({
                timestamp: timestamp,
                image: fileName,
                result: resultJSON, 
            });

            // Save the updated array back to localStorage
            await AsyncStorage.setItem('savedFiles', JSON.stringify(updatedFiles));

            Toast.success('Result saved!');
        } catch (error) {
            console.error('Error saving image and result:', error);
            Toast.show({ text: 'Failed to save image and result.', type: 'error' });
        }
    };



    const value = useMemo(
        () => ({
            camera,
            showCamera,
            setShowCamera,
            imageSource,
            setImageSource,
            device,
            capturePhoto,
            uploadImage,
            result,
            setResult,
            uploading,
            setUploading,
            saveImageAndResult
        }),
        [showCamera, imageSource, result]
    );
    return <DetectContext.Provider value={value}>{children}</DetectContext.Provider>;
};

export const useDetect = () => {
    return useContext(DetectContext);
};