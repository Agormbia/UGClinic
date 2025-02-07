import users from '../database/users.json';

interface AuthResponse {
	success: boolean;
	studentName?: string;
}

export default {
	authenticateUser: (studentId: number, pin: number): AuthResponse => {
		const user = users.users.find(u => u.studentId === studentId && u.pin === pin);
		if (user) {
			return {
				success: true,
				studentName: user.StudentName
			};
		}
		return {
			success: false
		};
	}
};
