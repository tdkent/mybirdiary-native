import {
	QueryClient,
	type QueryClientConfig,
	QueryClientProvider,
} from "@tanstack/react-query";
import { render } from "@testing-library/react-native";
import type { ReactElement, ReactNode } from "react";

/**
 * Fresh QueryClient for a single test.
 * Retries are off so error states render immediately, and gcTime is Infinity
 * (for queries and mutations) so no garbage-collection timers keep Jest
 * running after the suite ends.
 */
export function createTestQueryClient(config: QueryClientConfig = {}) {
	return new QueryClient({
		...config,
		defaultOptions: {
			...config.defaultOptions,
			queries: {
				retry: false,
				gcTime: Number.POSITIVE_INFINITY,
				...config.defaultOptions?.queries,
			},
			mutations: {
				retry: false,
				gcTime: Number.POSITIVE_INFINITY,
				...config.defaultOptions?.mutations,
			},
		},
	});
}

/** Wrapper component for `render` / `renderRouter` options. */
export function createQueryWrapper(queryClient: QueryClient) {
	return ({ children }: { children: ReactNode }) => (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);
}

/** Render `ui` inside a QueryClientProvider; returns the client with the render result. */
export async function renderWithClient(
	ui: ReactElement,
	queryClient: QueryClient = createTestQueryClient(),
) {
	const result = await render(ui, {
		wrapper: createQueryWrapper(queryClient),
	});

	return { ...result, queryClient };
}
