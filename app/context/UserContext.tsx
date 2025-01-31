import React, { createContext, useState, useContext } from 'react';

type UserContextType = {
	name: string;
	profileImage: string | null;
	updateName: (name: string) => void;
	updateProfileImage: (image: string | null) => void;
	logout: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
	const [name, setName] = useState('Kwame');
	const [profileImage, setProfileImage] = useState<string | null>(null);

	const updateName = (newName: string) => setName(newName);
	const updateProfileImage = (image: string | null) => setProfileImage(image);
	const logout = () => {
		setName('');
		setProfileImage(null);
	};

	return (
		<UserContext.Provider value={{ name, profileImage, updateName, updateProfileImage, logout }}>
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