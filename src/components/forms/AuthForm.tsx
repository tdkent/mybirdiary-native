import { useAuth } from "@/hooks/useAuth";
import { AuthSchema } from "@/services/validation/auth.schema";
import type { UserAuth } from "@/types/auth";
import { Formik } from "formik";
import {
	Button,
	type GestureResponderEvent,
	Text,
	TextInput,
	View,
} from "react-native";

interface Props {
	action: "login" | "register";
}

//? handleSubmit type error: https://github.com/jaredpalmer/formik/issues/3643

export default function AuthForm({ action }: Props) {
	const { error, isLoading, login, register } = useAuth();

	function handleAuthAction(values: UserAuth) {
		if (action === "register") {
			register(values);
		} else if (action === "login") {
			login(values);
		} else return;
	}

	return (
		<View>
			{error && (
				<Text className="text-red-500" testID="auth-error">
					{error}
				</Text>
			)}
			<Formik
				initialValues={{ email: "", password: "" }}
				onSubmit={(values) => handleAuthAction(values)}
				validationSchema={AuthSchema}
			>
				{({
					errors,
					handleChange,
					handleBlur,
					handleSubmit,
					touched,
					values,
				}) => (
					<View className="my-10">
						<View>
							<Text>Email</Text>
							<TextInput
								accessibilityLabel="email"
								className="p-4 border w-80"
								editable={!isLoading}
								keyboardType="email-address"
								onChangeText={handleChange("email")}
								onBlur={handleBlur("email")}
								value={values.email}
							/>
							{touched.email && errors.email && (
								<Text testID="email-validation-alert">{errors.email}</Text>
							)}
						</View>

						<View>
							<Text>Password</Text>
							<TextInput
								accessibilityLabel="password"
								className="p-4 border w-80"
								editable={!isLoading}
								onChangeText={handleChange("password")}
								onBlur={handleBlur("password")}
								secureTextEntry
								value={values.password}
							/>
							{touched.password && errors.password && (
								<Text testID="password-validation-alert">
									{errors.password}
								</Text>
							)}
						</View>

						<Button
							disabled={isLoading}
							onPress={handleSubmit as (e?: GestureResponderEvent) => void}
							title={isLoading ? `Submitting...` : `Submit`}
						/>
					</View>
				)}
			</Formik>
		</View>
	);
}
