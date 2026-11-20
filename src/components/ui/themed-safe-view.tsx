import { SafeAreaView } from "react-native-safe-area-context";
import { withUniwind } from "uniwind";

const ThemedSafeAreaView = withUniwind(SafeAreaView);

interface Props {
	children: React.ReactNode;
}

export default function ThemedSafeView({ children }: Props) {
	return (
		<ThemedSafeAreaView className="flex-1 items-center justify-center bg-background">
			{children}
		</ThemedSafeAreaView>
	);
}
