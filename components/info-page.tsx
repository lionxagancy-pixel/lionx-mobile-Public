import { ReactNode } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";

export function InfoPage({ eyebrow, title, intro, children }: { eyebrow: string; title: string; intro: string; children: ReactNode }) {
  const router = useRouter();
  return <ScreenContainer edges={["top", "bottom", "left", "right"]} className="px-4 pt-3"><ScrollView contentContainerStyle={{ paddingBottom: 32 }}><Pressable onPress={() => router.back()} style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}><Text className="text-sm font-bold text-primary">رجوع</Text></Pressable><View className="mt-5 rounded-3xl border border-primary bg-surface p-5"><Text className="text-xs font-bold tracking-widest text-primary">{eyebrow}</Text><Text className="mt-2 text-3xl font-black text-foreground">{title}</Text><Text className="mt-3 text-sm leading-6 text-muted">{intro}</Text></View><View className="mt-5 gap-3">{children}</View></ScrollView></ScreenContainer>;
}

export function InfoCard({ title, body }: { title: string; body: string }) {
  return <View className="rounded-2xl border border-border bg-surface p-4"><Text className="text-base font-black text-foreground">{title}</Text><Text className="mt-2 text-sm leading-6 text-muted">{body}</Text></View>;
}
