import { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View, TextInput, Image, Alert } from 'react-native';
import { useUser } from '../context/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useRouter } from 'expo-router';
import auth from '../utils/auth';

export default function LoginScreen() {
    const router = useRouter();
    const { setStudentId, setStudentName } = useUser();
    const [rememberMe, setRememberMe] = useState(false);
    const [localStudentId, setLocalStudentId] = useState('');
    const [pin, setPin] = useState('');

    useEffect(() => {
        loadStoredCredentials();
    }, []);

    const loadStoredCredentials = async () => {
        try {
            const storedStudentId = await AsyncStorage.getItem('studentId');
            const storedPin = await AsyncStorage.getItem('pin');
            if (storedStudentId && storedPin) {
                setLocalStudentId(storedStudentId);
                setPin(storedPin);
                setRememberMe(true);
            }
        } catch (error) {
            console.error('Error loading stored credentials:', error);
        }
    };

    const handleLogin = async () => {
        if (!localStudentId.trim() || !pin.trim()) {
            Alert.alert('Error', 'Please enter both Student ID and PIN');
            return;
        }

        const numericStudentId = parseInt(localStudentId, 10);
        const numericPin = parseInt(pin, 10);

        if (isNaN(numericStudentId) || isNaN(numericPin)) {
            Alert.alert('Error', 'Please enter valid numeric values');
            return;
        }

        const authResponse = auth.authenticateUser(numericStudentId, numericPin);
        if (authResponse.success) {
            if (rememberMe) {
                try {
                    await AsyncStorage.setItem('studentId', localStudentId);
                    await AsyncStorage.setItem('pin', pin);
                } catch (error) {
                    console.error('Error storing credentials:', error);
                }
            } else {
                try {
                    await AsyncStorage.removeItem('studentId');
                    await AsyncStorage.removeItem('pin');
                } catch (error) {
                    console.error('Error removing credentials:', error);
                }
            }
            setStudentId(localStudentId);
            setStudentName(authResponse.studentName || '');
            router.replace('/(tabs)');
        } else {
            Alert.alert('Error', 'Invalid Student ID or PIN');
        }
    };

    return (
        <ThemedView style={styles.container}>
            <View style={styles.logoContainer}>
                <View style={styles.logoWrapper}>
                    <Image
                        source={require('@/assets/images/ug logo 1.png')}
                        style={styles.logo}
                    />
                    <View style={styles.textContainer}>
                        <ThemedText style={styles.clinicText}>UG | CLINIC</ThemedText>
                        <ThemedText style={styles.subText}>INTEGRI PROCEDAMUS</ThemedText>
                    </View>
                </View>
            </View>

            <View style={styles.formContainer}>
                <View style={styles.inputContainer}>
                    <ThemedText style={styles.label}>Student ID</ThemedText>
                    <TextInput
                        style={styles.input}
                        value={localStudentId}
                        onChangeText={setLocalStudentId}
                        keyboardType="number-pad"
                        placeholder="Enter your student ID"
                        autoCapitalize="none"
                    />
                </View>

                <View style={styles.inputContainer}>
                    <ThemedText style={styles.label}>Pin</ThemedText>
                    <TextInput
                        style={[styles.input, styles.pinInput]}
                        value={pin}
                        onChangeText={(text) => {
                            const numericText = text.replace(/[^0-9]/g, '');
                            setPin(numericText);
                        }}
                        placeholder="Enter PIN"
                        placeholderTextColor="#999"
                        secureTextEntry={true}
                        keyboardType="number-pad"
                        maxLength={6}
                        autoCapitalize="none"
                        autoCorrect={false}
                        caretHidden={true}
                        showSoftInputOnFocus={true}
                    />



                </View>

                <View style={styles.rememberMeContainer}>
                    <TouchableOpacity 
                        style={styles.checkbox}
                        onPress={() => setRememberMe(!rememberMe)}
                    >
                        <Ionicons 
                            name={rememberMe ? "checkbox" : "square-outline"} 
                            size={24} 
                            color={rememberMe ? "#4285F4" : "#999"}
                        />
                    </TouchableOpacity>
                    <ThemedText style={styles.rememberMeText}>Remember Me</ThemedText>
                </View>

                <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                    <ThemedText style={styles.loginButtonText}>Log In</ThemedText>
                </TouchableOpacity>
            </View>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        padding: 20,
        justifyContent: 'center',
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 60,
        paddingHorizontal: 20,
    },
    logoWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 22,
    },
    logo: {
        width: 115,
        height: 115,
        resizeMode: 'contain',
    },
    textContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    clinicText: {
        color: "#000000",
        fontSize: 24,
        fontWeight: '700',
        letterSpacing: 1,
        marginBottom: 0,
    },
    subText: {
        color: "#4A4A4A",
        fontSize: 10,
        fontWeight: '500',
        letterSpacing: 2,
        
    },


    formContainer: {
        paddingHorizontal: 20,
        width: '100%',
        alignItems: 'center',
    },
    inputContainer: {
        marginBottom: 35,
        width: '100%',
    },
    label: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 10,
        color: '#000000',
    },
    input: {
        backgroundColor: '#F5F6FA',
        padding: 18,
        borderRadius: 12,
        fontSize: 16,
        width: '100%',
        color: '#000000',
    },
    loginButton: {
        backgroundColor: '#4285F4',
        padding: 18,
        borderRadius: 30,
        alignItems: 'center',
        marginTop: 30,
        width: '100%',
    },
    loginButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '600',
    },
    pinInput: {
        fontSize: 16,
    },
    rememberMeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        marginTop:-20,
        width: '100%',
    },
    checkbox: {
        marginRight: 10,
    },
    rememberMeText: {
        fontSize: 16,
        color: '#4A4A4A',
    },


});