import { Text, View } from "react-native";
import ThemedButton from "@/components/ui/themed-button";
import ThemedSafeView from "@/components/ui/themed-safe-view";
import ThemedText from "@/components/ui/themed-text";
import { useAuth } from "@/hooks/use-auth";

export default function AccountScreen() {
	const { isLoading, logoutError, logout } = useAuth();
	return (
		<ThemedSafeView>
			<ThemedText variant="heading">My Account</ThemedText>
			<ThemedText>Show account and profile info. Session options.</ThemedText>

			<View>
				<ThemedButton isLoading={isLoading} label="Log out" onPress={logout} />
				{logoutError && (
					<Text className="text-red-500" testID="logout-error">
						{logoutError}
					</Text>
				)}
			</View>
		</ThemedSafeView>
	);
}
