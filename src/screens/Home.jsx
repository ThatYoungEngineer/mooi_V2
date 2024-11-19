import React, { useEffect } from 'react'
import { StatusBar, View, Text, ImageBackground, Image, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native'
import bgImage from '../assets/bgImg.jpg'
import Logo from '../assets/logo.png'

import { Button } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useNavigation } from '@react-navigation/native'
import SystemNavigationBar from 'react-native-system-navigation-bar';

export default function Home() {
    const navigation = useNavigation()
    const insets = useSafeAreaInsets();

    useEffect(() => {
        SystemNavigationBar.setNavigationColor('translucent');
        StatusBar.setTranslucent(true);  // Makes the status bar translucent
        StatusBar.setBackgroundColor('transparent');
    }, [])


    return (
        <ImageBackground source={bgImage} style={{flex: 1}}>
            <View style={styles.logoContainer} >
                <Image source={Logo} style={styles.logo} />
            </View>
            <View style={[styles.buttonsContainer, {paddingBottom: insets.bottom+10}]}>            
                <Button icon="file-sign" mode="contained" onPress={() => navigation.navigate("Auth", { screen: "Register" })} labelStyle={{fontSize: 18}} style={[styles.btn, {marginBottom: 10}]} >
                    Register
                </Button>
                <Button icon="login" mode="elevated" onPress={() => navigation.navigate("Auth", { screen: "Login" })} style={styles.btn} labelStyle={{fontSize: 18}} >
                    Login
                </Button>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    logoContainer: {
        width: 170,
        alignSelf: 'center',
        paddingTop: 100

    },
    logo: {
        width: 150,
        height: 150,
        resizeMode: 'cover',
        alignSelf: 'center',
        borderRadius: 20,
    },
    buttonsContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        padding: 20,
    },
    btn: {
        borderRadius: 10
    }

})



