import ThemedSafeView from "@/components/ui/ThemedSafeView";
import ThemedText from "@/components/ui/ThemedText";
import { useAuth } from "@/hooks/useAuth";
import { Button, View } from "react-native";

export default function AccountScreen() {
	const { logout } = useAuth();
	return (
		<ThemedSafeView>
			<ThemedText variant="heading">My Account</ThemedText>
			<ThemedText>Show account and profile info. Session options.</ThemedText>

			<View>
				<Button onPress={logout} title="Log out" />
			</View>
		</ThemedSafeView>
	);
}
