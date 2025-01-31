import users from '../database/users.json';

interface User {
	studentId: number;
	pin: number;
	role: string;
}

interface UsersData {
	users: User[];
}

const typedUsers = users as UsersData;

const auth = {
	authenticateUser: (studentId: number, pin: number): boolean => {
		const user = typedUsers.users.find(
			(u: User) => u.studentId === studentId && u.pin === pin
		);
		return user ? true : false;
	},

	getUserRole: (studentId: number): string | null => {
		const user = typedUsers.users.find((u: User) => u.studentId === studentId);
		return user?.role || null;
	}
};

export default auth;