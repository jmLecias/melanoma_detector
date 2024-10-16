import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Image,
    ScrollView,
    TouchableOpacity,
    Dimensions,
} from "react-native";
import React, { useState } from "react";
import TABS from "../config/HOME_TABS";
import COLORS from "../config/COLORS";
import SPACING from "../config/SPACING";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation } from "@react-navigation/native";

const WIDTH = Dimensions.get("screen").width;

const HomeScreen = () => {
    const navigation = useNavigation();
    const [activeCategory, setActiveCategory] = useState(0);

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <ScrollView style={styles.scrollViewContent} decelerationRate={'normal'} contentContainerStyle={{paddingBottom: SPACING * 11}}>
                    <View style={styles.headerContainer}>
                        <View style={styles.avatarContainer}>
                            <Image style={styles.avatarImage} source={require("../assets/images/melanoma-logo.png")} />
                            <Text style={styles.titleText}>Melanoma Detector</Text>
                        </View>
                        <TouchableOpacity onPress={() => {navigation.navigate('Results')}}>
                            <Ionicons name="list" style={styles.navigationIcon} size={35} />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.titleTextLarge}>{"Detect \nmelanoma now"}</Text>
                    <View style={styles.tabScrollView}>
                        <ScrollView
                            style={{ marginTop: SPACING * 3 }}
                            contentContainerStyle={{ alignItems: 'center', display: 'flex' }}
                            horizontal
                        >
                            {TABS.map((category, index) => (
                                <TouchableOpacity
                                    key={category.id}
                                    onPress={() => setActiveCategory(index)}
                                    style={styles.tabContainer}
                                >
                                    <Text style={[styles.tabText, activeCategory === index && styles.activeTabText]}>
                                        {category.title}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                    {TABS[activeCategory].content}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
    },
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: SPACING * 2,
    },
    avatarContainer: {
        flexDirection: "row",
        justifyContent: "start",
        alignItems: "center",
        width: '75%',
    },
    avatarImage: {
        height: 38,
        width: 38,
        borderRadius: 100,
    },
    titleText: {
        fontSize: 18,
        fontWeight: "600",
        marginLeft: SPACING,
        color: COLORS.dark,
    },
    navigationIcon: {
        color: COLORS.dark,
        size: 35,
    },
    scrollViewContent: {
        paddingHorizontal: SPACING * 1.5,
    },
    titleTextLarge: {
        fontSize: 35,
        marginTop: SPACING * 2,
        fontWeight: "bold",
        color: COLORS.dark,
    },
    tabScrollView: {
        height: 'auto',
        width: '100%',
        overflow: 'auto',
    },
    tabContainer: {
        marginRight: SPACING * 2,
    },
    tabText: {
        fontSize: SPACING * 1.7,
        fontWeight: "500",
        color: COLORS.dark,
    },
    activeTabText: {
        color: COLORS.primary,
        fontWeight: "700",
    },
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
        marginBottom: 20,
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


export default HomeScreen;