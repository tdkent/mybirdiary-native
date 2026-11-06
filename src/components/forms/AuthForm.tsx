import { useAuth } from "@/hooks/useAuth";
import { AuthSchema } from "@/services/validation/auth.schema";
import type { UserAuth } from "@/types/auth";
import { usePathname } from "expo-router";
import { Formik } from "formik";
import {
	Button,
	type GestureResponderEvent,
	Text,
	TextInput,
	View,
} from "react-native";

//? handleSubmit type error: https://github.com/jaredpalmer/formik/issues/3643

export default function AuthForm() {
	const { login, register } = useAuth();
	const pathname = usePathname();

	function handleAuthAction(values: UserAuth) {
		if (pathname === "/register") {
			register(values);
		} else if (pathname === "/login") {
			login(values);
		} else return;
	}

	return (
		<View>
			<Formik
				initialValues={{ email: "", password: "" }}
				onSubmit={(values) => handleAuthAction(values)}
				validationSchema={AuthSchema}
			>
				{({ handleChange, handleBlur, handleSubmit, values }) => (
					<View className="my-10">
						<View>
							<Text>Email</Text>
							<TextInput
								keyboardType="email-address"
								onChangeText={handleChange("email")}
								onBlur={handleBlur("email")}
								value={values.email}
								className="p-4 border w-80"
							/>
						</View>

						<View>
							<Text>Password</Text>
							<TextInput
								onChangeText={handleChange("password")}
								onBlur={handleBlur("password")}
								secureTextEntry
								value={values.password}
								className="p-4 border w-80"
							/>
						</View>

						<Button
							onPress={handleSubmit as (e?: GestureResponderEvent) => void}
							title="Submit"
						/>
					</View>
				)}
			</Formik>
		</View>
	);
}
