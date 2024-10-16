import React, { useState, useEffect, useRef } from 'react';
import { Button, View, Text, Image, StyleSheet, Alert, ScrollView, Linking, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ToastManager, { Toast, rightInOut } from 'toastify-react-native'
import { bundleResourceIO } from '@tensorflow/tfjs-react-native';
import { Camera } from 'react-native-vision-camera';

import Entypo from 'react-native-vector-icons/Entypo';

import COLORS from '../config/COLORS';
import SPACING from '../config/SPACING';

import { useDetect } from '../hooks/useDetect';

import DetectionOverlay from '../components/DetectionOverlay';

const CAPTURED_SIZE = {
    WIDTH: 308,
    HEIGHT: 550,
};

const Detect = () => {
    const [imgState, setImgState] = useState({
        height: null,
        width: null
    });

    const {
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
    } = useDetect();

    useEffect(() => {
        async function getPermission() {
            const permission = await Camera.requestCameraPermission();
            console.log("Camera permission status: " + permission);
            if (permission === "denied") await Linking.openSettings();
        }
        getPermission().then(() => {
            if (device !== null) {
                setShowCamera(true);
            }
        });
    }, []);



    const handleResultExit = () => {
        setImageSource('');
        setResult(null);
        setUploading(false);
        if (device) {
            setShowCamera(true);
        }
    ;}

    if (device === null) {
        return <Text>No cameras found!</Text>
    }

    return (
        <SafeAreaView>
            <ToastManager duration={5000} animationIn={rightInOut} />
            <View style={styles.container}>
                <View style={styles.cameraContainer}>
                    {showCamera ? (
                        <>
                            <Camera
                                ref={camera}
                                style={[StyleSheet.absoluteFill, { flex: 1 }]}
                                device={device}
                                isActive={showCamera}
                                photo={true}
                                photoQualityBalance={'speed'}

                            />
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity
                                    style={styles.actionButton}
                                    activeOpacity={0.8}
                                    onPress={uploadImage}
                                >
                                    <Entypo name="upload" color={COLORS.primary} size={25} />
                                </TouchableOpacity>
                            </View>
                        </>
                    ) : (
                        <>
                            {(imageSource) && (
                                <>
                                    <View style={styles.capturedContainer}>
                                        <Image
                                            source={{ uri: imageSource }}
                                            style={styles.image}
                                        />
                                        {(result) && (
                                            <>
                                                <DetectionOverlay
                                                    detection={result}
                                                    imageHeight={CAPTURED_SIZE.HEIGHT}
                                                />
                                            </>
                                        )}
                                    </View>
                                    {(result) && (
                                        <View style={styles.buttonContainer}>
                                            <TouchableOpacity
                                                style={styles.actionButton}
                                                activeOpacity={0.8}
                                                onPress={handleResultExit}
                                            >
                                                <Entypo name="cross" color={COLORS.primary} size={25} />
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                </>
                            )}

                        </>
                    )}
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.dark,
    },
    cameraContainer: {
        width: '100%',
        height: '100%',
        justifyContent: 'start',
        alignItems: 'center',
    },
    capturedContainer: {
        width: CAPTURED_SIZE.WIDTH,
        height: CAPTURED_SIZE.HEIGHT,
        marginTop: 30,
        borderRadius: SPACING,
        borderColor: 'white',
        borderWidth: 2,
        overflow: 'hidden',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#000',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        position: 'relative'
    },
    button: {
        backgroundColor: COLORS.primary,
        fontSize: 14,
        padding: 5,
    },
    buttonContainer: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: '100%',
        position: 'absolute',
        top: 0,
        padding: SPACING * 0.8,
    },
    actionButton: {
        alignSelf: "flex-end",
        padding: SPACING,
        backgroundColor: COLORS.light,
        borderRadius: SPACING * 5,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default Detect;
