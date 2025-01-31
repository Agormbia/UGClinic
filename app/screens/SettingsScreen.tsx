import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, TextInput, Pressable } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function SettingsScreen() {
	const router = useRouter();
	const [currentPin, setCurrentPin] = useState('');
	const [newPin, setNewPin] = useState('');
	const [confirmPin, setConfirmPin] = useState('');
	const [showCurrentPin, setShowCurrentPin] = useState(false);
	const [showNewPin, setShowNewPin] = useState(false);
	const [showConfirmPin, setShowConfirmPin] = useState(false);

	return (
		<ThemedView style={styles.container}>
			<View style={styles.header}>
				<TouchableOpacity onPress={() => router.back()}>
					<Ionicons name="chevron-back" size={24} color="#0066FF" />
				</TouchableOpacity>
				<ThemedText style={styles.headerTitle}>Password Manager</ThemedText>
			</View>

			<View style={styles.content}>
				<View style={styles.inputSection}>
					<ThemedText style={styles.label}>Current Pin</ThemedText>
					<View style={styles.inputContainer}>
						<TextInput
							style={styles.input}
							value={currentPin}
							onChangeText={setCurrentPin}
							secureTextEntry={!showCurrentPin}
							keyboardType="numeric"
							maxLength={12}
							placeholder=""
							placeholderTextColor="#0066FF"
						/>
						<Pressable onPress={() => setShowCurrentPin(!showCurrentPin)}>
							<Ionicons name={showCurrentPin ? "eye-off" : "eye"} size={24} color="#0066FF" />
						</Pressable>
					</View>
				</View>

				<Pressable style={styles.forgotPin}>
					<ThemedText style={styles.forgotPinText}>Forgot Pin?</ThemedText>
				</Pressable>

				<View style={styles.inputSection}>
					<ThemedText style={styles.label}>New Pin</ThemedText>
					<View style={styles.inputContainer}>
						<TextInput
							style={styles.input}
							value={newPin}
							onChangeText={setNewPin}
							secureTextEntry={!showNewPin}
							keyboardType="numeric"
							maxLength={12}
							placeholder=""
							placeholderTextColor="#0066FF"
						/>
						<Pressable onPress={() => setShowNewPin(!showNewPin)}>
							<Ionicons name={showNewPin ? "eye-off" : "eye"} size={24} color="#0066FF" />
						</Pressable>
					</View>
				</View>

				<View style={styles.inputSection}>
					<ThemedText style={styles.label}>Confirm New Pin</ThemedText>
					<View style={styles.inputContainer}>
						<TextInput
							style={styles.input}
							value={confirmPin}
							onChangeText={setConfirmPin}
							secureTextEntry={!showConfirmPin}
							keyboardType="numeric"
							maxLength={12}
							placeholder=""
							placeholderTextColor="#0066FF"
						/>
						<Pressable onPress={() => setShowConfirmPin(!showConfirmPin)}>
							<Ionicons name={showConfirmPin ? "eye-off" : "eye"} size={24} color="#0066FF" />
						</Pressable>
					</View>
				</View>
			</View>

			<TouchableOpacity style={styles.changeButton}>
				<ThemedText style={styles.changeButtonText}>Change Password</ThemedText>
			</TouchableOpacity>
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFFFFF',
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 16,
		paddingTop: 60,
		paddingBottom: 20,
	},
	headerTitle: {
		fontSize: 24,
		fontWeight: '600',
		color: '#0066FF',
		marginLeft: 8,
	},
	content: {
		flex: 1,
		paddingHorizontal: 16,
		paddingTop: 20,
		
	},
	inputSection: {
		marginBottom: 24,
	},
	label: {
		fontSize: 18,
		fontWeight: '600',
		marginBottom: 8,
		color:"#000000",
	},
	inputContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#F0F5FF',
		borderRadius: 12,
		paddingHorizontal: 16,
		height: 56,
	},
	input: {
		flex: 1,
		fontSize: 16,
		color: '#0066FF',
	},
	forgotPin: {
		alignSelf: 'flex-end',
		marginBottom: 24,
	},
	forgotPinText: {
		color: '#0066FF',
		fontSize: 16,
	},
	changeButton: {
		backgroundColor: '#0066FF',
		borderRadius: 30,
		height: 56,
		marginHorizontal: 16,
		marginBottom: 32,
		justifyContent: 'center',
		alignItems: 'center',
	},
	changeButtonText: {
		color: '#FFFFFF',
		fontSize: 18,
		fontWeight: '600',
	},
});