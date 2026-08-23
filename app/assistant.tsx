import { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { trpc } from "@/lib/trpc";
import { tapFeedback } from "@/lib/feedback";

export default function AssistantScreen() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [answer, setAnswer] = useState("");
  const ask = trpc.lionxAssistant.ask.useMutation({ onSuccess: (data) => setAnswer(data.text) });
  const submit = () => { if (message.trim()) { void tapFeedback(); ask.mutate({ message: message.trim() }); } };
  return <ScreenContainer edges={["top", "bottom", "left", "right"]} className="px-4 pt-3"><ScrollView contentContainerStyle={{ paddingBottom: 32 }}><Pressable onPress={() => router.back()} style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}><Text className="text-sm font-bold text-primary">رجوع</Text></Pressable><Text className="mt-5 text-3xl font-black text-foreground">مساعد LIONX</Text><Text className="mt-2 text-sm leading-5 text-muted">اسأل عن الخدمات أو طريقة الطلب. المساعد لا يؤكد الدفع ولا ينفذ عمليات مالية.</Text><View className="mt-6 rounded-3xl border border-primary bg-surface p-5"><Text className="text-xs font-bold tracking-widest text-primary">LIONX AI</Text><Text className="mt-3 text-sm leading-6 text-foreground">جرّب: ما أفضل مسار لخدمة شركة تريد إطلاق متجر؟</Text></View><TextInput value={message} onChangeText={setMessage} multiline placeholder="اكتب سؤالك هنا" placeholderTextColor="#77716A" className="mt-5 min-h-28 rounded-2xl border border-border bg-surface px-4 py-4 text-right text-foreground" /><Pressable onPress={submit} disabled={ask.isPending || !message.trim()} style={({ pressed }) => [{ opacity: ask.isPending || !message.trim() ? 0.45 : pressed ? 0.8 : 1 }]}><View className="mt-4 items-center rounded-2xl bg-primary py-4"><Text className="font-black text-background">{ask.isPending ? "جاري التفكير..." : "اسأل المساعد"}</Text></View></Pressable>{ask.error ? <Text className="mt-4 text-center text-sm text-error">تعذر الاتصال بالمساعد. حاول مرة أخرى.</Text> : null}{answer ? <View className="mt-5 rounded-2xl border border-border bg-surface p-5"><Text className="text-sm font-black text-primary">إجابة LIONX</Text><Text className="mt-3 text-sm leading-6 text-foreground">{answer}</Text></View> : null}</ScrollView></ScreenContainer>;
}
