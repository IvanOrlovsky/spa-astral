type user = {
	name: string;
	nickname: string;
	surname?: string;
	birthdate?: string;
	sex?: string;
	email: string;
	phone: string;
	address: {
		street: string;
		city: string;
		country: string;
	};
	profession?: string;
	expierence?: number;
	company?: string;
	knownLanguages: string[];
	isGettingEmailNotifications: boolean;
	isGettingSmsNotifications: boolean;
	registrationDate: string;
	profileDiscription?: string;
	profilePhoto?: string;
	progress: number;
};

export type userType = user | null;
