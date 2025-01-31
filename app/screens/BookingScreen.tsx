import { Image, StyleSheet, TouchableOpacity, View, ScrollView, SafeAreaView } from 'react-native';
import { router } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState } from 'react';
import { useAppointments } from '@/app/context/AppointmentContext';

type TabType = 'Complete' | 'Upcoming' | 'Cancelled';

export default function BookingScreen() {
	const [activeTab, setActiveTab] = useState<TabType>('Upcoming');
	const { appointments, cancelAppointment } = useAppointments();

	const filteredAppointments = appointments.filter(app => {
		if (activeTab === 'Complete') return app.status === 'complete';
		if (activeTab === 'Upcoming') return app.status === 'upcoming';
		return app.status === 'cancelled';
	});

	const handleCancel = (id: number) => {
		router.push({
			pathname: '/cancel',
			params: { appointmentId: id.toString() }
		});
	};



	const handleRebook = (appointment: typeof appointments[0]) => {
		router.push({
			pathname: '/screens/BookAppointmentScreen',
			params: {
				doctorName: appointment.doctor,
				specialty: appointment.specialty,
				oldAppointmentId: appointment.id.toString(),
			},
		});
	};

	const renderAppointmentCard = (appointment: typeof appointments[0]) => {
		if (activeTab === 'Complete') {
			return (
				<ThemedView key={appointment.id} style={[styles.appointmentCard, styles.completeCard]}>
					<View style={styles.doctorInfo}>
						<Image
							source={require('@/assets/images/doctor.png')}
							style={styles.doctorAvatar}
						/>
						<View>
							<ThemedText style={[styles.doctorName, styles.completeText]}>{appointment.doctor}</ThemedText>
							<ThemedText style={styles.specialty}>{appointment.specialty}</ThemedText>
						</View>
					</View>
					<View style={styles.appointmentActions}>
						<TouchableOpacity 
							style={[styles.actionButton, styles.completeActionButton]}
							onPress={() => handleRebook(appointment)}
						>
							<ThemedText style={styles.completeButtonText}>Re-Book</ThemedText>
						</TouchableOpacity>
						<TouchableOpacity 
							style={[styles.actionButton, styles.reviewButton]}
							onPress={() => router.push('/review')}
						>
							<ThemedText style={styles.reviewButtonText}>Add Review</ThemedText>
						</TouchableOpacity>
					</View>
				</ThemedView>
			);
		}

		if (activeTab === 'Upcoming') {
			return (
				<ThemedView key={appointment.id} style={[styles.appointmentCard, styles.upcomingCard]}>
					<View style={styles.cardHeader}>
						<View style={styles.doctorInfo}>
							<Image
								source={require('@/assets/images/doctor.png')}
								style={styles.doctorAvatar}
							/>
							<View>
								<ThemedText style={[styles.doctorName, styles.upcomingText]}>{appointment.doctor}</ThemedText>
								<ThemedText style={styles.specialty}>{appointment.specialty}</ThemedText>
							</View>
						</View>
						<TouchableOpacity onPress={() => handleCancel(appointment.id)}>
							<ThemedText style={styles.cancelIcon}>⊗</ThemedText>
						</TouchableOpacity>
					</View>
					<View style={styles.appointmentActions}>
						<TouchableOpacity style={[styles.actionButton, styles.dateActionButton]}>
							<ThemedText style={styles.dateActionText}>{appointment.date}</ThemedText>
						</TouchableOpacity>
						<TouchableOpacity style={[styles.actionButton, styles.timeActionButton]}>
							<ThemedText style={styles.timeActionText}>{appointment.time}</ThemedText>
						</TouchableOpacity>
					</View>
				</ThemedView>
			);
		}

		if (activeTab === 'Cancelled') {
			return (
				<ThemedView key={appointment.id} style={[styles.appointmentCard, styles.cancelledCard]}>
					<View style={styles.doctorInfo}>
						<Image
							source={require('@/assets/images/doctor.png')}
							style={styles.doctorAvatar}
						/>
						<View>
							<ThemedText style={styles.doctorName}>{appointment.doctor}</ThemedText>
							<ThemedText style={styles.specialty}>{appointment.specialty}</ThemedText>
						</View>
					</View>
					<TouchableOpacity 
						style={styles.reBookButton}
						onPress={() => handleRebook(appointment)}
					>
						<ThemedText style={styles.reBookButtonText}>Re-Book</ThemedText>
					</TouchableOpacity>
				</ThemedView>
			);
		}


		return null;
	};

	return (
		<SafeAreaView style={styles.safeArea}>
			<View style={styles.container}>
				<View style={styles.header}>
					<TouchableOpacity>
						<ThemedText style={styles.backButton}>←</ThemedText>
					</TouchableOpacity>
					<ThemedText style={styles.title}>My Appointments</ThemedText>
				</View>

				<View style={styles.tabs}>
					{(['Complete', 'Upcoming', 'Cancelled'] as TabType[]).map((tab) => (
						<TouchableOpacity
							key={tab}
							style={[
								styles.tab,
								activeTab === tab && styles.activeTab,
							]}
							onPress={() => setActiveTab(tab)}
						>
							<ThemedText
								style={[
									styles.tabText,
									activeTab === tab && styles.activeTabText,
								]}
							>
								{tab}
							</ThemedText>
						</TouchableOpacity>
					))}
				</View>

				<ScrollView 
					style={styles.appointmentList}
					contentContainerStyle={styles.scrollContent}
				>
					{filteredAppointments.map((appointment) => renderAppointmentCard(appointment))}
				</ScrollView>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: '#F5F5F5',
	},
	container: {
		flex: 1,
		backgroundColor: '#F5F5F5',
	},
	scrollContent: {
		paddingBottom: 100,
	},
	upcomingCard: {
		backgroundColor: '#E8F1FF',
		padding: 16,
		paddingVertical: 20,
		borderRadius: 15,
	},
	upcomingText: {
		color: '#4285F4',
		fontSize: 16,
		fontWeight: 'bold',
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 20,
		paddingTop: 40,
	},
	backButton: {
		fontSize: 24,
		marginRight: 15,
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
		color: '#4285F4',
	},
	tabs: {
		flexDirection: 'row',
		paddingHorizontal: 20,
		marginBottom: 20,
	},
	tab: {
		paddingVertical: 8,
		paddingHorizontal: 20,
		borderRadius: 20,
		backgroundColor: '#E8F1FF',
		marginRight: 10,
	},
	activeTab: {
		backgroundColor: '#4285F4',
	},
	tabText: {
		color: '#4285F4',
	},
	activeTabText: {
		color: '#FFFFFF',
	},
	appointmentList: {
		padding: 20,
	},
	appointmentCard: {
		backgroundColor: '#E8F1FF',
		borderRadius: 15,
		padding: 15,
		marginBottom: 15,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
	},
	dateActionButton: {
		backgroundColor: '#FFFFFF',
		borderWidth: 1,
		borderColor: '#4285F4',
		flex: 1,
		paddingVertical: 12,
		borderRadius: 25,
	},
	timeActionButton: {
		backgroundColor: '#4285F4',
		flex: 1,
		paddingVertical: 12,
		borderRadius: 25,
	},
	dateActionText: {
		color: '#4285F4',
		fontWeight: 'bold',
		textAlign: 'center',
	},
	timeActionText: {
		color: '#FFFFFF',
		fontWeight: 'bold',
		textAlign: 'center',
	},
	cardHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
		marginBottom: 15,
	},
	cancelIcon: {
		fontSize: 25,
		color: '#FF4444',
	},
	dateText: {
		fontSize: 14,
		fontWeight: '500',
		color: '#4285F4',
	},
	timeText: {
		fontSize: 14,
		fontWeight: '500',
		color: '#FFFFFF',
	},
	doctorInfo: {
		flexDirection: 'row',
		alignItems: 'center',
	},

	doctorAvatar: {
		width: 60,
		height: 60,
		borderRadius: 30,
		marginRight: 12,
		backgroundColor: '#D9D9D9',
	},
	doctorName: {
		fontSize: 16,
		fontWeight: '600',
		color: '#4285F4',
		marginBottom: 2,
	},
	specialty: {
		fontSize: 14,
		color: '#4285F4',
		opacity: 0.8,
	},
	appointmentActions: {
		flexDirection: 'row',
		gap: 15,
		marginTop: 20,
	},
	actionButton: {
		flex: 1,
		backgroundColor: '#FFFFFF',
		padding: 12,
		borderRadius: 25,
		alignItems: 'center',
	},
	actionButtonText: {
		color: '#4285F4',
		fontWeight: 'bold',
	},
	completeCard: {
		backgroundColor: '#E8F1FF',
		padding: 20,
		borderRadius: 15,
	},
	completeText: {
		color: '#4285F4',
		fontSize: 18,
		fontWeight: 'bold',
	},
	completeActionButton: {
		backgroundColor: '#FFFFFF',
		borderWidth: 1,
		borderColor: '#4285F4',
		flex: 1,
		paddingVertical: 12,
		borderRadius: 25,
	},
	completeButtonText: {
		color: '#4285F4',
		fontWeight: 'bold',
		textAlign: 'center',
	},
	reviewButton: {
		backgroundColor: '#4285F4',
		flex: 1,
		paddingVertical: 12,
		borderRadius: 25,
	},
	reviewButtonText: {
		color: '#FFFFFF',
		fontWeight: 'bold',
		textAlign: 'center',
	},
	cancelledCard: {
		backgroundColor: '#E8F1FF',
		padding: 16,
		paddingVertical: 20,
		borderRadius: 15,
		marginBottom: 12,
	},
	reBookButton: {
		backgroundColor: '#4285F4',
		paddingVertical: 10,
		paddingHorizontal: 30,
		borderRadius: 25,
		marginTop: 15,
		alignSelf: 'flex-end',
	},
	reBookButtonText: {
		color: '#FFFFFF',
		fontWeight: '600',
		fontSize: 14,
	}
});
