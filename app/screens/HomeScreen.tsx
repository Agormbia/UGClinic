import { Image, StyleSheet, ScrollView, TouchableOpacity, View, SafeAreaView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { router } from 'expo-router';
import { useAppointments } from '@/app/context/AppointmentContext';
import { useUser } from '@/app/context/UserContext';

const departments = [
	{ id: 1, name: 'X-Ray', icon: require('@/assets/images/xray.png') },
	{ id: 2, name: 'Dental', icon: require('@/assets/images/Dental.png') },
	{ id: 3, name: 'Vitals', icon: require('@/assets/images/Vitals.png') },
	{ id: 4, name: 'Doctor', icon: require('@/assets/images/doctor.png') },
];

const doctors = [
	{ id: 1, name: 'Dr. Prince Boateng', specialty: 'Dentist', time: '10:30am - 5:30pm' },
	{ id: 2, name: 'Dr. Angela Adamtey', specialty: 'Hematologist', time: '10:30am - 5:30pm' },
	{ id: 3, name: 'Dr. Ernest Wilson', specialty: 'Radiologist', time: '10:30am - 5:30pm' },
];




export default function HomeScreen() {
	const { appointments } = useAppointments();
	const { studentId, studentName } = useUser();
	const upcomingAppointments = appointments.filter(app => app.status === 'upcoming');

	const handleBookAppointment = (doctor: typeof doctors[0]) => {
		router.push({
			pathname: '/screens/BookAppointmentScreen',
			params: {
				doctorName: doctor.name,
				specialty: doctor.specialty,
			},
		});
	};

	return (
		<SafeAreaView style={styles.safeArea}>
			<ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
			<View style={styles.header}>
				<View style={styles.userInfo}>
					<Image 
						source={require('@/assets/images/doctor.png')} 
						style={styles.avatar}
					/>
					<View>
						<ThemedText style={styles.welcomeText}>Welcome</ThemedText>
						<ThemedText style={styles.studentName}>{studentName}</ThemedText>
					</View>
				</View>
				<Image
					source={require('@/assets/images/ug logo 1.png')}
					style={styles.logo}
				/>
			</View>


			<View style={styles.section}>
				<ThemedText style={styles.sectionTitle}>Upcoming Appointments</ThemedText>
				<ScrollView horizontal showsHorizontalScrollIndicator={false}>
					{upcomingAppointments.map(appointment => (
						<ThemedView key={appointment.id} style={styles.appointmentCard}>
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
							<View style={styles.appointmentTime}>
								<ThemedText style={styles.appointmentTimeText}>{appointment.date}</ThemedText>
								<ThemedText style={styles.appointmentTimeText}>{appointment.time}</ThemedText>
							</View>
						</ThemedView>
					))}
				</ScrollView>
			</View>

			<View style={styles.section}>
				<View style={styles.sectionHeader}>
					<ThemedText style={styles.sectionTitle}>Departments</ThemedText>
					<TouchableOpacity>
						<ThemedText style={styles.seeAll}>See all</ThemedText>
					</TouchableOpacity>
				</View>
				<View style={styles.departmentsGrid}>
					{departments.map(dept => (
						<TouchableOpacity key={dept.id} style={styles.departmentCard}>
							<Image source={dept.icon} style={styles.departmentIcon} />
							<ThemedText style={styles.departmentName}>{dept.name}</ThemedText>
						</TouchableOpacity>
					))}
				</View>
			</View>

			<View style={styles.section}>
				<View style={styles.sectionHeader}>
					<ThemedText style={styles.sectionTitle}>Available Doctors</ThemedText>
					<TouchableOpacity>
						<ThemedText style={styles.seeAll}>See all</ThemedText>
					</TouchableOpacity>
				</View>
				{doctors.map(doctor => (
					<ThemedView key={doctor.id} style={styles.doctorCard}>
						<View style={styles.doctorCardInfo}>
							<Image 
								source={require('@/assets/images/male.png')} 
								style={styles.doctorAvatar} 
							/>
							<View>
								<ThemedText style={styles.doctorCardName}>{doctor.name}</ThemedText>
								<ThemedText style={styles.doctorCardSpecialty}>{doctor.specialty}</ThemedText>
								<View style={styles.timeContainer}>
									<ThemedText style={styles.timeText}>{doctor.time}</ThemedText>
								</View>
							</View>
						</View>
						<TouchableOpacity 
							style={styles.bookButton}
							onPress={() => handleBookAppointment(doctor)}
						>
							<ThemedText style={styles.bookButtonText}>Book Appointment</ThemedText>
						</TouchableOpacity>
					</ThemedView>
				))}
			</View>
		</ScrollView>
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
	contentContainer: {
		paddingBottom: 100,
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 20,
		paddingTop: 40,
	},
	userInfo: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	avatar: {
		width: 50,
		height: 50,
		borderRadius: 25,
		marginRight: 12,
		backgroundColor: '#fff',
	},
	welcomeText: {
		fontSize: 16,
		color: '#000000',
	},
	studentName: {
		fontSize: 18,
		fontWeight: 'bold',
		color: '#000000',
	},
	logo: {
		width: 80,
		height: 40,
		resizeMode: 'contain',
	},


	section: {
		padding: 20,
		paddingTop: 10,
	},
	sectionHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 15,
	},
	sectionTitle: {
		fontSize: 20,
		fontWeight: 'bold',
		color: '#000000',
	},
	seeAll: {
		color: '#4285F4',
		fontSize: 14,
	},
	appointmentCard: {
		backgroundColor: '#4285F4',
		borderRadius: 15,
		padding: 15,
		marginRight: 15,
		width: 250,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
	},
	doctorInfo: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 10,
	},
	doctorAvatar: {
		width: 40,
		height: 40,
		borderRadius: 20,
		marginRight: 10,
		backgroundColor: '#fff',
	},
	doctorName: {
		fontSize: 16,
		fontWeight: 'bold',
		color: '#FFFFFF',
	},
	specialty: {
		color: 'rgba(255, 255, 255, 0.8)',
		fontSize: 14,
	},
	appointmentTime: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 10,
	},
	departmentsGrid: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
		paddingHorizontal: 5,
	},
	departmentCard: {
		width: '23%',
		aspectRatio: 1,
		backgroundColor: '#FFFFFF',
		borderRadius: 15,
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 15,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
	},
	departmentIcon: {
		width: 32,
		height: 32,
		marginBottom: 8,
		tintColor: '#4285F4',
	},
	departmentName: {
		fontSize: 12,
		textAlign: 'center',
		color: '#000000',
	},
	doctorCard: {
		backgroundColor: '#FFFFFF',
		borderRadius: 15,
		padding: 15,
		marginBottom: 15,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
	},
	doctorCardInfo: {
		flexDirection: 'row',
		marginBottom: 15,
	},
	timeContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 5,
	},
	timeText: {
		color: '#000000',
		fontSize: 14,
	},
	bookButton: {
		backgroundColor: '#F0F6FF',
		padding: 12,
		borderRadius: 8,
		alignItems: 'center',
	},
	bookButtonText: {
		color: '#4285F4',
		fontWeight: 'bold',
	},
	appointmentTimeText: {
		color: '#FFFFFF',
		fontSize: 14,
	},
	doctorCardName: {
		fontSize: 16,
		fontWeight: 'bold',
		color: '#000000',
	},
	doctorCardSpecialty: {
		color: '#000000',
		fontSize: 14,
	},
});