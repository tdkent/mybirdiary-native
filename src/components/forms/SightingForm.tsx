import ThemedButton from "@/components/ui/ThemedButton";
import ThemedTextInput from "@/components/ui/ThemedTextInput";
import { SightingSchema } from "@/services/validation/sighting";
import type { SightingFormInputs } from "@/types/forms";
import DateTimePicker from "@expo/ui/community/datetime-picker";
import { Formik } from "formik";
import { type GestureResponderEvent, Text, View } from "react-native";

export const today = new Date();
export const tenYearsAgo = new Date(
	today.getTime() - 1000 * 60 * 60 * 24 * 365 * 10,
);

export default function SightingForm() {
	const isLoading = false;

	function handleSubmit(values: SightingFormInputs) {
		console.log(values);
	}

	return (
		<View>
			<Formik
				initialValues={{ commonName: "", date: today, description: "" }}
				onSubmit={handleSubmit}
				validationSchema={SightingSchema}
			>
				{({
					errors,
					handleChange,
					handleBlur,
					handleSubmit,
					setFieldValue,
					touched,
					values,
				}) => (
					<View className="my-10">
						<ThemedTextInput
							handleBlur={handleBlur("commonName")}
							label="common name"
							isLoading={isLoading}
							isTouched={touched.commonName}
							onBlur={handleBlur("commonName")}
							onChangeText={handleChange("commonName")}
							testId="commonName-validation-alert"
							validationError={errors.commonName}
							value={values.commonName}
						/>

						<View>
							<Text>Date</Text>
							<DateTimePicker
								display="default"
								maximumDate={today}
								minimumDate={tenYearsAgo}
								mode="date"
								onValueChange={(_, selectedDate) => {
									if (selectedDate) {
										setFieldValue("date", selectedDate);
									}
								}}
								value={values.date}
							/>
						</View>

						<ThemedTextInput
							handleBlur={handleBlur("description")}
							label="description"
							isLoading={isLoading}
							isTouched={touched.description}
							onBlur={handleBlur("description")}
							onChangeText={handleChange("description")}
							testId="description-validation-alert"
							validationError={errors.description}
							value={values.description}
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
