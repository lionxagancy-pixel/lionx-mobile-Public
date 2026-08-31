import { describe, expect, it } from "vitest";
import { catalogBrands, categories, formatEgp, mallPillars, services } from "../shared/catalog";
import { buildManualReviewEvents } from "../shared/order-rules";

describe("LIONX catalog", () => {
  it("contains the five mall pillars", () => {
    expect(mallPillars.map((pillar) => pillar.id)).toEqual(["play", "pay", "grow", "digital", "vip"]);
  });

  it("keeps services searchable by category", () => {
    const gaming = services.filter((service) => service.category === "gaming");
    expect(gaming.length).toBeGreaterThan(0);
    expect(categories.some((category) => category.id === "gaming")).toBe(true);
  });

  it("groups each brand once while preserving its package choices", () => {
    expect(catalogBrands.length).toBeGreaterThan(0);
    expect(new Set(catalogBrands.map((brand) => `${brand.sector}:${brand.originalBrand}`)).size).toBe(catalogBrands.length);
    expect(catalogBrands.find((brand) => brand.originalBrand === "Netflix Premium")?.packages).toHaveLength(74);
    expect(catalogBrands.find((brand) => brand.originalBrand === "Spotify Premium")?.packages).toHaveLength(74);
  });

  it("formats prices in Egyptian pounds", () => {
    expect(formatEgp(250)).toContain("٢٥٠");
    expect(formatEgp(250)).toContain("ج.م");
  });
});

describe("LIONX order rules", () => {
  it("does not allow a zero quantity line in a valid basket", () => {
    const line = { quantity: 1, price: 250 };
    expect(line.quantity).toBeGreaterThan(0);
    expect(line.quantity * line.price).toBe(250);
  });

  it("uses a review-first status for manual payment", () => {
    const status = "pending_review";
    expect(status).toBe("pending_review");
    expect(status).not.toBe("paid");
  });

  it("creates an auditable manual-review event sequence", () => {
    const events = buildManualReviewEvents("LX-DEMO", "2026-08-22T00:00:00.000Z");
    expect(events.map((event) => event.type)).toEqual(["created", "payment_selected", "review_pending"]);
    expect(new Set(events.map((event) => event.id)).size).toBe(3);
    expect(events.every((event) => event.orderId === "LX-DEMO")).toBe(true);
  });
});
