import React from 'react';
import { StyleSheet, TouchableOpacity, Image, View, Alert, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useUser } from '@/app/context/UserContext';

export default function ProfileTab() {
	const router = useRouter();
	const { name, profileImage, logout } = useUser();
	
	const handleLogout = () => {
		Alert.alert(
			"Logout",
			"Are you sure you want to logout?",
			[
				{ text: "Cancel", style: "cancel" },
				{ 
					text: "Logout", 
					style: "destructive", 
					onPress: () => {
						logout();
						router.replace('/screens/LoginScreen');
					}
				}
			]
		);
	};



	return (
		<ThemedView style={styles.container}>
			<ScrollView contentContainerStyle={styles.scrollContent}>
				<View style={styles.header}>
				<TouchableOpacity style={styles.backButton}>
					<Ionicons name="chevron-back" size={24} color="#4285F4" />
				</TouchableOpacity>
				<ThemedText style={styles.headerTitle}>My Profile</ThemedText>
			</View>

			<View style={styles.profileSection}>
				<View style={styles.avatarContainer}>
					<Image
						style={styles.avatar}
						source={profileImage ? { uri: profileImage } : require('../../assets/images/doctor.png')}
					/>
				</View>
				<ThemedText style={styles.userName}>{name}</ThemedText>

			</View>

			<View style={styles.menuList}>
				<TouchableOpacity 
					style={styles.menuItem}
					onPress={() => router.push('/screens/EditProfileScreen')}
				>
					<View style={styles.menuIcon}>
						<Ionicons name="person-outline" size={24} color="#4285F4" />
					</View>
					<ThemedText style={styles.menuText}>Profile</ThemedText>
					<Ionicons name="chevron-forward" size={24} color="#4285F4" />
				</TouchableOpacity>

				<TouchableOpacity 
					style={styles.menuItem}
					onPress={() => router.push('/screens/SettingsScreen')}
				>
					<View style={styles.menuIcon}>
						<Ionicons name="settings-outline" size={24} color="#4285F4" />
					</View>
					<ThemedText style={styles.menuText}>Password Manager</ThemedText>
					<Ionicons name="chevron-forward" size={24} color="#4285F4" />
				</TouchableOpacity>

				<TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
					<View style={styles.menuIcon}>
						<Ionicons name="log-out-outline" size={24} color="#4285F4" />
					</View>
					<ThemedText style={styles.menuText}>Logout</ThemedText>
					<Ionicons name="chevron-forward" size={24} color="#4285F4" />
				</TouchableOpacity>


			</View>
			</ScrollView>
		</ThemedView>
	);
}



const styles = StyleSheet.create({
	scrollContent: {
		flexGrow: 1,
		paddingBottom: 100,
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
		fontSize: 20,
		fontWeight: '600',
		color: '#4285F4',
		marginLeft: 8,
	},
	profileSection: {
		alignItems: 'center',
		marginTop: 20,
		marginBottom: 40,
	},
	avatarContainer: {
		position: 'relative',
	},
	avatar: {
		width: 100,
		height: 100,
		borderRadius: 50,
		backgroundColor: '#E8E8E8',
	},


	userName: {
		fontSize: 24,
		fontWeight: '600',
		marginTop: 16,
		color:"#000000",
	},
	menuList: {
		paddingHorizontal: 16,
	},
	menuItem: {
		flexDirection: 'row',
		alignItems: 'center',
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
	menuIcon: {
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: '#F0F6FF',
		alignItems: 'center',
		justifyContent: 'center',
		marginRight: 12,
	},
	menuText: {
		flex: 1,
		fontSize: 16,
		color:"#000000",
	},
});