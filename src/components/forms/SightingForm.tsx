import ThemedButton from "@/components/ui/ThemedButton";
import ThemedText from "@/components/ui/ThemedText";
import ThemedTextInput from "@/components/ui/ThemedTextInput";
import { TEN_YEARS_AGO, TODAY } from "@/constants/dates";
import { ERROR_MESSAGES } from "@/constants/messages";
import { useAuth } from "@/hooks/useAuth";
import { createSighting } from "@/services/api/mutate";
import { SightingSchema } from "@/services/validation/sighting";
import type { SightingMutationInputs } from "@/types/forms";
import DateTimePicker from "@expo/ui/community/datetime-picker";
import { useMutation } from "@tanstack/react-query";
import { Formik } from "formik";
import { type GestureResponderEvent, Text, View } from "react-native";

export default function SightingForm() {
	const { user } = useAuth();

	if (!user) {
		throw new Error(ERROR_MESSAGES.AUTH_ERROR);
	}

	const { error, isError, isPending, mutate } = useMutation({
		mutationFn: ({ userId, formValues }: SightingMutationInputs) =>
			createSighting({ userId, formValues }),
	});

	return (
		<View>
			{isError && <Text>{error.message}</Text>}
			<Formik
				initialValues={{ commonName: "", date: TODAY, description: "" }}
				onSubmit={(formValues) => mutate({ userId: user.$id, formValues })}
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
							isLoading={isPending}
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
							isLoading={isPending}
							isTouched={touched.description}
							onBlur={handleBlur("description")}
							onChangeText={handleChange("description")}
							testId="description-validation-alert"
							validationError={errors.description}
							value={values.description}
						/>

						<ThemedButton
							isLoading={isPending}
							label={isPending ? `Submitting...` : `Submit`}
							onPress={handleSubmit as (e?: GestureResponderEvent) => void}
						/>
					</View>
				)}
			</Formik>
		</View>
	);
}
