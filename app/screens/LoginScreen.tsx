import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, TextInput, Image, Alert } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useRouter } from 'expo-router';
import auth from '../utils/auth';

export default function LoginScreen() {
    const router = useRouter();
    const [studentId, setStudentId] = useState('');
    const [pin, setPin] = useState('');

    const handleLogin = () => {
        if (!studentId.trim() || !pin.trim()) {
            Alert.alert('Error', 'Please enter both Student ID and PIN');
            return;
        }

        const numericStudentId = parseInt(studentId, 10);
        const numericPin = parseInt(pin, 10);

        if (isNaN(numericStudentId) || isNaN(numericPin)) {
            Alert.alert('Error', 'Please enter valid numeric values');
            return;
        }

        if (auth.authenticateUser(numericStudentId, numericPin)) {
            router.replace('/(tabs)');
        } else {
            Alert.alert('Error', 'Invalid Student ID or PIN');
        }
    };

    return (
        <ThemedView style={styles.container}>
            <View style={styles.logoContainer}>
                <Image
                    source={require('@/assets/images/ug logo 1.png')}
                    style={styles.logo}
                />
                <ThemedText style={styles.clinicText}>UG | CLINIC</ThemedText>
            </View>

            <View style={styles.formContainer}>
                <View style={styles.inputContainer}>
                    <ThemedText style={styles.label}>Student ID</ThemedText>
                    <TextInput
                        style={styles.input}
                        value={studentId}
                        onChangeText={setStudentId}
                        placeholder="Enter your student ID"
                        autoCapitalize="none"
                    />
                </View>

                <View style={styles.inputContainer}>
                    <ThemedText style={styles.label}>Pin</ThemedText>
                    <TextInput
                        style={styles.input}
                        value={pin}
                        onChangeText={setPin}
                        placeholder="Enter your PIN"
                        secureTextEntry
                        keyboardType="numeric"

                    />
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
        marginBottom: 50,
    },
    logo: {
        width: 80,
        height: 80,
        resizeMode: 'contain',
    },
    clinicText: {
        color:"#fffff",
        fontSize: 28,
        fontWeight: '500',
        letterSpacing: 1,
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
        marginBottom: 12,
        color: '#000000',
    },
    input: {
        backgroundColor: '#F5F6FA',
        padding: 18,
        borderRadius: 12,
        fontSize: 16,
        width: '100%',
    },
    loginButton: {
        backgroundColor: '#4285F4',
        padding: 18,
        borderRadius: 30,
        alignItems: 'center',
        marginTop: 25,
        width: '100%',
    },
    loginButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '600',
    },
});

