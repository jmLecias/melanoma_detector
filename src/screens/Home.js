import React from 'react';
import { ScrollView, View, Text, StyleSheet, Image } from 'react-native';
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { FloatingAction } from "react-native-floating-action";

const actions = [
    {
        text: "Detect Melanoma",
        icon: require("../../assets/images/detect.png"),
        name: "bt_detect",
        position: 1
    }
];

const Home = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>What is Melanoma?</Text>
                    <Image style={styles.imagePlaceholder} source={require('../../assets/images/layers.jpg')} />
                    <Text style={styles.sectionContent}>
                        Melanoma is a type of skin cancer that develops from the pigment-producing cells known as melanocytes.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Benign Melanoma</Text>
                    <Image style={styles.imagePlaceholder} source={require('../../assets/images/melanoma.jpg')} />
                    <Text style={styles.sectionContent}>
                        Benign melanomas are non-cancerous growths of melanocytes that typically do not spread.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Malignant Melanoma</Text>
                    <Image style={styles.imagePlaceholder} source={require('../../assets/images/malignant.png')} />
                    <Text style={styles.sectionContent}>
                        Malignant melanomas are cancerous and can spread to other parts of the body if not treated early.
                    </Text>
                </View>
                <View style={styles.button}> 
                    <Button
                        title="Learn More"
                        onPress={() => {}}
                    />
                </View>
            </ScrollView>

            {/* <FloatingAction
                actions={actions}
                onPressItem={name => {
                    if (name === 'bt_detect') {
                        navigation.navigate('MelanomaInfo');
                    }
                }}
            /> */}
            <FloatingAction
                onPressMain={() => navigation.navigate('Detect')}
                showBackground={false}
                floatingIcon={<Image source={require('../../assets/images/detect.png')} style={styles.floatingIcon} />}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollViewContent: {
        padding: 20,
        paddingBottom: 100,
    },
    header: {
        alignItems: 'center',
        marginBottom: 30,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
    },
    startButton: {
        marginTop: 20,
        backgroundColor: 'black',
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 20,
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
        marginBottom: 10,
    },
    floatingIcon: {
        width: 30,
        height: 30,
    },
    button: {
        marginTop: 30,
    }
});

export default Home;
