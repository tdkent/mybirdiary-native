import { Formik } from "formik";
import { useEffect } from "react";
import { type GestureResponderEvent, View } from "react-native";
import ThemedButton from "@/components/ui/themed-button";
import ThemedText from "@/components/ui/themed-text";
import ThemedTextInput from "@/components/ui/themed-text-input";
import { useAuth } from "@/hooks/use-auth";
import { AuthSchema } from "@/services/validation/auth";
import type { UserAuthInputs } from "@/types/forms";

//? handleSubmit type error: https://github.com/jaredpalmer/formik/issues/3643

interface Props {
	isLogin?: boolean;
}

/** Form to authenticate user. */
export default function AuthForm({ isLogin }: Props) {
	const { authError, isLoading, login, register, setAuthError } = useAuth();

	useEffect(() => {
		setAuthError(null);
	}, [setAuthError]);

	function handleAuthAction(values: UserAuthInputs) {
		if (isLogin) {
			login(values);
		} else {
			register(values);
		}
	}

	return (
		<View>
			{authError && <ThemedText testId="auth-error">{authError}</ThemedText>}
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
