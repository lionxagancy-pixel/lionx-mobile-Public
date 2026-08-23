import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

import type { CatalogService } from "@/shared/catalog";
import { buildManualReviewEvents } from "@/shared/order-rules";

export type CartLine = CatalogService & { quantity: number };
export type OrderStatus = "draft" | "pending_review" | "confirmed" | "fulfilled" | "cancelled";
export type PaymentOperation = "order_payment" | "wallet_topup";
export type ManualPaymentDetails = {
  operation?: PaymentOperation;
  amount?: number;
  customerWallet?: string;
  proofName?: string;
};
export type LionxOrder = {
  id: string;
  lines: CartLine[];
  total: number;
  status: OrderStatus;
  createdAt: string;
  paymentMethod: string;
  operation: PaymentOperation;
  customerWallet?: string;
  proofName?: string;
};
export type LionxEvent = ReturnType<typeof buildManualReviewEvents>[number];

type LionxStoreValue = {
  cart: CartLine[];
  orders: LionxOrder[];
  events: LionxEvent[];
  favorites: string[];
  walletBalance: number;
  addToCart: (service: CatalogService) => void;
  removeFromCart: (serviceId: string) => void;
  clearCart: () => void;
  createOrder: (paymentMethod: string, details?: ManualPaymentDetails) => LionxOrder | null;
  toggleFavorite: (serviceId: string) => void;
  total: number;
};

const LionxStoreContext = createContext<LionxStoreValue | null>(null);

export function LionxStoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [orders, setOrders] = useState<LionxOrder[]>([]);
  const [events, setEvents] = useState<LionxEvent[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [walletBalance] = useState(0);
  const [hydrated, setHydrated] = useState(false);
  const total = useMemo(() => cart.reduce((sum, line) => sum + line.price * line.quantity, 0), [cart]);

  useEffect(() => {
    Promise.all([
      AsyncStorage.getItem("lionx.cart"),
      AsyncStorage.getItem("lionx.orders"),
      AsyncStorage.getItem("lionx.events"),
      AsyncStorage.getItem("lionx.favorites"),
    ])
      .then(([savedCart, savedOrders, savedEvents, savedFavorites]) => {
        if (savedCart) setCart(JSON.parse(savedCart));
        if (savedOrders) setOrders(JSON.parse(savedOrders));
        if (savedEvents) setEvents(JSON.parse(savedEvents));
        if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
        setHydrated(true);
      })
      .catch(() => setHydrated(true));
  }, []);

  useEffect(() => {
    if (hydrated) void AsyncStorage.setItem("lionx.cart", JSON.stringify(cart));
  }, [cart, hydrated]);
  useEffect(() => {
    if (hydrated) void AsyncStorage.setItem("lionx.orders", JSON.stringify(orders));
  }, [orders, hydrated]);
  useEffect(() => {
    if (hydrated) void AsyncStorage.setItem("lionx.events", JSON.stringify(events));
  }, [events, hydrated]);
  useEffect(() => {
    if (hydrated) void AsyncStorage.setItem("lionx.favorites", JSON.stringify(favorites));
  }, [favorites, hydrated]);

  const value = useMemo<LionxStoreValue>(
    () => ({
      cart,
      orders,
      events,
      favorites,
      walletBalance,
      total,
      addToCart: (service) =>
        setCart((current) => {
          const exists = current.find((line) => line.id === service.id);
          return exists
            ? current.map((line) => (line.id === service.id ? { ...line, quantity: line.quantity + 1 } : line))
            : [...current, { ...service, quantity: 1 }];
        }),
      removeFromCart: (serviceId) =>
        setCart((current) =>
          current.flatMap((line) =>
            line.id !== serviceId ? [line] : line.quantity > 1 ? [{ ...line, quantity: line.quantity - 1 }] : [],
          ),
        ),
      clearCart: () => setCart([]),
      toggleFavorite: (serviceId) =>
        setFavorites((current) =>
          current.includes(serviceId) ? current.filter((id) => id !== serviceId) : [...current, serviceId],
        ),
      createOrder: (paymentMethod, details) => {
        const operation = details?.operation ?? "order_payment";
        const requestedAmount = details?.amount ?? total;
        const hasValidOrder = operation === "order_payment" && cart.length > 0;
        const hasValidTopUp = operation === "wallet_topup" && Number.isFinite(requestedAmount) && requestedAmount > 0;
        if (!hasValidOrder && !hasValidTopUp) return null;

        const createdAt = new Date().toISOString();
        const order: LionxOrder = {
          id: `LX-${Date.now().toString(36).toUpperCase()}`,
          lines: operation === "order_payment" ? cart : [],
          total: requestedAmount,
          status: "pending_review",
          createdAt,
          paymentMethod,
          operation,
          customerWallet: details?.customerWallet?.trim() || undefined,
          proofName: details?.proofName?.trim() || undefined,
        };
        const orderEvents = buildManualReviewEvents(order.id, createdAt);
        setOrders((current) => [order, ...current]);
        setEvents((current) => [...orderEvents, ...current]);
        if (operation === "order_payment") setCart([]);
        return order;
      },
    }),
    [cart, orders, events, favorites, total, walletBalance],
  );

  return <LionxStoreContext.Provider value={value}>{children}</LionxStoreContext.Provider>;
}

export function useLionxStore() {
  const context = useContext(LionxStoreContext);
  if (!context) throw new Error("useLionxStore must be used inside LionxStoreProvider");
  return context;
}
