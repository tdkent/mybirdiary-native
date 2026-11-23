import {
	type KeyboardTypeOptions,
	TextInput,
	type TextInputProps,
	View,
} from "react-native";
import ThemedText from "@/components/ui/themed-text";

interface Props extends TextInputProps {
	handleBlur: (e: unknown) => void;
	disabled: boolean;
	isTouched: boolean | undefined;
	keyboardType?: KeyboardTypeOptions;
	label: string;
	onChangeText: (text: string) => unknown;
	secure?: boolean;
	testId?: string;
	validationError: string | undefined;
	value: string;
}

export default function ThemedTextInput({
	handleBlur,
	disabled,
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
				editable={!disabled}
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
