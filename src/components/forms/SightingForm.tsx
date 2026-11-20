import DateTimePicker from "@expo/ui/community/datetime-picker";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import { type GestureResponderEvent, Text, View } from "react-native";
import ThemedButton from "@/components/ui/ThemedButton";
import ThemedText from "@/components/ui/ThemedText";
import ThemedTextInput from "@/components/ui/ThemedTextInput";
import { ERROR_MESSAGES } from "@/constants/messages";
import { useAuth } from "@/hooks/useAuth";
import { createSighting } from "@/services/api/mutate";
import { SightingSchema } from "@/services/validation/sighting";
import type { SightingMutationInputs } from "@/types/forms";
import { getOneYearAgo, getToday } from "@/utils/dates";

export default function SightingForm() {
	const { user } = useAuth();
	const queryClient = useQueryClient();
	const router = useRouter();

	if (!user) {
		throw new Error(ERROR_MESSAGES.AUTH_ERROR);
	}

	const { error, isError, isPending, mutate } = useMutation({
		mutationFn: ({ userId, formValues }: SightingMutationInputs) =>
			createSighting({ userId, formValues }),
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ["sightings"] });
			router.push("/sightings");
		},
	});

	const today = getToday();
	const oneYearAgo = getOneYearAgo();

	return (
		<View>
			{isError && <Text>{error.message}</Text>}
			<Formik
				initialValues={{ commonName: "", date: today, description: "" }}
				validationSchema={SightingSchema}
				onSubmit={(formValues, { resetForm }) => {
					mutate({ userId: user.$id, formValues });
					resetForm();
				}}
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
								disabled={isPending}
								display="default"
								maximumDate={today}
								minimumDate={oneYearAgo}
								mode="date"
								onValueChange={(_, selectedDate) => {
									if (selectedDate) {
										setFieldValue("date", selectedDate);
									}
								}}
								testID="sighting-date"
								value={values.date}
							/>
							{touched.date && typeof errors.date === "string" && (
								<Text>{errors.date}</Text>
							)}
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
