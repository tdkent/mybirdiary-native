import { type KeyboardTypeOptions, TextInput, View } from "react-native";
import ThemedText from "@/components/ui/themed-text";

interface Props {
	handleBlur: (e: unknown) => void;
	isLoading: boolean;
	isTouched: boolean | undefined;
	keyboardType?: KeyboardTypeOptions;
	label: string;
	onBlur: unknown;
	onChangeText: (text: string) => unknown;
	secure?: boolean;
	testId?: string;
	validationError: string | undefined;
	value: string;
}

export default function ThemedTextInput({
	handleBlur,
	isLoading,
	isTouched,
	keyboardType,
	label,
	onChangeText,
	secure,
	testId,
	validationError,
	value,
}: Props) {
	return (
		<View>
			<ThemedText>{label}</ThemedText>
			<TextInput
				accessibilityLabel={label}
				className="p-4 border w-80 text-foreground border-border"
				editable={!isLoading}
				keyboardType={keyboardType}
				onBlur={handleBlur}
				onChangeText={onChangeText}
				secureTextEntry={secure}
				value={value}
			/>
			{isTouched && validationError && (
				<ThemedText testId={testId}>{validationError}</ThemedText>
			)}
		</View>
	);
}
