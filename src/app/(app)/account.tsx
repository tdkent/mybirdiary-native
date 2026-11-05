import { Button, Text, View } from "react-native";

export default function AccountScreen() {
	return (
		<View className="flex-1 items-center justify-center">
			<Text>Account</Text>
			<Text>Show account and profile info. Session options.</Text>

			<View>
				<Button title="Log out" />
			</View>
		</View>
	);
}
