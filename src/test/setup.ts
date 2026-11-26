// Appwrite
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

	TablesDB: jest.fn().mockImplementation(() => ({
		listRows: jest.fn(),
	})),

	ID: {
		// Neutral default; tests that assert a specific id override it with mockReturnValueOnce
		unique: jest.fn().mockReturnValue("unique-id"),
	},

	AppwriteException: class AppwriteException extends Error {
		code: number;
		type: string;

		constructor(message: string, code: number, type: string) {
			super(message);
			this.code = code;
			this.type = type;
		}
	},
}));

// Uniwind
jest.mock("uniwind", () => ({
	useUniwind: jest.fn(),
	withUniwind: (component: React.ComponentType<unknown>) => component,
}));

// Console
global.console = {
	...console,
	error: jest.fn(),
};

beforeEach(() => {
	jest.clearAllMocks();
});
