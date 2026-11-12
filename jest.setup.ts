// Mock appwrite
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
		unique: jest.fn().mockReturnValue("xxx"),
	},

	AppwriteException: class AppwriteException extends Error {
		type: string;

		constructor(message: string, type: string) {
			super(message);
			this.type = type;
		}
	},
}));

// Mock uniwind
jest.mock("uniwind", () => ({
	useUniwind: jest.fn(),
	withUniwind: (component: React.ComponentType<unknown>) => component,
}));

// Mock Tanstack Query
jest.mock("@tanstack/react-query", () => ({
	useQuery: jest.fn(),
}));

beforeEach(() => {
	jest.clearAllMocks();
});
