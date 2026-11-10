import ThemedButton from "@/components/ui/ThemedButton";
import ThemedSafeView from "@/components/ui/ThemedSafeView";
import ThemedText from "@/components/ui/ThemedText";
import { useAuth } from "@/hooks/useAuth";
import { View } from "react-native";

export default function AccountScreen() {
	const { isLoading, logout } = useAuth();
	return (
		<ThemedSafeView>
			<ThemedText variant="heading">My Account</ThemedText>
			<ThemedText>Show account and profile info. Session options.</ThemedText>

			<View>
				<ThemedButton isLoading={isLoading} label="Log out" onPress={logout} />
			</View>
		</ThemedSafeView>
	);
}
