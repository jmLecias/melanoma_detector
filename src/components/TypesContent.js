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

const TypesContent = () => {
    return (
        <>
            <ScrollView style={styles.tourScrollView} horizontal>
                {TYPES.map((tour, index) => (
                    <TouchableOpacity key={index} style={styles.tourContainer}>
                        <View style={styles.tourInfo}>
                            <TouchableOpacity style={styles.infoButton}>
                                <Entypo name="info" color={COLORS.primary} size={20} />
                            </TouchableOpacity>
                            <Text style={styles.tourTitleText}>{tour.title}</Text>
                        </View>
                        <Image style={styles.tourImage} source={tour.image} />
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>What is Melanoma?</Text>
                <Text style={styles.paragraphText}>
                    Melanoma is a serious type of skin cancer that arises from melanocytes, the pigment-producing cells in the skin. It typically appears as a mole or dark spot that changes in size, shape, or color, often following the ABCDE rule: Asymmetry, irregular Borders, varying Color, a Diameter larger than 6 millimeters, and Evolution over time.
                </Text>
                <Image style={styles.imagePlaceholder} source={require('../../assets/images/layers.jpg')} />
                <Text style={styles.paragraphText}>
                    Most commonly found on sun-exposed areas, melanoma can also develop in less exposed regions. Early detection is crucial, as it can spread to other parts of the body if untreated. Risk factors include UV exposure, fair skin, a history of sunburns, and a family history of melanoma. Treatment options may include surgery, immunotherapy, targeted therapy, radiation, or chemotherapy.
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
        height: 200,
        backgroundColor: '#ddd',
        marginVertical: SPACING * 2,
        borderRadius: SPACING * 2,
    },
});

export default TypesContent;

