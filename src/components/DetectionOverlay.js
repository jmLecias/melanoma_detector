import React from 'react';
import { View, Dimensions, StyleSheet, Text } from 'react-native';

const DetectionOverlay = ({ imageHeight, detection }) => {
    const imageWidth = (imageHeight / 4) * 3;
    const detectionHeight = detection.image.height;
    const detectionWidth = detection.image.width;

    return detection.predictions.map((prediction) => {
        const {
            class: className,
            class_id,
            confidence,
            detection_id,
            height,
            width,
            x,
            y,
            points
        } = prediction;

        const minX = Math.min(...points.map(point => point.x));

        const scaledWidth = (width / detectionWidth) * imageWidth;
        const scaledHeight = (height / detectionHeight) * imageHeight;
        const scaledX = ((minX / detectionWidth) * imageWidth) - (scaledWidth / 2);
        const scaledY = ((y / detectionHeight) * imageHeight) - (scaledHeight / 2);

        console.log(scaledHeight);
        console.log(scaledWidth);
        console.log(scaledX);
        console.log(scaledY);

        return (
            <View
                key={detection_id}
                style={{
                    ...styles.boundingBox,
                    left: scaledX,
                    top: scaledY,
                    width: scaledWidth,
                    height: scaledHeight
                }}
            >
                <Text style={styles.label}>
                    {className} ({(confidence * 100).toFixed(2)}%)
                </Text>
            </View>
        );

    });
};

const styles = StyleSheet.create({
    boundingBox: {
        position: 'absolute',
        backgroundColor: 'rgba(255, 0, 0, 0.25)', // Red color for malignant
        borderWidth: 2,
        borderColor: 'red',
        zIndex: 100,
    },
    label: {
        position: 'absolute',
        width: 130,
        top: -30,
        left: 0,
        color: 'white',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 3,
        borderRadius: 3,
        zIndex: 10,
    },
});

export default DetectionOverlay;
