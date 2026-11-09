import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Props {
	children: React.ReactNode;
}

export default function ThemedSafeView({ children }: Props) {
	return (
		<SafeAreaView>
			<View className="h-full flex items-center justify-center">
				{children}
			</View>
		</SafeAreaView>
	);
}
