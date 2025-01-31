import { StyleSheet, TouchableOpacity, View, TextInput, Image } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useState } from 'react';
import { router } from 'expo-router';

export default function ReviewScreen() {
	const [rating, setRating] = useState(4);
	const [comment, setComment] = useState('');

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<TouchableOpacity onPress={() => router.back()}>
					<ThemedText style={styles.backButton}>←</ThemedText>
				</TouchableOpacity>
				<ThemedText style={styles.title}>Review</ThemedText>
			</View>

			<View style={styles.doctorProfile}>
				<Image
					source={require('@/assets/images/doctor.png')}
					style={styles.doctorImage}
				/>
				<ThemedText style={styles.doctorName}>Dr. Angela Adamtey</ThemedText>
				<ThemedText style={styles.specialty}>Hematologist</ThemedText>
			</View>

			<View style={styles.ratingContainer}>
				<TouchableOpacity style={styles.favoriteButton}>
					<ThemedText style={styles.favoriteIcon}>♥</ThemedText>
				</TouchableOpacity>
				<View style={styles.starsContainer}>
					{[1, 2, 3, 4, 5].map((star) => (
						<TouchableOpacity
							key={star}
							onPress={() => setRating(star)}
						>
							<ThemedText style={[
								styles.starIcon,
								star <= rating && styles.starSelected
							]}>
								★
							</ThemedText>
						</TouchableOpacity>
					))}
				</View>
			</View>

			<View style={styles.commentContainer}>
				<TextInput
					style={styles.commentInput}
					placeholder="Enter Your Comment Here..."
					placeholderTextColor="#4285F4"
					value={comment}
					onChangeText={setComment}
					multiline
				/>
			</View>

			<TouchableOpacity style={styles.submitButton}>
				<ThemedText style={styles.submitButtonText}>Add Review</ThemedText>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFFFFF',
		padding: 20,
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 40,
		marginTop: 20,
	},
	backButton: {
		fontSize: 24,
		marginRight: 15,
		color: '#4285F4',
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		color: '#4285F4',
	},
	doctorProfile: {
		alignItems: 'center',
		marginBottom: 30,
	},
	doctorImage: {
		width: 120,
		height: 120,
		borderRadius: 60,
		backgroundColor: '#D9D9D9',
		marginBottom: 15,
	},
	doctorName: {
		fontSize: 24,
		fontWeight: 'bold',
		color: '#4285F4',
		marginBottom: 5,
	},
	specialty: {
		fontSize: 18,
		color: '#000000',
	},
	ratingContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 30,
	},
	favoriteButton: {
		marginRight: 20,
	},
	favoriteIcon: {
		fontSize: 24,
		color: '#4285F4',
	},
	starsContainer: {
		flexDirection: 'row',
		backgroundColor: '#E8F1FF',
		paddingVertical: 8,
		paddingHorizontal: 15,
		borderRadius: 20,
	},
	starIcon: {
		fontSize: 24,
		color: '#E0E0E0',
		marginHorizontal: 5,
	},
	starSelected: {
		color: '#4285F4',
	},
	commentContainer: {
		backgroundColor: '#E8F1FF',
		borderRadius: 15,
		padding: 15,
		minHeight: 150,
		marginBottom: 30,
	},
	commentInput: {
		fontSize: 16,
		color: '#4285F4',
	},
	submitButton: {
		backgroundColor: '#4285F4',
		padding: 15,
		borderRadius: 30,
		alignItems: 'center',
		position: 'absolute',
		bottom: 30,
		left: 20,
		right: 20,
	},
	submitButtonText: {
		color: '#FFFFFF',
		fontSize: 18,
		fontWeight: 'bold',
	},
});