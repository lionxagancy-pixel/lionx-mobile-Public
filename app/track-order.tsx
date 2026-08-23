import { Text, View } from "react-native";
import { ScreenContainer } from "@/components/screen-container";

const steps = [
  { label: "تم إنشاء الطلب", detail: "تم تسجيل بياناتك", active: true },
  { label: "مراجعة الدفع", detail: "يتحقق الفريق من طريقة التحويل", active: true },
  { label: "التأكيد", detail: "سيظهر بعد اعتماد الطلب", active: false },
  { label: "التنفيذ", detail: "يبدأ بعد التأكيد", active: false },
];

export default function TrackOrderScreen() {
  return <ScreenContainer edges={["top", "bottom", "left", "right"]} className="px-4 pt-3"><Text className="text-3xl font-black text-foreground">تتبع الطلب</Text><Text className="mt-2 text-sm leading-5 text-muted">حالة الطلب الحالية شفافة وواضحة، ولا نعرض تأكيدًا قبل وصول مراجعة موثوقة.</Text><View className="mt-7 gap-3">{steps.map((step, index) => <View key={step.label} className="flex-row items-start gap-3"><View className={`mt-1 h-5 w-5 items-center justify-center rounded-full ${step.active ? "bg-primary" : "border border-border bg-surface"}`}><Text className={`text-[10px] font-black ${step.active ? "text-background" : "text-muted"}`}>{step.active ? "✓" : index + 1}</Text></View><View className="flex-1 rounded-2xl border border-border bg-surface p-4"><Text className={`font-black ${step.active ? "text-primary" : "text-foreground"}`}>{step.label}</Text><Text className="mt-1 text-xs text-muted">{step.detail}</Text></View></View>)}</View><View className="mt-6 rounded-2xl border border-primary bg-surface p-4"><Text className="text-sm font-black text-foreground">ملاحظة</Text><Text className="mt-2 text-xs leading-5 text-muted">للدعم، احتفظ برقم الطلب وأرسل تفاصيل التحويل عبر قناة LIONX الرسمية بعد اعتمادها.</Text></View></ScreenContainer>;
}
