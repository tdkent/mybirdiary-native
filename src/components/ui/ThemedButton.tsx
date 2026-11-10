import { Pressable, Text } from "react-native";

interface Props {
	isLoading: boolean;
	label: string;
	onPress: () => void;
}

export default function ThemedButton({ isLoading, label, onPress }: Props) {
	return (
		<Pressable
			className="bg-blue-500 px-6 py-3 rounded-lg active:opacity-80 focus:ring-2 focus:ring-blue-300"
			disabled={isLoading}
			onPress={onPress}
			role="button"
		>
			<Text className="text-white text-center font-semibold">{label}</Text>
		</Pressable>
	);
}
