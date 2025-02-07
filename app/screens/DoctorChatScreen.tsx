import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, TextInput, ScrollView } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { DoctorProfileModal } from '@/components/DoctorProfileModal';

type Message = {
	id: string;
	text: string;
	isUser: boolean;
	timestamp: string;
};





export default function DoctorChatScreen() {
	const router = useRouter();
	const params = useLocalSearchParams();
	const [message, setMessage] = useState('');
	const [isProfileModalVisible, setIsProfileModalVisible] = useState(false);

	const doctorInfo = {
		name: params.doctorName?.toString() || '[Name of Doctor]',
		role: params.specialty?.toString() || 'Specialist',
		email: `${params.doctorName?.toString().toLowerCase().replace(/\s+/g, '.')}@ugclinic.com` || 'doctor@ugclinic.com'
	};

	return (
		<ThemedView style={styles.container}>
			<View style={styles.header}>
				<TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
					<Ionicons name="chevron-back" size={24} color="#FFFFFF" />
				</TouchableOpacity>
				<ThemedText style={styles.headerTitle}>{params.doctorName || '[Name of Doctor]'}</ThemedText>
				<View style={styles.headerActions}>
					<TouchableOpacity style={styles.headerButton}>
						<Ionicons name="call" size={24} color="#FFFFFF" />
					</TouchableOpacity>
					<TouchableOpacity 
						style={styles.headerButton}
						onPress={() => setIsProfileModalVisible(true)}
					>
						<Ionicons name="person-circle-outline" size={24} color="#FFFFFF" />
					</TouchableOpacity>
				</View>
			</View>

			<ScrollView style={styles.chatContainer} />


			<View style={styles.inputContainer}>
				<TouchableOpacity style={styles.attachButton}>
					<Ionicons name="attach" size={24} color="#4285F4" />
				</TouchableOpacity>
				<TextInput
					style={styles.input}
					placeholder="Write Here..."
					value={message}
					onChangeText={setMessage}
					multiline
				/>
				<TouchableOpacity style={styles.micButton}>
					<Ionicons name="mic" size={24} color="#4285F4" />
				</TouchableOpacity>
				<TouchableOpacity style={styles.sendButton}>
					<Ionicons name="send" size={24} color="#FFFFFF" />
				</TouchableOpacity>
			</View>

			<DoctorProfileModal
				isVisible={isProfileModalVisible}
				onClose={() => setIsProfileModalVisible(false)}
				doctor={doctorInfo}
			/>
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F8F9FA',
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: 16,
		paddingTop: 60,
		backgroundColor: '#4285F4',
	},
	backButton: {
		padding: 8,
	},
	headerTitle: {
		fontSize: 20,
		fontWeight: '600',
		color: '#FFFFFF',
	},
	headerActions: {
		flexDirection: 'row',
		gap: 16,
	},
	headerButton: {
		padding: 8,
	},
	chatContainer: {
		flex: 1,
		padding: 16,
		backgroundColor: '#FFFFFF',
	},
	inputContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 12,
		backgroundColor: '#F5F5F5',
		borderTopWidth: 1,
		borderTopColor: '#E0E0E0',
	},
	attachButton: {
		padding: 8,
	},
	input: {
		flex: 1,
		backgroundColor: '#FFFFFF',
		borderRadius: 25,
		paddingHorizontal: 16,
		paddingVertical: 8,
		marginHorizontal: 8,
		maxHeight: 100,
		fontSize: 16,
	},
	micButton: {
		padding: 8,
	},
	sendButton: {
		padding: 8,
		backgroundColor: '#4285F4',
		borderRadius: 25,
		width: 40,
		height: 40,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
