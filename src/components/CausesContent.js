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

const CausesContent = () => {
    return (
        <>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                    Causes
                </Text>
                <Text style={styles.paragraphText}>
                    Melanoma develops when melanocytes, the cells responsible for skin pigmentation, grow uncontrollably. These melanocytes are normally located in the epidermis, the outer layer of the skin, where they produce melanin in response to sunlight, helping to protect skin from UV damage. However, mutations in the DNA of these cells can trigger rapid growth, leading to melanoma. While the exact cause of these mutations is not fully understood, a combination of environmental and genetic factors plays a role.
                </Text>
                <Image style={styles.imagePlaceholder} source={require('../assets/images/sun-exposure.jpg')} />
                <Text style={styles.sectionTitle}>
                    Exposure to UV Radiation:
                </Text>
                <Text style={styles.paragraphText}>
                    One of the primary risk factors for melanoma is exposure to ultraviolet (UV) radiation from the sun or artificial sources like tanning beds. UV radiation can damage the DNA within melanocytes, leading to mutations that cause cells to multiply uncontrollably. People with lighter skin, who have less melanin to protect against UV damage, are at a higher risk. Even brief periods of intense sun exposure, such as severe sunburns during childhood or adolescence, can significantly increase the likelihood of developing melanoma later in life.
                </Text>
                <Text style={styles.sectionTitle}>
                    Genetic Predisposition and Other Risk Factors:
                </Text>
                <Text style={styles.paragraphText}>
                    Aside from UV exposure, genetic predisposition also plays a significant role in melanoma risk. Individuals with a family history of melanoma have a higher chance of developing the condition, especially if close relatives like parents or siblings have been diagnosed. Certain genetic mutations, such as those in the CDKN2A gene, can be inherited and increase the risk. Additionally, those with a large number of moles, especially atypical ones (known as dysplastic nevi), or those who have a personal history of other types of skin cancer are at greater risk. Fair-skinned individuals with freckles, light-colored hair, and light eyes are more susceptible to melanoma due to lower levels of melanin.
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
        marginBottom: 20
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

export default CausesContent;

