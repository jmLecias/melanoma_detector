import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity,
    Dimensions,
} from "react-native";
import React, { useState } from "react";
import COLORS from "../config/COLORS";
import TYPES from "../config/TYPES";
import SPACING from "../config/SPACING";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from 'react-native-vector-icons/Entypo';

const WIDTH = Dimensions.get("screen").width;

const SymptomsContent = () => {
    return (
        <>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                    Symptoms
                </Text>
                <Text style={styles.paragraphText}>
                    Common symptoms of melanoma include changes to the skin that are unusual for an individual, especially in terms of new growths or changes to existing moles. One of the most critical aspects of recognizing melanoma is noting changes in the shape, size, color, or texture of a spot on the skin. Unlike harmless moles, melanomas tend to have irregular borders, uneven color distribution, and a rapid change in appearance over weeks or months.
                </Text>
                <Image style={styles.imagePlaceholder} source={require('../assets/images/melanoma-signs-abcd.jpg')} />
                <Text style={styles.sectionTitle}>
                    The ABCDE Rule: The ABCDE rule is a helpful guide to recognizing potential melanoma:
                </Text>
                <Text style={styles.listText}>
                    A: Asymmetry - One half of the mole does not match the other, which is a warning sign that the growth is irregular.
                </Text>
                <Text style={styles.listText}>
                    B: Border - The edges of a melanoma are often ragged, notched, or blurred, whereas benign moles have smoother, more even edges.
                </Text>
                <Text style={styles.listText}>
                    C: Color - Melanomas can contain multiple shades of brown, black, red, white, or blue. This color variation is often a sign of cancerous growth.
                </Text>
                <Text style={styles.listText}>
                    D: Diameter - Melanomas are usually larger than 6mm (about the size of a pencil eraser), though they can be smaller when first detected..
                </Text>
                <Text style={[styles.listText, { marginBottom: 40 }]} >
                    E: Evolving - Any change in size, shape, color, or symptoms such as itching or bleeding should prompt a visit to a dermatologist.
                </Text>

                <Text style={styles.sectionTitle}>
                    Other Warning Signs
                </Text>
                <Text style={styles.paragraphText}>
                    Besides the classic ABCDE criteria, melanoma can present as a new, unusual growth on areas of the body that don't get much sun exposure, such as the soles of the feet or the scalp. Dark-brown or black vertical lines beneath the nails or bands of darker skin around fingernails or toenails can be signs of melanoma in those regions. Hidden melanomas can also occur in mucous membranes (like the mouth or nasal passages) or in the eye, where they may cause changes in vision or a dark spot in the iris. Because of the diverse presentation of melanoma, any suspicious changes should be evaluated by a medical professional to rule out malignancy.
                </Text>

            </View>
        </>
    )
};


const styles = StyleSheet.create({
    tourScrollView: {
        marginVertical: SPACING * 2,
    },
    tourContainer: {
        width: WIDTH * 0.6,
        height: WIDTH * 0.8,
        overflow: "hidden",
        borderRadius: SPACING * 2,
        marginRight: SPACING,
    },
    tourInfo: {
        position: "absolute",
        zIndex: 1,
        height: "100%",
        width: "100%",
        backgroundColor: COLORS.transparent,
        justifyContent: "space-between",
        padding: SPACING,
    },
    infoButton: {
        alignSelf: "flex-end",
        padding: SPACING / 2,
        backgroundColor: COLORS.white,
        borderRadius: SPACING * 5,
        justifyContent: "center",
        alignItems: "center",
    },
    tourTitleText: {
        fontSize: SPACING * 2,
        color: COLORS.white,
        fontWeight: "700",
        marginLeft: SPACING,
    },
    tourImage: {
        width: "100%",
        height: "100%",
    },
    paragraphText: {
        color: COLORS.dark,
        fontSize: 18,
    },
    listText: {
        color: COLORS.dark,
        fontSize: 18,
        marginBottom: 10,
    },
    section: {
        marginVertical: 20,
        padding: 18,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 10,
    },
    sectionContent: {
        fontSize: 16,
        color: '#000',
    },
    imagePlaceholder: {
        width: '100%',
        height: 148,
        backgroundColor: '#ddd',
        marginVertical: SPACING * 2,
        borderRadius: SPACING * 2,
        resizeMode: 'contain'
    },
});

export default SymptomsContent;

