import { useMemo, useState } from "react";
import { Alert, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";

const options = [
  "هوية بصرية متكاملة",
  "إنشاء موقع أو متجر",
  "إدارة إعلانات ونمو",
  "استشارات وتحول رقمي",
];

export default function QuoteBuilderScreen() {
  const router = useRouter();
  const [company, setCompany] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [details, setDetails] = useState("");
  const canSubmit = company.trim().length > 1 && selected.length > 0;
  const summary = useMemo(() => selected.length ? `${selected.length} خدمات مختارة` : "اختر الخدمات المطلوبة", [selected.length]);

  const toggle = (item: string) => setSelected((current) => current.includes(item) ? current.filter((value) => value !== item) : [...current, item]);

  const submit = () => {
    if (!canSubmit) return;
    Alert.alert("تم حفظ الطلب المبدئي", "سيراجع فريق LIONX التفاصيل ويتواصل معك لتأكيد عرض السعر.");
  };

  return (
    <ScreenContainer edges={["top", "bottom", "left", "right"]} className="px-4 pt-3">
      <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
        <View className="flex-row items-center justify-between">
          <Pressable onPress={() => router.back()} style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}><Text className="text-sm font-bold text-primary">رجوع</Text></Pressable>
          <Text className="text-xl font-black text-foreground">عرض سعر للشركات</Text>
        </View>
        <View className="mt-5 rounded-3xl border border-primary bg-surface p-5">
          <Text className="text-xs font-bold tracking-widest text-primary">LIONX B2B</Text>
          <Text className="mt-2 text-2xl font-black text-foreground">ابنِ طلبك التجاري</Text>
          <Text className="mt-2 text-sm leading-5 text-muted">اختر الخدمات المطلوبة، وسنراجع النطاق والميزانية قبل إرسال عرض مناسب. هذا الطلب ليس موافقة ائتمانية تلقائية.</Text>
        </View>
        <Text className="mt-6 text-base font-black text-foreground">اسم الشركة</Text>
        <TextInput value={company} onChangeText={setCompany} placeholder="مثال: شركة LIONX" placeholderTextColor="#77716A" className="mt-2 rounded-2xl border border-border bg-surface px-4 py-4 text-right text-foreground" />
        <View className="mt-6 flex-row items-end justify-between"><Text className="text-base font-black text-foreground">الخدمات المطلوبة</Text><Text className="text-xs text-primary">{summary}</Text></View>
        <View className="mt-3 gap-2">
          {options.map((item) => {
            const active = selected.includes(item);
            return <Pressable key={item} onPress={() => toggle(item)} style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}><View className={`rounded-2xl border p-4 ${active ? "border-primary bg-primary" : "border-border bg-surface"}`}><Text className={`text-sm font-bold ${active ? "text-background" : "text-foreground"}`}>{active ? "✓ " : ""}{item}</Text></View></Pressable>;
          })}
        </View>
        <Text className="mt-6 text-base font-black text-foreground">تفاصيل إضافية</Text>
        <TextInput value={details} onChangeText={setDetails} multiline numberOfLines={4} textAlignVertical="top" placeholder="الميزانية أو الموعد أو أي متطلبات خاصة" placeholderTextColor="#77716A" className="mt-2 min-h-28 rounded-2xl border border-border bg-surface px-4 py-4 text-right text-foreground" />
        <Pressable onPress={submit} disabled={!canSubmit} style={({ pressed }) => [{ opacity: !canSubmit ? 0.45 : pressed ? 0.82 : 1 }]}><View className="mt-6 items-center rounded-2xl bg-primary px-5 py-4"><Text className="font-black text-background">إرسال طلب عرض السعر</Text></View></Pressable>
        <Pressable onPress={() => router.push("/payment-methods")} style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}><Text className="mt-5 text-center text-xs font-bold text-primary">اطّلع على طرق الدفع والضمان ←</Text></Pressable>
      </ScrollView>
    </ScreenContainer>
  );
}
