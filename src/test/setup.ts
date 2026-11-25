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
		// Matches value of fixtures.ts > USER_ID
		unique: jest.fn().mockReturnValue("user-123"),
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

// Tanstack Query
jest.mock("@tanstack/react-query", () => ({
	useMutation: jest.fn(),
	useQuery: jest.fn(),
	useQueryClient: jest.fn().mockReturnValue({
		clear: jest.fn(),
	}),
}));

// Console
global.console = {
	...console,
	error: jest.fn(),
};

beforeEach(() => {
	jest.clearAllMocks();
});
