/**
 * نقطة التعديل المركزية لهوية كروت LIONX.
 * غيّر القيم اللونية هنا فقط؛ لا يوجد أي layout أو notch خارج الكارت.
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
  cardRadius: 20,
  cardBorderWidth: 1,
} as const;

export type CardTheme = typeof CARD_THEME;
