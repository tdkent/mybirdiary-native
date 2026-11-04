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
	return (
		<Formik
			initialValues={{ email: "", password: "" }}
			onSubmit={(values) => console.log(values)}
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
	);
}
