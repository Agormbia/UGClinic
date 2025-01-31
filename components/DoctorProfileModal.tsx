import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';

type DoctorProfileModalProps = {
	isVisible: boolean;
	onClose: () => void;
	doctor: {
		name: string;
		role: string;
		email: string;
	};
};

export function DoctorProfileModal({ isVisible, onClose, doctor }: DoctorProfileModalProps) {
	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={isVisible}
			onRequestClose={onClose}
		>
			<View style={styles.modalOverlay}>
				<ThemedView style={styles.modalContent}>
					<View style={styles.header}>
						<ThemedText style={styles.title}>Doctor Profile</ThemedText>
						<TouchableOpacity onPress={onClose}>
							<Ionicons name="close" size={24} color="#4285F4" />
						</TouchableOpacity>
					</View>
					
					<View style={styles.profileIcon}>
						<Ionicons name="person-circle" size={80} color="#4285F4" />
					</View>
					
					<View style={styles.infoContainer}>
						<ThemedText style={styles.doctorName}>{doctor.name}</ThemedText>
						<ThemedText style={styles.role}>{doctor.role}</ThemedText>
						<View style={styles.emailContainer}>
							<Ionicons name="mail-outline" size={20} color="#666" />
							<ThemedText style={styles.email}>{doctor.email}</ThemedText>
						</View>
					</View>
				</ThemedView>
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	modalOverlay: {
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		justifyContent: 'center',
		alignItems: 'center',
	},
	modalContent: {
		width: '80%',
		backgroundColor: '#FFFFFF',
		borderRadius: 20,
		padding: 20,
		alignItems: 'center',
	},
	header: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 20,
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
		color: '#4285F4',
	},
	profileIcon: {
		marginBottom: 20,
	},
	infoContainer: {
		width: '100%',
		alignItems: 'center',
	},
	doctorName: {
		fontSize: 24,
		fontWeight: 'bold',
		color: '#000000',
		marginBottom: 8,
	},
	role: {
		fontSize: 16,
		color: '#000000',
		marginBottom: 16,
	},
	emailContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
	email: {
		fontSize: 16,
		color: '#4285F4',
	},
});