import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Animated, Dimensions } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export function BookingSuccess({ onAnimationComplete }: { onAnimationComplete?: () => void }) {
	const scaleValue = useRef(new Animated.Value(0)).current;
	const opacityValue = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		const animation = Animated.sequence([
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
		]);

		animation.start(() => onAnimationComplete?.());

		return () => {
			animation.stop();
		};
	}, []);

	return (
		<Animated.View style={[styles.container, { opacity: opacityValue }]}>
			<View style={styles.content}>
				<Animated.View style={[styles.iconContainer, { transform: [{ scale: scaleValue }] }]}>
					<Ionicons name="checkmark-circle" size={80} color="#4CAF50" />
				</Animated.View>
				<ThemedText style={styles.text}>Booking Completed!</ThemedText>
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