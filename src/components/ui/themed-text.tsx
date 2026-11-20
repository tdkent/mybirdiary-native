import { Text } from "react-native";

interface Props {
	children: React.ReactNode;
	variant?: "heading" | "p";
}

export default function ThemedText({ children, variant = "p" }: Props) {
	const textVariants = {
		heading: "text-foreground text-center text-4xl font-semibold",
		p: "text-foreground text-center text-xl",
	};

	return <Text className={textVariants[variant]}>{children}</Text>;
}
