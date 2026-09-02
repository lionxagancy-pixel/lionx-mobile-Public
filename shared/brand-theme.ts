/**
 * نقطة التعديل المركزية لهوية كروت LIONX.
 * لتغيير الهوية، عدّل هذه القيم فقط ثم شغّل build.
 */
export const CARD_THEME = {
  cardBackground: "#FFFFFF",
  cardBorder: "#D4AF37",
  cardHighlight: "#FFF9E8",
  cardSoftBackground: "#FFFDF6",
  cardDivider: "#EFE4B5",
  cardText: "#111111",
  cardMuted: "#777777",
  cardShadow: "#111111",
  accent: "#D4AF37",
} as const;

export type CardTheme = typeof CARD_THEME;
