import { setUser } from '@/slice/UserSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import {
    Image,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    View,
} from 'react-native';
import { useDispatch } from 'react-redux';

const SplashScreen = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('user');
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            alert('splashscreen exception')
            console.log('splashscreen exception', e)
            return null;
        }
    };

    const getWalkthroughStatus = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('walk');
            return jsonValue != null ? jsonValue : null;
        } catch (e) {
            console.log(e)
            return null;
        }
    };

    const setWalkthroughStatus = async () => {
        try {
            await AsyncStorage.setItem('walk', 'no');
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        setTimeout(async () => {
            console.log('splashscreen timeout');
            let data = await getData();
            console.log('async data', data);
            if (data) {
                console.log('async data inside if data', data);            
                await dispatch(setUser(data))
                console.log('navigating to chatbot');
                    router.replace("(chatbot)" as any);
            } else {
                let walk = await getWalkthroughStatus();
                if (walk) {
                    console.log('navigating to chatbot', walk);
                    router.replace("(auth)" as any);
                } else {
                    await setWalkthroughStatus();
                    console.log('navigating to walkthrough', walk);
                    router.replace("(walkthrough)" as any);
                }
            }

        }, 5000);
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                barStyle="light-content"
                backgroundColor="#578F4A"
                translucent={false}
            />

            <View style={styles.content}>
                {/* Book Icon Container */}
                <View style={styles.iconContainer}>
                    <Image
                        source={require('../../assets/images/splash/book_splash.png')} // Replace with your icon path
                        resizeMode="contain"
                    />
                </View>
            </View>

            {/* Bottom indicator (home indicator for iOS) */}
            <View style={styles.bottomIndicator} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#578F4A', // Green color from your specs
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    iconContainer: {
        width: 129,
        height: 131,
        backgroundImage: 'url(../../assets/images/splash/book_splash.png)', // Replace with your mask group image path
    },
    bottomIndicator: {
        width: 134,
        height: 5,
        backgroundColor: '#000000',
        borderRadius: 2.5,
        alignSelf: 'center',
        marginBottom: 8,
    },
});


export default SplashScreen;
