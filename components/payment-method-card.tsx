import { Image, Pressable, StyleSheet, Text, View, type ImageSourcePropType } from "react-native";

export interface PaymentMethodCardProps {
  name: string;
  description: string;
  value: string;
  logo: ImageSourcePropType;
  copied: boolean;
  onCopy: () => void;
}

const styles = StyleSheet.create({
  logo: { width: 48, height: 48 },
});

export function PaymentMethodCard({
  name,
  description,
  value,
  logo,
  copied,
  onCopy,
}: PaymentMethodCardProps) {
  return (
    <View className="rounded-3xl border border-border bg-surface p-4">
      <View className="flex-row items-center gap-3">
        <View className="h-16 w-16 items-center justify-center rounded-2xl border border-border bg-background p-2">
          <Image source={logo} resizeMode="contain" style={styles.logo} />
        </View>
        <View className="flex-1">
          <Text className="text-base font-black text-foreground">{name}</Text>
          <Text className="mt-1 text-xs leading-5 text-muted">{description}</Text>
        </View>
      </View>
      <View className="mt-4 flex-row items-center gap-2 rounded-2xl border border-border bg-background p-3">
        <Text selectable className="flex-1 text-base font-black tracking-wide text-foreground">
          {value}
        </Text>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`نسخ رقم ${name}`}
          onPress={onCopy}
          style={({ pressed }) => [
            {
              opacity: pressed ? 0.65 : 1,
              borderRadius: 12,
              paddingHorizontal: 14,
              paddingVertical: 10,
              backgroundColor: copied ? "#D6A84A" : "#B8862D",
            },
          ]}
        >
          <Text className="text-xs font-black text-background">{copied ? "تم النسخ" : "نسخ"}</Text>
        </Pressable>
      </View>
    </View>
  );
}
