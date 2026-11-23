import { Link } from "expo-router";
import AuthForm from "@/components/forms/auth-form";
import ThemedSafeView from "@/components/ui/themed-safe-view";
import ThemedText from "@/components/ui/themed-text";

export default function LoginScreen() {
	return (
		<ThemedSafeView>
			<ThemedText variant="heading">Sign in</ThemedText>

			<AuthForm isLogin />

			<ThemedText>
				Don't have an account? <Link href="/register">Sign up</Link>
			</ThemedText>
		</ThemedSafeView>
	);
}
