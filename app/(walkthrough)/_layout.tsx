import WalkthroughStep from '@/components/WalkthroughStep';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width, height } = Dimensions.get('window');

const WalkthroughScreen = () => {
    const [currentScreen, setCurrentScreen] = useState(0);
    const router = useRouter();

    const walkthroughData = [
        {
            id: 0,
            buttons: [
                { emoji: '📖', text: 'Daily Verses', position: { top: 27, right: 20 } },
                { emoji: '📔', text: 'Journal', position: { top: 116, left: 20 } },
                { emoji: '🤲', text: 'Daily Dua', position: { top: 232, right: 20 } }
            ],
            mainButton: { emoji: '🧠', text: 'AI Platform', active: true },
            image: require('../../assets/images/container_1.png'),
            title: 'The First Truly Muslim AI Platform',
            subtitle: 'Accurate Islamic knowledge at your finger tips. 24/7 scholarly companion.',
            testimonial: null,
            active: true,
            nextButtonStyleClass: {width: width * 0.22} // Adjusted width for the next button
        },
        {
            id: 1,
            buttons: [
                { emoji: '📖', text: 'Daily Verses', position: { top: 27, right: 20 }, active: true },
                { emoji: '📔', text: 'Journal', position: { top: 116, left: 20 } },
                { emoji: '🤲', text: 'Daily Dua', position: { top: 232, right: 20 } }
            ],
            mainButton: { emoji: '🧕', text: 'Verified Scholars' },
            title: 'Built with Scholars for Authentic Guidance',
            subtitle: 'Content and answers reviewed by UK and Pakistani Islamic scholars for authenticity.',
            testimonial: null,
            image: require('../../assets/images/container_2.png'),
            active: false,
            nextButtonStyleClass: {width: width * 0.44} // Adjusted width for the next button
        },
        {
            id: 2,
            buttons: [
                { emoji: '📖', text: 'Daily Verses', position: { top: 27, right: 20 } },
                { emoji: '📔', text: 'Journal', position: { top: 116, left: 20 }, active: true },
                { emoji: '🤲', text: 'Daily Dua', position: { top: 232, right: 20 } }
            ],
            mainButton: { emoji: '🧠', text: 'Conversation Topics' },
            title: 'Ihsan AI is your insightful companion.',
            subtitle: 'Powered by advanced algorithms, a comprehensive knowledge base and scholar verification ',
            testimonial: null,
            image: require('../../assets/images/container_3.png'),
            active: false,
            nextButtonStyleClass: {width: width * 0.66} // Adjusted width for the next button
        },
        {
            id: 3,
            buttons: [
                { emoji: '📖', text: 'Daily Verses', position: { top: 27, right: 20 } },
                { emoji: '📔', text: 'Journal', position: { top: 116, left: 20 } },
                { emoji: '🤲', text: 'Daily Dua', position: { top: 232, right: 20 }, active: true }
            ],
            image: require('../../assets/images/container_4.png'),
            mainButton: { emoji: '✍️', text: 'Get Started' },
            title: 'Start your Islamic Journey with Ihsan AI',
            subtitle: 'Ask questions and get real time answers verified by scholars.',
            testimonial: null,
            active: false,
            nextButtonStyleClass: {width: width * 0.88} // Adjusted width for the next button
        }
    ];

    const currentData = walkthroughData[currentScreen];

    const handleNext = () => {
        if (currentScreen < walkthroughData.length - 1) {
            setCurrentScreen(currentScreen + 1);
        } else {
            // Handle completion of walkthrough
            router.replace("(auth)");
        }
    };


    return (
        <View style={styles.container}>
            {/* Main Content */}
            <WalkthroughStep currentData={currentData} />
            {/* Next Button */}
            <TouchableOpacity
                onPress={handleNext}
                style={styles.nextButtonContainer}
            >
                <LinearGradient
                    colors={['#000000', '#ffffff']}
                    end={{ x: 1.5, y: 0.5 }}
                    style={[styles.nextButton,currentData.nextButtonStyleClass]}
                >
                    <Text style={[styles.nextButtonText]}>Next</Text>
                    <Text style={styles.arrowIcon}>{'>>>'}</Text>
                </LinearGradient>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAF7',
        width: width,
        height: height,
    },
    progressContainer: {
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center',
    },
    progressDot: {
        width: 12,
        height: 12,
        backgroundColor: 'rgba(203, 178, 106, 0.2)',
        borderRadius: 6,
    },
    activeDot: {
        backgroundColor: '#CBB26A',
    },
    nextButtonContainer: {
        position: 'absolute',
        width: width * 0.9,
        bottom: height * 0.04,
        height: height * 0.08,
        borderRadius: height * 0.04,
        padding: 6,
        backgroundColor: '#578F4A'
    },
    nextButton: {
        flex: 1,
        width: width * 0.22, // 0.22 , 0.44// 0.66 // 0.88
        backgroundColor: '#000000',
        borderRadius: 100,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        paddingHorizontal: 16,
        borderRightWidth: 1.2,
        borderRightColor: '#F4E49B'
    },
    nextbutton44Width: {
        width: width * 0.44, // 0.22 , 0.44// 0.66 // 0.88
    },
    nextbutton66Width: {
        width: width * 0.66, // 0.22 , 0.44// 0.66 // 0.88
    },
    nextbutton88Width: {
        width: width * 0.88, // 0.22 , 0.44// 0.66 // 0.88
    },
    nextButtonText: {
        fontFamily: 'Lora',
        fontWeight: '500',
        fontSize: 16,
        color: '#FFFFFF',
    },
    arrowIcon: {
        fontSize: width * 0.032, // Adjusted for better visibility
        color: '#FFFFFF',
        fontWeight: 'bold',
    }
});

export default WalkthroughScreen;