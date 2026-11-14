import ThemedButton from "@/components/ui/ThemedButton";
import ThemedText from "@/components/ui/ThemedText";
import ThemedTextInput from "@/components/ui/ThemedTextInput";
import { TEN_YEARS_AGO, TODAY } from "@/constants/dates";
import { SightingSchema } from "@/services/validation/sighting";
import type { SightingFormInputs } from "@/types/forms";
import DateTimePicker from "@expo/ui/community/datetime-picker";
import { Formik } from "formik";
import { type GestureResponderEvent, View } from "react-native";

export default function SightingForm() {
	const isLoading = false;

	function handleSubmit(values: SightingFormInputs) {
		console.log(values);
	}

	return (
		<View>
			<Formik
				initialValues={{ commonName: "", date: TODAY, description: "" }}
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
							label="Common Name"
							isLoading={isLoading}
							isTouched={touched.commonName}
							onBlur={handleBlur("commonName")}
							onChangeText={handleChange("commonName")}
							testId="commonName-validation-alert"
							validationError={errors.commonName}
							value={values.commonName}
						/>

						<View>
							<ThemedText>Date</ThemedText>
							<DateTimePicker
								display="default"
								maximumDate={TODAY}
								minimumDate={TEN_YEARS_AGO}
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
							label="Description"
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
