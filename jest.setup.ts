jest.mock("react-native-appwrite", () => ({
	Client: jest.fn().mockImplementation(() => ({
		setEndpoint: jest.fn().mockReturnThis(),
		setProject: jest.fn().mockReturnThis(),
		setPlatform: jest.fn().mockReturnThis(),
	})),

	Account: jest.fn().mockImplementation(() => ({
		create: jest.fn(),
		createEmailPasswordSession: jest.fn(),
		deleteSession: jest.fn(),
		get: jest.fn(),
	})),
}));
