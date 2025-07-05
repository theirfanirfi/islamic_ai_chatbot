import { setUser } from '@/slice/UserSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    Platform,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { useDispatch } from 'react-redux';

const { width, height } = Dimensions.get('window');

const SplashScreen = () => {
    const logoOpacity = useRef(new Animated.Value(0)).current;
    const logoScale = useRef(new Animated.Value(0.5)).current;
    const titleOpacity = useRef(new Animated.Value(0)).current;
    const titleTranslateY = useRef(new Animated.Value(50)).current;
    const subtitleOpacity = useRef(new Animated.Value(0)).current;
    const subtitleTranslateY = useRef(new Animated.Value(30)).current;
    const verseOpacity = useRef(new Animated.Value(0)).current;
    const verseTranslateY = useRef(new Animated.Value(40)).current;
    const loadingOpacity = useRef(new Animated.Value(0)).current;
    const progressWidth = useRef(new Animated.Value(0)).current;
    const backgroundOpacity = useRef(new Animated.Value(0)).current;
    const [isLogin, setIsLogin] = useState(false)
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        startAnimations();
        clearData();
    }, []);

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('user');
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            console.log(e)
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
    const clearData = async () => {
        await AsyncStorage.removeItem('user');
        await AsyncStorage.removeItem('walk');
    }

    const startAnimations = () => {
        // Background fade in
        Animated.timing(backgroundOpacity, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
        }).start();

        // Logo animation
        Animated.parallel([
            Animated.timing(logoOpacity, {
                toValue: 1,
                duration: 1000,
                delay: 300,
                useNativeDriver: true,
            }),
            Animated.spring(logoScale, {
                toValue: 1,
                delay: 300,
                tension: 50,
                friction: 8,
                useNativeDriver: true,
            }),
        ]).start();

        // Title animation
        Animated.parallel([
            Animated.timing(titleOpacity, {
                toValue: 1,
                duration: 800,
                delay: 800,
                useNativeDriver: true,
            }),
            Animated.timing(titleTranslateY, {
                toValue: 0,
                duration: 800,
                delay: 800,
                useNativeDriver: true,
            }),
        ]).start();

        // Subtitle animation
        Animated.parallel([
            Animated.timing(subtitleOpacity, {
                toValue: 1,
                duration: 800,
                delay: 1200,
                useNativeDriver: true,
            }),
            Animated.timing(subtitleTranslateY, {
                toValue: 0,
                duration: 800,
                delay: 1200,
                useNativeDriver: true,
            }),
        ]).start();

        // Verse animation
        Animated.parallel([
            Animated.timing(verseOpacity, {
                toValue: 1,
                duration: 800,
                delay: 1600,
                useNativeDriver: true,
            }),
            Animated.timing(verseTranslateY, {
                toValue: 0,
                duration: 800,
                delay: 1600,
                useNativeDriver: true,
            }),
        ]).start();

        // Loading animation
        Animated.timing(loadingOpacity, {
            toValue: 1,
            duration: 600,
            delay: 2000,
            useNativeDriver: true,
        }).start();

        // Progress bar animation
        Animated.timing(progressWidth, {
            toValue: width * 0.7,
            duration: 2000,
            delay: 2200,
            useNativeDriver: false,
        }).start(() => {
            // Finish splash screen after animations
            setTimeout(async () => {

                let data = await getData();
                console.log('async data', data);
                if (data) {
                    await dispatch(setUser(data))
                    let walk = await getWalkthroughStatus();
                    if (walk) {
                        router.replace("(chatbot)");
                    } else {
                        await setWalkthroughStatus();
                        router.replace("(walkthrough)");

                    }

                } else {
                    router.replace("(auth)");

                }

            }, 500);
        });
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#1B5E20" />

            {/* Animated Background */}
            <Animated.View style={[styles.background, { opacity: backgroundOpacity }]} />

            {/* Decorative Elements */}
            <View style={styles.decorativeTop} />
            <View style={styles.decorativeBottom} />

            {/* Main Content */}
            <View style={styles.content}>

                {/* Logo Section */}
                <View style={styles.logoSection}>
                    <Animated.View
                        style={[
                            styles.logoContainer,
                            {
                                opacity: logoOpacity,
                                transform: [{ scale: logoScale }],
                            },
                        ]}
                    >
                        <Text style={styles.logoText}>☪</Text>
                        <View style={styles.logoGlow} />
                    </Animated.View>
                </View>

                {/* Title Section */}
                <View style={styles.titleSection}>
                    <Animated.View
                        style={[
                            styles.titleContainer,
                            {
                                opacity: titleOpacity,
                                transform: [{ translateY: titleTranslateY }],
                            },
                        ]}
                    >
                        <Text style={styles.appTitle}>Islamic AI Assistant</Text>
                        <View style={styles.titleUnderline} />
                    </Animated.View>

                    <Animated.View
                        style={[
                            styles.subtitleContainer,
                            {
                                opacity: subtitleOpacity,
                                transform: [{ translateY: subtitleTranslateY }],
                            },
                        ]}
                    >
                        <Text style={styles.subtitle}>Your Digital Islamic Companion</Text>
                        <Text style={styles.subtitleSecondary}>Guidance • Knowledge • Peace</Text>
                    </Animated.View>
                </View>

                {/* Verse Section */}
                <Animated.View
                    style={[
                        styles.verseSection,
                        {
                            opacity: verseOpacity,
                            transform: [{ translateY: verseTranslateY }],
                        },
                    ]}
                >
                    <Text style={styles.verseText}>
                        "And whoever relies upon Allah - then He is sufficient for him. Indeed, Allah will accomplish His purpose."
                    </Text>
                    <Text style={styles.verseReference}>- Quran 65:3</Text>
                </Animated.View>

                {/* Loading Section */}
                <Animated.View
                    style={[
                        styles.loadingSection,
                        { opacity: loadingOpacity },
                    ]}
                >
                    <Text style={styles.loadingText}>Preparing your spiritual journey...</Text>

                    <View style={styles.progressBarContainer}>
                        <Animated.View
                            style={[
                                styles.progressBar,
                                { width: progressWidth },
                            ]}
                        />
                    </View>
                </Animated.View>

            </View>

            {/* Footer */}
            <View style={styles.footer}>
                <Text style={styles.footerText}>Bismillah - In the name of Allah</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1B5E20',
    },
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#1B5E20',
    },
    decorativeTop: {
        position: 'absolute',
        top: -50,
        left: -50,
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
    },
    decorativeBottom: {
        position: 'absolute',
        bottom: -80,
        right: -80,
        width: 300,
        height: 300,
        borderRadius: 150,
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
    },
    logoSection: {
        alignItems: 'center',
        marginBottom: 60,
    },
    logoContainer: {
        position: 'relative',
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 15,
    },
    logoText: {
        fontSize: 60,
        color: '#1B5E20',
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.1)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
    logoGlow: {
        position: 'absolute',
        width: 140,
        height: 140,
        borderRadius: 70,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        top: -10,
        left: -10,
    },
    titleSection: {
        alignItems: 'center',
        marginBottom: 80,
    },
    titleContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    appTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textAlign: 'center',
        letterSpacing: 1,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
    titleUnderline: {
        width: 80,
        height: 3,
        backgroundColor: '#4CAF50',
        marginTop: 10,
        borderRadius: 2,
    },
    subtitleContainer: {
        alignItems: 'center',
    },
    subtitle: {
        fontSize: 18,
        color: '#E8F5E8',
        textAlign: 'center',
        marginBottom: 8,
        fontWeight: '500',
    },
    subtitleSecondary: {
        fontSize: 14,
        color: '#A5D6A7',
        textAlign: 'center',
        fontStyle: 'italic',
    },
    verseSection: {
        alignItems: 'center',
        marginBottom: 60,
        paddingHorizontal: 20,
    },
    verseText: {
        fontSize: 16,
        color: '#E8F5E8',
        textAlign: 'center',
        lineHeight: 24,
        fontStyle: 'italic',
        marginBottom: 10,
    },
    verseReference: {
        fontSize: 14,
        color: '#81C784',
        textAlign: 'center',
        fontWeight: '600',
    },
    loadingSection: {
        alignItems: 'center',
        width: '100%',
    },
    loadingText: {
        fontSize: 16,
        color: '#C8E6C9',
        textAlign: 'center',
        marginBottom: 30,
        fontWeight: '500',
    },
    progressBarContainer: {
        width: width * 0.7,
        height: 4,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 2,
        overflow: 'hidden',
    },
    progressBar: {
        height: '100%',
        backgroundColor: '#4CAF50',
        borderRadius: 2,
        shadowColor: '#4CAF50',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        elevation: 3,
    },
    footer: {
        alignItems: 'center',
        paddingBottom: Platform.OS === 'ios' ? 50 : 30,
    },
    footerText: {
        fontSize: 14,
        color: '#A5D6A7',
        textAlign: 'center',
        fontWeight: '500',
    },
});

export default SplashScreen;