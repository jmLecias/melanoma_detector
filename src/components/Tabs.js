import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Foundation from 'react-native-vector-icons/Foundation';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import COLORS from "../config/COLORS";

import HomeScreen from "../screens/HomeScreen";
import Detect from "../screens/Detect";
import Results from "../screens/Results";
import { useDetect } from "../hooks/useDetect";

const Tab = createBottomTabNavigator();

const CenterTab = ({ children, onPress, onLongPress }) => (
    <TouchableOpacity
        style={[styles.centerTab, styles.shadow]}
        onPress={onPress}
        onLongPress={onLongPress}
        activeOpacity={0.85}
    >
        <View style={styles.centerTabContainer}>
            {children}
        </View>
    </TouchableOpacity>
);

const Tabs = () => {
    const navigation = useNavigation();
    const {
        camera,
        showCamera,
        setShowCamera,
        imageSource,
        setImageSource,
        device,
        capturePhoto,
        uploadImage
    } = useDetect();


    const handleCapturePress = () => {
        if (
            device !== null && 
            showCamera && 
            imageSource === '' && 
            camera.current !== null
        ) {
            capturePhoto(); 
        }
    };

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: styles.tabBarStyle,
                headerShown: false
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.bottomTabIcon}>
                            <MaterialIcons name="medical-information" style={{ color: focused ? COLORS.primary : COLORS.gray }} size={30} />
                            <Text style={[{ color: focused ? COLORS.primary : COLORS.gray }, styles.iconText]}>
                                Home
                            </Text>
                        </View>
                    )
                }}
            />
            <Tab.Screen
                name="Detect"
                component={Detect}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <FontAwesome5 name="disease" style={{ color: COLORS.light }} size={45} />
                    ),
                    tabBarButton: ({children, onPress}) => (
                        <CenterTab children={children} onPress={onPress} onLongPress={handleCapturePress} />
                    )
                }}
            />
            <Tab.Screen
                name="Results"
                component={Results}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.bottomTabIcon}>
                            <Foundation name="results" style={{ color: focused ? COLORS.primary : COLORS.gray }} size={30} />
                            <Text style={[{ color: focused ? COLORS.primary : COLORS.gray }, styles.iconText]}>
                                Results
                            </Text>
                        </View>
                    )
                }}
            />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    tabBarStyle: {
        position: 'absolute',
        bottom: 25,
        left: 20,
        right: 20,
        elevation: 10,
        backgroundColor: "#FFFF",
        borderRadius: 100,
        height: 65,
    },
    bottomTabIcon: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    iconText: {
        fontWeight: "500",
        fontSize: 12
    },
    centerTab: {
        top: -20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    centerTabContainer: {
        width: 80,
        height: 80,
        borderRadius: 100,
        backgroundColor: COLORS.primary,
    },
    shadow: {
        shadowColor: COLORS.dark,
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 50,
        elevation: 3,
        backgroundColor: "#0000",
        zIndex: 999,
    },
});

export default Tabs;
