export type ManualOrderEventType = "created" | "payment_selected" | "review_pending";

export type ManualOrderEvent = {
  id: string;
  orderId: string;
  type: ManualOrderEventType;
  createdAt: string;
};

export function buildManualReviewEvents(orderId: string, createdAt: string): ManualOrderEvent[] {
  return [
    { id: `${orderId}-created`, orderId, type: "created", createdAt },
    { id: `${orderId}-payment`, orderId, type: "payment_selected", createdAt },
    { id: `${orderId}-review`, orderId, type: "review_pending", createdAt },
  ];
}
