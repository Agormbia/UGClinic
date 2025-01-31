import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, ScrollView, TextInput, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { BookingSuccess } from '@/components/BookingSuccess';
import { Svg, Path } from 'react-native-svg';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useAppointments } from '@/app/context/AppointmentContext';

const timeSlots = [
	'10:30am - 11:30am',
	'11:30am - 12:30pm',
	'12:30pm - 1:30pm',
	'2:30pm - 3:30pm',
	'3:30pm - 4:30pm',
	'4:30pm - 5:30pm',
];

export default function BookAppointmentScreen() {
	const router = useRouter();
	const params = useLocalSearchParams();
	const { addAppointment } = useAppointments();
	const [date, setDate] = useState(new Date());
	const [selectedTime, setSelectedTime] = useState('');
	const [comment, setComment] = useState('');
	const [showSuccess, setShowSuccess] = useState(false);
	const [showDatePicker, setShowDatePicker] = useState(false);

	const handleDateChange = (event: any, selectedDate?: Date) => {
		setShowDatePicker(false);
		if (selectedDate) {
			setDate(selectedDate);
		}
	};


	const formatDate = (date: Date) => {
		return date.toLocaleDateString('en-GB');
	};

	const handleBooking = () => {
		if (!selectedTime) return;
		
		const doctorName = Array.isArray(params.doctorName) ? params.doctorName[0] : params.doctorName;
		const specialty = Array.isArray(params.specialty) ? params.specialty[0] : params.specialty;
		
		addAppointment({
			doctor: doctorName || '',
			specialty: specialty || '',
			date: formatDate(date),
			time: selectedTime,
		}, params.oldAppointmentId ? parseInt(Array.isArray(params.oldAppointmentId) ? params.oldAppointmentId[0] : params.oldAppointmentId) : undefined);

		setShowSuccess(true);
	};

	const handleAnimationComplete = () => {
		setShowSuccess(false);
		router.back();
	};

	return (
		<ThemedView style={styles.container}>
			{showSuccess && <BookingSuccess onAnimationComplete={handleAnimationComplete} />}
			<View style={styles.header}>
				<TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
					<Ionicons name="chevron-back" size={24} color="#FFFFFF" />
				</TouchableOpacity>
				<ThemedText style={styles.headerTitle}>Book an Appointment</ThemedText>
			</View>

			<View style={styles.heartbeatBackground}>
				<Svg width="100%" height="100%" viewBox="0 0 400 100">
					<Path
						d="M0,50 L80,50 L100,20 L120,80 L140,20 L160,80 L180,20 L200,50 L400,50"
						stroke="#FFFFFF"
						strokeWidth="3"
						fill="none"
						opacity={0.2}
					/>
					<Path
						d="M0,70 L80,70 L100,40 L120,100 L140,40 L160,100 L180,40 L200,70 L400,70"
						stroke="#FFFFFF"
						strokeWidth="2"
						fill="none"
						opacity={0.1}
					/>
					<Path
						d="M0,30 L80,30 L100,0 L120,60 L140,0 L160,60 L180,0 L200,30 L400,30"
						stroke="#FFFFFF"
						strokeWidth="2"
						fill="none"
						opacity={0.1}
					/>
				</Svg>
			</View>

			<ScrollView style={styles.content}>
				<View style={styles.doctorInfo}>
					<ThemedText style={styles.doctorName}>{params.doctorName || '[Name of Doctor]'}</ThemedText>
					<ThemedText style={styles.specialty}>{params.specialty || '[Specialty]'}</ThemedText>
					<View style={styles.timeInfo}>
						<Ionicons name="time-outline" size={20} color="#000000" />
						<ThemedText style={styles.workingHours}>10:30am - 5:30pm</ThemedText>
					</View>
				</View>

				<View style={styles.section}>
					<ThemedText style={styles.sectionTitle}>Select Date</ThemedText>
					<TouchableOpacity 
						style={styles.dateButton}
						onPress={() => setShowDatePicker(true)}
					>
						<ThemedText>{formatDate(date)}</ThemedText>
						<Ionicons name="calendar" size={20} color="#000000" />
					</TouchableOpacity>
					{showDatePicker && (
						<DateTimePicker
							value={date}
							mode="date"
							display="default"
							onChange={handleDateChange}
							minimumDate={new Date()}
						/>
					)}
				</View>

				<View style={styles.section}>
					<ThemedText style={styles.sectionTitle}>Schedules</ThemedText>
					<View style={styles.timeSlots}>
						{timeSlots.map((time, index) => (
							<TouchableOpacity
								key={index}
								style={[
									styles.timeSlot,
									selectedTime === time && styles.selectedTimeSlot,
								]}
								onPress={() => setSelectedTime(time)}
							>
								<ThemedText style={[
									styles.timeSlotText,
									selectedTime === time && styles.selectedTimeSlotText,
								]}>
									{time}
								</ThemedText>
							</TouchableOpacity>
						))}
					</View>
				</View>

				<View style={styles.section}>
					<ThemedText style={styles.sectionTitle}>Comment</ThemedText>
					<TextInput
						style={styles.commentInput}
						placeholder="Add your comment here"
						multiline
						numberOfLines={4}
						value={comment}
						onChangeText={setComment}
					/>
				</View>
			</ScrollView>

			<TouchableOpacity style={styles.bookButton} onPress={handleBooking}>
				<ThemedText style={styles.bookButtonText}>Book Appointment</ThemedText>
			</TouchableOpacity>
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#4285F4',
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
		color: '#FFFFFF',
		marginLeft: 8,
	},
	heartbeatBackground: {
		height: 150,
		backgroundColor: 'transparent',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 20,
	},
	content: {
		flex: 1,
		backgroundColor: '#FFFFFF',
		borderTopLeftRadius: 30,
		borderTopRightRadius: 30,
		padding: 20,
	},
	doctorInfo: {
		marginBottom: 30,
	},
	doctorName: {
		fontSize: 24,
		fontWeight: '600',
		marginBottom: 4,
	},
	specialty: {
		fontSize: 16,
		color: '#000000',
		marginBottom: 8,
	},
	timeInfo: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	workingHours: {
		marginLeft: 8,
		color: '#000000',
	},
	section: {
		marginBottom: 24,
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: '600',
		marginBottom: 16,
	},
	dateButton: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 12,
		backgroundColor: '#F5F5F5',
		borderRadius: 8,
		marginBottom: 16,
	},

	timeSlots: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 12,
	},
	timeSlot: {
		width: '47%',
		padding: 12,
		backgroundColor: '#F5F5F5',
		borderRadius: 8,
		alignItems: 'center',
	},
	selectedTimeSlot: {
		backgroundColor: '#4285F4',
	},
	timeSlotText: {
		color: '#000000',
	},
	selectedTimeSlotText: {
		color: '#FFFFFF',
	},
	commentInput: {
		backgroundColor: '#F5F5F5',
		borderRadius: 8,
		padding: 12,
		height: 100,
		textAlignVertical: 'top',
	},
	bookButton: {
		backgroundColor: '#3B82F6',
		width: '80%',
		alignSelf: 'center',
		margin: 20,
		padding: 18,
		borderRadius: 50,
		alignItems: 'center',
		elevation: 2,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
	},
	bookButtonText: {
		color: '#FFFFFF',
		fontSize: 18,
		fontWeight: '600',
		letterSpacing: 0.5,
	},
});