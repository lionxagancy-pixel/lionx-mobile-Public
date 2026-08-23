# LIONX Storefront Benchmark Notes

## Purpose
هذه الملاحظات تلخص أفكاراً وظيفية مستفادة من مواقع مرجعية طلب المستخدم فحصها. لا تمثل نسخاً للتصميم أو المحتوى، ولا تعد موافقة تجارية أو شراكة مع أي موقع.

## SEAGM
Source: https://www.seagm.com/

The observed storefront separates the catalog into clear top-level product modes such as Game, Card, Direct Top-Up, CD-Key, and Mobile Recharge. The homepage uses focused merchandising blocks: a hero/banner, limited offers, coupons, popular game cards, and editorial/news sections. Product tiles show an image, product name, region or context, price, and promotion state. The main reusable idea for LIONX is to keep the homepage as a discovery hub and move the customer to a dedicated product/detail route before purchase, rather than expanding full details inline on the homepage.

## Codashop
Source: https://www.codashop.com/international

The observed experience first asks for or exposes country/market selection, and presents a concise value proposition around quick game-credit purchasing. The relevant reusable idea for LIONX is a short, linear purchase flow: choose market/department, choose product, enter the required customer/game data, choose payment, and confirm. The homepage or market selector should not carry every product detail at once.

## Design decisions for LIONX

1. The public route model will be explicit: `/` → `/department/:departmentId` or `/section/:sectionId` → `/service/:code` → `/cart` → `/checkout` → payment confirmation/success.
2. Homepage sections will act as gateways, not inline catalog dumps. Each gateway has one purpose, a short explanation, and a clear button.
3. Service cards will use a compact marketplace grid. Each card has a visual cover, category label, name, price, delivery note, and one primary action; secondary actions will not compete with the primary action.
4. Payment selection will be a dedicated page/step with branded payment-method cards and a separate details form after the user selects a method.
5. LIONX will retain its own black, gold, emerald, and glass identity. External sites are references for information architecture only.

## Other user-provided reference URLs to inspect
- https://www.midasbuy.com
- https://gamsgo.com
- https://www.bulkfollow.com

## Midasbuy
Source: https://www.midasbuy.com

The live page did not render readable content in the browser session, so no visual claims are made from it. The relevant product principle remains the official-style linear flow for top-up: identify game/market, select a package, enter the required player identifier, choose payment, and confirm.

## GamsGo
Source: https://gamsgo.com/

The live page returned an access-block response in the browser session. No visual or product claims are made from the inaccessible page. The site was retained as a reference only because the user named it for subscription-market context.

## BulkFollow
Source: https://www.bulkfollow.com

The browser session could not establish a connection to the provided domain, including the bare-domain retry. No claims are made about its current UI or capabilities. LIONX will use only the general information-architecture lesson requested by the user: separate social-media service discovery from product detail and checkout, and avoid exposing unsupported integrations as if they were active.
