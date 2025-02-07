import React, { createContext, useContext, useState, useEffect } from 'react';
import { useUser } from './UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Appointment = {
	id: number;
	doctor: string;
	specialty: string;
	date: string;
	time: string;
	status: 'upcoming' | 'complete' | 'cancelled';
};

type AppointmentContextType = {
	appointments: Appointment[];
	addAppointment: (appointment: Omit<Appointment, 'id' | 'status'>, oldAppointmentId?: number) => void;
	cancelAppointment: (id: number) => void;
	completeAppointment: (id: number) => void;
};

const AppointmentContext = createContext<AppointmentContextType | undefined>(undefined);

export function AppointmentProvider({ children }: { children: React.ReactNode }) {
	const [appointments, setAppointments] = useState<Appointment[]>([]);
	const { studentId } = useUser();

	// Load user-specific appointments
	useEffect(() => {
		const loadAppointments = async () => {
			try {
				const storedAppointments = await AsyncStorage.getItem(`appointments_${studentId}`);
				if (storedAppointments) {
					setAppointments(JSON.parse(storedAppointments));
				}
			} catch (error) {
				console.error('Error loading appointments:', error);
			}
		};

		if (studentId) {
			loadAppointments();
		}
	}, [studentId]);

	// Save appointments to AsyncStorage
	const saveAppointments = async (newAppointments: Appointment[]) => {
		try {
			await AsyncStorage.setItem(`appointments_${studentId}`, JSON.stringify(newAppointments));
		} catch (error) {
			console.error('Error saving appointments:', error);
		}
	};


	const addAppointment = (appointment: Omit<Appointment, 'id' | 'status'>, oldAppointmentId?: number) => {
		const newAppointments = [...appointments];
		if (oldAppointmentId) {
			const index = newAppointments.findIndex(app => app.id === oldAppointmentId);
			if (index !== -1) {
				newAppointments.splice(index, 1);
			}
		}

		const newAppointment = {
			...appointment,
			id: Date.now(),
			status: 'upcoming' as const
		};

		newAppointments.push(newAppointment);
		setAppointments(newAppointments);
		saveAppointments(newAppointments);
	};

	const cancelAppointment = (id: number) => {
		const newAppointments = appointments.map(app =>
			app.id === id ? { ...app, status: 'cancelled' as const } : app
		);
		setAppointments(newAppointments);
		saveAppointments(newAppointments);
	};

	const completeAppointment = (id: number) => {
		const newAppointments = appointments.map(app =>
			app.id === id ? { ...app, status: 'complete' as const } : app
		);
		setAppointments(newAppointments);
		saveAppointments(newAppointments);
	};

	return (
		<AppointmentContext.Provider value={{
			appointments,
			addAppointment,
			cancelAppointment,
			completeAppointment
		}}>
			{children}
		</AppointmentContext.Provider>
	);
}

export function useAppointments() {
	const context = useContext(AppointmentContext);
	if (context === undefined) {
		throw new Error('useAppointments must be used within an AppointmentProvider');
	}
	return context;
}