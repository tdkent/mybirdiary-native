import ThemedButton from "@/components/ui/ThemedButton";
import ThemedTextInput from "@/components/ui/ThemedTextInput";
import { useAuth } from "@/hooks/useAuth";
import { AuthSchema } from "@/services/validation/auth";
import type { AuthActions, UserAuth } from "@/types/forms";
import { Formik } from "formik";
import { useEffect } from "react";
import { type GestureResponderEvent, Text, View } from "react-native";

//? handleSubmit type error: https://github.com/jaredpalmer/formik/issues/3643

/** Form to authenticate user. */
export default function AuthForm({ action }: AuthActions) {
	const { error, isLoading, login, register, setError } = useAuth();

	useEffect(() => {
		setError(null);
	}, []);

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
						<ThemedTextInput
							handleBlur={handleBlur("email")}
							keyboardType="email-address"
							label="email"
							isLoading={isLoading}
							isTouched={touched.email}
							onBlur={handleBlur("email")}
							onChangeText={handleChange("email")}
							testId="email-validation-alert"
							validationError={errors.email}
							value={values.email}
						/>

						<ThemedTextInput
							handleBlur={handleBlur("password")}
							label="password"
							isLoading={isLoading}
							isTouched={touched.password}
							onBlur={handleBlur("password")}
							onChangeText={handleChange("password")}
							secure
							testId="password-validation-alert"
							validationError={errors.password}
							value={values.password}
						/>

						<ThemedButton
							isLoading={isLoading}
							label={isLoading ? `Submitting...` : `Submit`}
							onPress={handleSubmit as (e?: GestureResponderEvent) => void}
						/>
					</View>
				)}
			</Formik>
		</View>
	);
}
