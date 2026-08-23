#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."

write_page() {
  local file="$1"
  local key="$2"
  mkdir -p "$(dirname "$file")"
  cat > "$file" <<EOF
import { ArchitecturePage } from "@/components/architecture-page";

export default function Page() {
  return <ArchitecturePage pageKey="$key" />;
}
EOF
}

write_detail() {
  local file="$1"
  local key="$2"
  local param="$3"
  mkdir -p "$(dirname "$file")"
  cat > "$file" <<EOF
import { ArchitectureDetailPage } from "@/components/architecture-page";

export default function Page() {
  return <ArchitectureDetailPage pageKey="$key" paramName="$param" />;
}
EOF
}

write_page app/categories.tsx categories
write_page app/play.tsx play
write_page app/pay.tsx pay
write_page app/grow.tsx grow
write_page app/digital.tsx digital
write_page app/vip.tsx vip
write_page app/search.tsx search
write_page app/cart.tsx cart
write_page app/wishlist.tsx wishlist
write_detail 'app/blog/[slug].tsx' blog-detail slug
write_detail 'app/academy/[id].tsx' academy-detail id
write_detail 'app/tools/[id].tsx' tools-detail id
write_page app/about.tsx about
write_page app/faq.tsx faq
write_page app/contact.tsx contact
write_page app/terms.tsx terms
write_page app/privacy.tsx privacy
write_page app/support.tsx support
write_page app/customer-dashboard.tsx customer-dashboard
write_page app/admin-operations.tsx admin-operations
write_page app/admin/suppliers.tsx admin-suppliers
write_page app/admin/pricing.tsx admin-pricing
write_page app/admin/analytics.tsx admin-analytics
write_page app/admin/content.tsx admin-content
write_page app/admin/users.tsx admin-users
write_page app/admin/tickets.tsx admin-tickets
write_page app/admin/coupons.tsx admin-coupons
write_page app/pay/cards.tsx pay-cards
write_page app/pay/kyc.tsx pay-kyc
write_page app/pay/charge.tsx pay-charge
write_page app/pay/withdraw.tsx pay-withdraw
write_page app/notifications.tsx notifications
