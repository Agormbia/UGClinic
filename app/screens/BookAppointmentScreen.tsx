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
						d="M0,50 L100,50 L130,20 L160,80 L190,20 L220,80 L250,20 L280,50 L400,50"
						stroke="#FFFFFF"
						strokeWidth="5"
						fill="none"
						opacity={0.4}
					/>
				</Svg>
			</View>


			<ScrollView style={styles.content}>
				<View style={styles.contentContainer}>
				<View style={styles.doctorInfo}>
					<ThemedText style={styles.doctorName}>{params.doctorName || '[Name of Doctor]'}</ThemedText>
					<ThemedText style={styles.specialty}>{params.specialty || '[Specialty]'}</ThemedText>
					<View style={styles.timeInfo}>
						<Ionicons name="time-outline" size={18} color="#4A4A4A" />
						<ThemedText style={styles.workingHours}>10:30am - 5:30pm</ThemedText>
					</View>
				</View>

				<View style={styles.section}>
                    <ThemedText style={styles.sectionTitle}>Select Date</ThemedText>
                    <TouchableOpacity style={styles.dateField} onPress={() => setShowDatePicker(true)}>
                        <ThemedText style={styles.dateText}>{formatDate(date)}</ThemedText>
                        <Ionicons name="calendar-outline" size={20} color="#4A4A4A" />
                    </TouchableOpacity>
                    {Platform.OS === 'ios' ? (
                        showDatePicker && (
                            <DateTimePicker
                                value={date}
                                mode="date"
                                display="default"
                                onChange={handleDateChange}
                                minimumDate={new Date()}
                            />
                        )
                    ) : (
                        showDatePicker && (
                            <DateTimePicker
                                value={date}
                                mode="date"
                                display="default"
                                onChange={handleDateChange}
                                minimumDate={new Date()}
                            />
                        )
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
		height: 180,
		backgroundColor: 'transparent',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 30,
	},
	content: {
		flex: 1,
		backgroundColor: '#FFFFFF',
		borderTopLeftRadius: 30,
		borderTopRightRadius: 30,
	},
	contentContainer: {
		padding: 24,
		paddingTop: 30,
	},
	doctorInfo: {
		marginBottom: 40,
	},
	doctorName: {
		fontSize: 24,
		fontWeight: '600',
		color: '#1A1A1A',
		marginBottom: 8,
	},
	specialty: {
		fontSize: 16,
		color: '#4A4A4A',
		marginBottom: 12,
	},
	timeInfo: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
	workingHours: {
		fontSize: 14,
		color: '#4A4A4A',
	},
	section: {
		marginBottom: 36,
	},
	sectionTitle: {
		fontSize: 20,
		fontWeight: '600',
		color: '#1A1A1A',
		marginBottom: 16,
	},
	dateField: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 16,
		backgroundColor: '#F8F9FA',
		borderRadius: 12,
		marginBottom: 16,
	},
	dateText: {
		fontSize: 16,
		color: '#4A4A4A',
	},


	timeSlots: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
		rowGap: 16,
	},
	timeSlot: {
		width: '48%',
		paddingVertical: 18,
		backgroundColor: '#F8F9FA',
		borderRadius: 12,
		alignItems: 'center',
	},
	timeSlotText: {
		fontSize: 15,
		color: '#4A4A4A',
		fontWeight: '500',
	},
	selectedTimeSlot: {
		backgroundColor: '#4285F4',
	},
	selectedTimeSlotText: {
		color: '#FFFFFF',
		fontWeight: '600',
	},
	commentInput: {
		backgroundColor: '#F8F9FA',
		borderRadius: 12,
		padding: 16,
		height: 120,
		textAlignVertical: 'top',
		fontSize: 16,
		color: '#4A4A4A',
	},
	bookButton: {
		backgroundColor: '#4285F4',
		marginHorizontal: 5,
		marginVertical: 10,
		padding: 10,
		borderRadius: 30,
		alignItems: 'center',
	},
	bookButtonText: {
		color: '#FFFFFF',
		fontSize: 18,
		fontWeight: '600',
		letterSpacing: 0.5,
	},
});