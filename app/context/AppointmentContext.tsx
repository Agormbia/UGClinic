import React, { createContext, useContext, useState } from 'react';

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

	const addAppointment = (appointment: Omit<Appointment, 'id' | 'status'>, oldAppointmentId?: number) => {
		setAppointments(prev => {
			// Remove the old cancelled appointment if it exists
			const filteredAppointments = oldAppointmentId 
				? prev.filter(app => app.id !== oldAppointmentId)
				: prev;

			return [...filteredAppointments, {
				...appointment,
				id: Date.now(),
				status: 'upcoming'
			}];
		});
	};

	const cancelAppointment = (id: number) => {
		setAppointments(prev => prev.map(app => 
			app.id === id ? { ...app, status: 'cancelled' } : app
		));
	};

	const completeAppointment = (id: number) => {
		setAppointments(prev => prev.map(app => 
			app.id === id ? { ...app, status: 'complete' } : app
		));
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