import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, TextInput, Image, Alert } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { useUser } from '@/app/context/UserContext';

export default function EditProfileScreen() {
	const router = useRouter();
	const { name: contextName, profileImage, updateName, updateProfileImage } = useUser();
	const [localName, setLocalName] = useState(contextName);
	const [phoneNumber, setPhoneNumber] = useState('');
	const [email, setEmail] = useState('');

	const pickImage = async () => {
		const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
		
		if (status !== 'granted') {
			Alert.alert('Sorry, we need camera roll permissions to make this work!');
			return;
		}

		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [1, 1],
			quality: 1,
		});

		if (!result.canceled) {
			updateProfileImage(result.assets[0].uri);
		}
	};

	const handleUpdateProfile = () => {
		if (!localName.trim()) {
			Alert.alert('Error', 'Please enter your full name');
			return;
		}
		if (!phoneNumber.trim()) {
			Alert.alert('Error', 'Please enter your phone number');
			return;
		}
		if (!email.trim()) {
			Alert.alert('Error', 'Please enter your email');
			return;
		}
		if (!email.includes('@') || !email.includes('.')) {
			Alert.alert('Error', 'Please enter a valid email address');
			return;
		}

		updateName(localName);
		router.back();
	};

	return (
		<ThemedView style={styles.container}>
			<View style={styles.header}>
				<TouchableOpacity onPress={() => router.back()}>
					<Ionicons name="chevron-back" size={24} color="#0066FF" />
				</TouchableOpacity>
				<ThemedText style={styles.headerTitle}>Profile</ThemedText>
				<View style={{ width: 24 }} />
			</View>

			<View style={styles.profileImageContainer}>
				<View style={styles.imageWrapper}>
					<Image 
						source={profileImage ? { uri: profileImage } : require('@/assets/images/doctor.png')}
						style={styles.profileImage}
					/>
					<TouchableOpacity style={styles.editImageButton} onPress={pickImage}>
						<Ionicons name="pencil" size={20} color="#FFFFFF" />
					</TouchableOpacity>
				</View>
			</View>

			<View style={styles.form}>
				<View style={styles.inputContainer}>
					<ThemedText style={styles.label}>Full Name *</ThemedText>
					<TextInput
						style={styles.input}
						value={localName}
						onChangeText={setLocalName}
						placeholder="Enter your full name"
					/>

				</View>

				<View style={styles.inputContainer}>
					<ThemedText style={styles.label}>Phone Number *</ThemedText>
					<TextInput
						style={styles.input}
						value={phoneNumber}
						onChangeText={setPhoneNumber}
						placeholder="Enter your phone number"
						keyboardType="phone-pad"
					/>

				</View>

				<View style={styles.inputContainer}>
					<ThemedText style={styles.label}>Email *</ThemedText>
					<TextInput
						style={styles.input}
						value={email}
						onChangeText={setEmail}
						placeholder="Enter your email"
						keyboardType="email-address"
					/>

				</View>

				<TouchableOpacity style={styles.updateButton} onPress={handleUpdateProfile}>
					<ThemedText style={styles.updateButtonText}>Update Profile</ThemedText>
				</TouchableOpacity>
			</View>
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
		justifyContent: 'space-between',
		padding: 16,
		paddingTop: 60,
	},
	headerTitle: {
		fontSize: 20,
		fontWeight: '600',
		color: '#0066FF',
	},
	profileImageContainer: {
		alignItems: 'center',
		marginTop: 20,
		marginBottom: 40,
	},
	imageWrapper: {
		position: 'relative',
	},
	profileImage: {
		width: 120,
		height: 120,
		borderRadius: 60,
		backgroundColor: '#E8EEF4',
	},
	editImageButton: {
		position: 'absolute',
		bottom: 0,
		right: 0,
		backgroundColor: '#0066FF',
		width: 36,
		height: 36,
		borderRadius: 18,
		justifyContent: 'center',
		alignItems: 'center',
	},
	form: {
		padding: 16,
	},
	inputContainer: {
		marginBottom: 24,
	},
	label: {
		fontSize: 18,
		marginBottom: 8,
		fontWeight: '600',
		color: '#000000',
	},
	input: {
		backgroundColor: '#F5F8FF',
		padding: 16,
		borderRadius: 12,
		fontSize: 16,
	},
	updateButton: {
		backgroundColor: '#0066FF',
		padding: 16,
		borderRadius: 30,
		alignItems: 'center',
		marginTop: 20,
	},
	updateButtonText: {
		color: '#FFFFFF',
		fontSize: 18,
		fontWeight: '600',
	},
});