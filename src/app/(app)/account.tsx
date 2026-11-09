import ThemedSafeView from "@/components/ui/ThemedSafeView";
import { useAuth } from "@/hooks/useAuth";
import { Button, Text, View } from "react-native";

export default function AccountScreen() {
	const { logout } = useAuth();
	return (
		<ThemedSafeView>
			<Text>My Account</Text>
			<Text>Show account and profile info. Session options.</Text>

			<View>
				<Button onPress={logout} title="Log out" />
			</View>
		</ThemedSafeView>
	);
}
