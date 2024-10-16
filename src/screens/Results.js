import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Image,
    ScrollView,
    TouchableOpacity,
    Dimensions,
    FlatList
} from "react-native";
import React, { useState, useEffect } from "react";
import TABS from "../config/HOME_TABS";
import COLORS from "../config/COLORS";
import ADVENTURES from "../config/ADVENTURES";
import SPACING from "../config/SPACING";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from 'react-native-vector-icons/Entypo';
import RNFS from 'react-native-fs';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WIDTH = Dimensions.get("screen").width;

const Results = () => {
    const [data, setData] = useState([]);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const data = await getData();
    //         setData(data || []);
    //     };

    //     fetchData();
    // }, []);

    const getData = async () => {
        try {
            const savedData = await AsyncStorage.getItem('savedFiles');
            console.log("SAVEDD DATA: " + savedData)
            return savedData;
        } catch (error) {
            console.error('Error parsing saved data:', error);
            return [];
        }
    };

    const getSavedFiles = async () => {
        const directory = RNFS.DocumentDirectoryPath;
        const files = await RNFS.readDir(directory);

        const imageFiles = {};
        const resultFiles = {};

        files.forEach((file) => {
            const name = file.name;
            const timestamp = name.split('.')[0];

            if (name.toLowerCase().endsWith('.jpg')) {
                imageFiles[timestamp] = file;
            } else if (name.toLowerCase().endsWith('.json')) {
                resultFiles[timestamp] = file;
            }
        });

        const pairedFiles = Object.keys(imageFiles).map(async (timestamp) => {
            const imageFile = imageFiles[timestamp];
            const resultFile = resultFiles[timestamp];

            const imageUrl = `${directory}/${imageFile.name}`;

            let resultData = {};

            if (resultFile) {
                const resultPath = `${directory}/${resultFile.name}`;
                try {
                    const resultJson = await RNFS.readFile(resultPath, 'utf8');
                    resultData = JSON.parse(resultJson);
                } catch (error) {
                    console.error(`Error reading result file for ${imageFile.name}:`, error);
                }
            }

            return {
                key: timestamp,
                image: imageUrl,
                result: resultData,
            };
        });

        return pairedFiles;
    };


    const renderItem = ({ item }) => {
        if (!item?.result?.predictions) return null;

        return (
            <View style={{ marginVertical: 10 }}>
                <Image
                    source={{ uri: `file://${item.image}` }}
                    style={{ width: 200, height: 200 }}
                />
                <TouchableOpacity onPress={() => { }}>
                    <Text>Height: {item.result.image?.height}, Width: {item.result.image?.width}</Text>
                    <Text>Prediction: {item.result.predictions[0]?.class}</Text>
                    <Ionicons name="eye-outline" size={24} color="#000" />
                </TouchableOpacity>
            </View>
        );
    };


    return (
        <SafeAreaView>
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <View style={styles.avatarContainer}>
                        <Ionicons name="list" style={styles.navigationIcon} size={35} />
                        <Text style={styles.titleText}>Results List</Text>
                    </View>
                </View>
                <Text style={styles.sectionTitle}>Coming soon</Text>

            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
        paddingHorizontal: 20
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


export default Results;