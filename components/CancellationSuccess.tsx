import React, { useEffect } from 'react';
import { StyleSheet, View, Animated, Dimensions } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export function CancellationSuccess({ onAnimationComplete }: { onAnimationComplete?: () => void }) {
	const scaleValue = new Animated.Value(0);
	const opacityValue = new Animated.Value(0);

	useEffect(() => {
		Animated.sequence([
			Animated.parallel([
				Animated.spring(scaleValue, {
					toValue: 1,
					useNativeDriver: true,
				}),
				Animated.timing(opacityValue, {
					toValue: 1,
					duration: 500,
					useNativeDriver: true,
				}),
			]),
			Animated.delay(2000),
			Animated.timing(opacityValue, {
				toValue: 0,
				duration: 500,
				useNativeDriver: true,
			}),
		]).start(() => onAnimationComplete?.());
	}, []);

	return (
		<Animated.View style={[styles.container, { opacity: opacityValue }]}>
			<View style={styles.content}>
				<Animated.View style={[styles.iconContainer, { transform: [{ scale: scaleValue }] }]}>
					<Ionicons name="close-circle" size={80} color="#FF4444" />
				</Animated.View>
				<ThemedText style={styles.text}>Appointment Cancelled</ThemedText>
			</View>
		</Animated.View>
	);
}

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: 'rgba(255, 255, 255, 0.95)',
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 1000,
	},
	content: {
		alignItems: 'center',
	},
	iconContainer: {
		marginBottom: 16,
	},
	text: {
		fontSize: 24,
		fontWeight: '600',
		color: '#000000',
	},
});