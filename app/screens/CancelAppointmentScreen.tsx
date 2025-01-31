import { StyleSheet, TouchableOpacity, View, TextInput } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState } from 'react';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

type CancellationReason = 'Rescheduling' | 'Weather Conditions' | 'Unexpected Work' | 'Others';

export default function CancelAppointmentScreen() {
	const [selectedReason, setSelectedReason] = useState<CancellationReason | null>(null);
	const [customReason, setCustomReason] = useState('');

	const reasons: CancellationReason[] = ['Rescheduling', 'Weather Conditions', 'Unexpected Work', 'Others'];

	return (
		<ThemedView style={styles.container}>
			<View style={styles.header}>
				<TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
					<Ionicons name="chevron-back" size={24} color="#4285F4" />
				</TouchableOpacity>
				<ThemedText style={styles.title}>Cancel Appointment</ThemedText>
			</View>

			<ThemedText style={styles.description}>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
			</ThemedText>

			{reasons.map((reason) => (
				<TouchableOpacity
					key={reason}
					style={[
						styles.reasonButton,
						selectedReason === reason && styles.selectedReason,
					]}
					onPress={() => setSelectedReason(reason)}
				>
					<View style={[styles.radioButton, selectedReason === reason && styles.radioButtonSelected]} />
					<ThemedText style={styles.reasonText}>{reason}</ThemedText>
				</TouchableOpacity>
			))}

			<ThemedText style={[styles.description, styles.secondaryText]}>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
			</ThemedText>

			<View style={styles.textInputContainer}>
				<TextInput
					style={styles.textInput}
					placeholder="Enter Your Reason Here..."
					placeholderTextColor="#4285F4"
					value={customReason}
					onChangeText={setCustomReason}
					multiline
				/>
			</View>

			<TouchableOpacity style={styles.cancelButton}>
				<ThemedText style={styles.cancelButtonText}>Cancel Appointment</ThemedText>
			</TouchableOpacity>
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFFFFF',
		padding: 20,
		paddingTop: 60, // Add padding top for status bar
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 20,
	},
	backButton: {
		padding: 8,
	},

	title: {
		fontSize: 24,
		fontWeight: 'bold',
		color: '#4285F4',
		marginLeft: 8,
	},
	description: {
		fontSize: 16,
		color: '#000000',
		marginBottom: 30,
		lineHeight: 24,
	},
	secondaryText: {
		color: '#4285F4',
		marginTop: 20,
	},
	reasonButton: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 15,
		backgroundColor: '#F8F9FA',
		borderRadius: 10,
		marginBottom: 10,
	},
	selectedReason: {
		backgroundColor: '#E8F1FF',
	},
	radioButton: {
		width: 24,
		height: 24,
		borderRadius: 12,
		borderWidth: 2,
		borderColor: '#4285F4',
		marginRight: 10,
		justifyContent: 'center',
		alignItems: 'center',
	},
	radioButtonSelected: {
		backgroundColor: '#4285F4',
	},
	reasonText: {
		fontSize: 16,
		color: '#4285F4',
	},
	textInputContainer: {
		backgroundColor: '#E8F1FF',
		borderRadius: 15,
		padding: 15,
		minHeight: 150,
		marginTop: 20,
	},
	textInput: {
		fontSize: 16,
		color: '#4285F4',
	},
	cancelButton: {
		backgroundColor: '#4285F4',
		padding: 15,
		borderRadius: 30,
		alignItems: 'center',
		position: 'absolute',
		bottom: 30,
		left: 20,
		right: 20,
	},
	cancelButtonText: {
		color: '#FFFFFF',
		fontSize: 18,
		fontWeight: 'bold',
	},
});