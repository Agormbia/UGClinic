import { createContext, useContext, useState, ReactNode } from 'react';

type UserContextType = {
	studentId: string;
	studentName: string;
	setStudentId: (id: string) => void;
	setStudentName: (name: string) => void;
	logout: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
	const [studentId, setStudentId] = useState('');
	const [studentName, setStudentName] = useState('');

	const logout = () => {
		setStudentId('');
		setStudentName('');
	};

	return (
		<UserContext.Provider value={{ 
			studentId, 
			studentName,
			setStudentId, 
			setStudentName,
			logout 
		}}>
			{children}
		</UserContext.Provider>
	);
}

export function useUser() {
	const context = useContext(UserContext);
	if (context === undefined) {
		throw new Error('useUser must be used within a UserProvider');
	}
	return context;
}
