import React from 'react';
import { StyleSheet, TouchableOpacity, View, Image, ScrollView, SafeAreaView } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

type Doctor = {
	id: string;
	name: string;
	specialty: string;
	image: any;
};

const doctors: Doctor[] = [
	{ id: '1', name: 'Ernest Wilson', specialty: 'Radiologist', image: require('../../assets/images/female.png') },
	{ id: '2', name: 'Saed Raji', specialty: 'Doctor', image: require('../../assets/images/male.png') },
	{ id: '3', name: 'Angela Adamtey', specialty: 'Hematologist', image: require('../../assets/images/female.png') },
	{ id: '4', name: 'Jessica Appiah', specialty: 'Pediatrician', image: require('../../assets/images/female.png') },
	{ id: '5', name: 'Prince Boateng', specialty: 'Dentist', image: require('../../assets/images/male.png') },
	{ id: '6', name: 'David Sefah', specialty: 'Lab Technician', image: require('../../assets/images/male.png') },
];

export default function ChatScreen() {
	const router = useRouter();

	const handleCall = (doctor: Doctor) => {
		// Implement call functionality
		console.log(`Calling ${doctor.name}`);
	};

	const handleChat = (doctor: Doctor) => {
		router.push({
			pathname: '/screens/DoctorChatScreen',
			params: {
				doctorName: doctor.name,
			},
		});
	};

	return (
		<SafeAreaView style={styles.safeArea}>
			<ThemedView style={styles.container}>
				<View style={styles.header}>
				<TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
					<Ionicons name="chevron-back" size={24} color="#4285F4" />
				</TouchableOpacity>
				<ThemedText style={styles.headerTitle}>Chat</ThemedText>
			</View>

			<ScrollView 
				style={styles.doctorList}
				contentContainerStyle={styles.scrollContent}
			>
				{doctors.map((doctor) => (
					<View key={doctor.id} style={styles.doctorItem}>
						<View style={styles.doctorInfo}>
							<Image source={doctor.image} style={styles.doctorImage} />
							<View style={styles.doctorDetails}>
								<ThemedText style={styles.doctorName}>{doctor.name}</ThemedText>
								<ThemedText style={styles.doctorSpecialty}>{doctor.specialty}</ThemedText>
							</View>
						</View>
						<View style={styles.actions}>
							<TouchableOpacity 
								style={styles.actionButton} 
								onPress={() => handleCall(doctor)}
							>
								<Ionicons name="call-outline" size={24} color="#4285F4" />
							</TouchableOpacity>
							<TouchableOpacity 
								style={styles.actionButton}
								onPress={() => handleChat(doctor)}
							>
								<Ionicons name="chatbubble-outline" size={24} color="#4285F4" />
							</TouchableOpacity>
						</View>
					</View>
				))}
			</ScrollView>
			</ThemedView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: '#F8F9FA',
	},
	container: {
		flex: 1,
		backgroundColor: '#F8F9FA',
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 16,
		paddingTop: 60,
	},
	backButton: {
		padding: 8,
	},
	headerTitle: {
		fontSize: 24,
		fontWeight: '600',
		color: '#4285F4',
		marginLeft: 8,
	},
	doctorList: {
		flex: 1,
		padding: 16,
		
	},
	scrollContent: {
		paddingBottom: 100,
	},
	doctorItem: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		backgroundColor: '#FFFFFF',
		padding: 16,
		borderRadius: 12,
		marginBottom: 12,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.05,
		shadowRadius: 2,
		elevation: 2,
	},
	doctorInfo: {
		flexDirection: 'row',
		alignItems: 'center',
		flex: 1,
		
	},
	doctorImage: {
		width: 50,
		height: 50,
		borderRadius: 25,
		backgroundColor: '#E0E0E0',
	},
	doctorDetails: {
		marginLeft: 12,
		flex: 1,
	},
	doctorName: {
		fontSize: 16,
		fontWeight: '600',
		color:"#000000",
	},
	doctorSpecialty: {
		fontSize: 14,
		
		marginTop: 2,
	},
	actions: {
		flexDirection: 'row',
		gap: 12,
	},
	actionButton: {
		padding: 8,
	},
});