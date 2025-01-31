import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, TextInput, Image, Alert } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function ReviewScreen() {
	const router = useRouter();
	const [rating, setRating] = useState(4);
	const [comment, setComment] = useState('');

	const handleSubmitReview = () => {
		if (!comment.trim()) {
			Alert.alert('Error', 'Please enter your review comment');
			return;
		}
		// Add review submission logic here
		Alert.alert('Success', 'Review submitted successfully', [
			{ text: 'OK', onPress: () => router.back() }
		]);
	};

	const renderStars = () => {
		const stars = [];
		for (let i = 1; i <= 5; i++) {
			stars.push(
				<TouchableOpacity key={i} onPress={() => setRating(i)}>
					<Ionicons
						name={i <= rating ? 'star' : 'star-outline'}
						size={32}
						color="#4285F4"
					/>
				</TouchableOpacity>
			);
		}
		return stars;
	};

	return (
		<ThemedView style={styles.container}>
			<View style={styles.header}>
				<TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
					<Ionicons name="chevron-back" size={24} color="#4285F4" />
				</TouchableOpacity>
				<ThemedText style={styles.headerTitle}>Review</ThemedText>
			</View>

			<View style={styles.doctorProfile}>
				<Image
					style={styles.doctorImage}
					source={require('../assets/images/doctor.png')}
				/>
				<ThemedText style={styles.doctorName}>Dr. Angela Adamtey</ThemedText>
				<ThemedText style={styles.specialty}>Hematologist</ThemedText>
			</View>

			<View style={styles.ratingContainer}>
				<TouchableOpacity style={styles.favoriteButton}>
					<Ionicons name="heart-outline" size={24} color="#4285F4" />
				</TouchableOpacity>
				<View style={styles.starsContainer}>
					{renderStars()}
				</View>
			</View>

			<View style={styles.commentContainer}>
				<TextInput
					style={styles.commentInput}
					placeholder="Enter Your Comment Here..."
					value={comment}
					onChangeText={setComment}
					multiline
					numberOfLines={6}
					placeholderTextColor="#A0A0A0"
				/>
			</View>

			<TouchableOpacity style={styles.submitButton} onPress={handleSubmitReview}>
				<ThemedText style={styles.submitButtonText}>Add Review</ThemedText>
			</TouchableOpacity>
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
		flex: 1,
		textAlign: 'center',
	},
	doctorProfile: {
		alignItems: 'center',
		marginTop: 20,
	},
	doctorImage: {
		width: 120,
		height: 120,
		borderRadius: 60,
		backgroundColor: '#E0E0E0',
	},
	doctorName: {
		fontSize: 24,
		fontWeight: '600',
		marginTop: 16,
		color: '#4285F4',
	},
	specialty: {
		fontSize: 16,
		color: '#000000',
		marginTop: 4,
	},
	ratingContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 24,
		backgroundColor: '#F0F6FF',
		padding: 16,
		borderRadius: 25,
		marginHorizontal: 16,
	},
	favoriteButton: {
		marginRight: 16,
	},
	starsContainer: {
		flexDirection: 'row',
		gap: 8,
	},
	commentContainer: {
		padding: 16,
		flex: 1,
	},
	commentInput: {
		backgroundColor: '#F0F6FF',
		padding: 16,
		borderRadius: 12,
		height: 160,
		textAlignVertical: 'top',
		fontSize: 16,
	},
	submitButton: {
		backgroundColor: '#4285F4',
		margin: 16,
		padding: 16,
		borderRadius: 25,
		alignItems: 'center',
	},
	submitButtonText: {
		color: '#FFFFFF',
		fontSize: 18,
		fontWeight: '600',
	},
});