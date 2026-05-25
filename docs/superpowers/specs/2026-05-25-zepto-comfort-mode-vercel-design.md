# Design: Zepto Comfort Mode — Vercel-Deployable Prototype

**Date:** 2026-05-25
**Status:** Approved

---

## What We're Building

A Vite + React app that wraps and enhances the existing `zepto-comfort-mode.jsx` component into a fully functional, Vercel-deployable prototype. The component is already visually complete; this spec covers the functional upgrades and deployment scaffold only.

---

## Functional Scope

Five upgrades over the current JSX:

1. **Cart total** — running ₹ sum in the header cart button
2. **Quantity controls** — +/− on each product card; "ADD" becomes "+1" and exposes quantity stepper after first add
3. **Cart persistence** — cart state synced to `localStorage`; survives page refresh
4. **Cart drawer** — slide-up sheet showing all cart items, quantities, per-item totals, grand total, and a "Place Order" CTA
5. **Reorder pre-fills cart drawer** — tapping a Quick Reorder card populates cart drawer with those items (qty 1 each) and opens the drawer

---

## Architecture

### State

All cart state lives in `App.jsx`. Shape:

```js
// cart: Record<productId, { product: Product, quantity: number }>
const [cart, setCart] = useState({})
const [drawerOpen, setDrawerOpen] = useState(false)
```

- Map (not array) — deduplicates products automatically, O(1) quantity updates
- `localStorage` sync via `useEffect` on `cart` changes
- Hydration: load from `localStorage` on mount with a fallback to `{}`

### Component Tree

```
App.jsx
├── Header.jsx          props: cart, onOpenDrawer
├── ETABanner.jsx       props: none (reads time internally)
├── QuickReorder.jsx    props: previousOrders, onReorder(order)
├── ComfortShelf.jsx    props: products, cart, onAdd, onRemove
│   └── ProductCard.jsx props: product, quantity, onAdd, onRemove
├── CartDrawer.jsx      props: cart, isOpen, onClose, onAdd, onRemove
└── Toast.jsx           props: product (null = hidden), auto-dismiss 2s
```

### Data

`src/data/products.js` exports:
- `comfortShelf` — array of 4 products (extracted from current JSX)
- `previousOrders` — array of 2 orders (extracted from current JSX)

Product shape:
```js
{ id, name, price, image, frozenSafe, confidence, tags }
```

Previous order shape:
```js
{ id, name, date, items: string[], productIds: number[], total, itemCount }
```

`items` are display strings only. `productIds` is the authoritative list for reordering — direct ID lookup against `comfortShelf`. This avoids fragile name-substring matching.

---

## Component Specs

### Header
- Left: zepto wordmark + "Comfort Mode" tag
- Right: cart icon + item count badge + ₹ total (hidden when cart is empty)
- Clicking the cart area opens CartDrawer

### ETABanner
- Unchanged from current JSX
- Reads `new Date()` internally via `useEffect` timer

### QuickReorder
- On click: look up `order.productIds` against `comfortShelf`, add each matched product to cart (qty 1, additive — don't overwrite existing qty), then open drawer

### ProductCard
- Empty state: purple "ADD" button (current design)
- After first add: button area becomes `[−] [qty] [+]` row, purple background
- `−` at qty 1 removes the item from cart entirely
- Clicking card background still triggers add (same as current)

### CartDrawer
- Slides up from bottom, full-width, max-height 80vh, scrollable
- Header: "Your Cart" + close (×) button
- Item list: emoji + name + qty controls + line total
- Footer (sticky): grand total + "Place Order" CTA (purple, shows a toast "Order placed! 🎉" and clears cart)
- Backdrop: semi-transparent dark overlay, click to close

### Toast
- Fixed bottom-center, slides up, auto-dismisses after 2s
- Reuses existing animation from JSX
- Two variants: "Added to cart" (add) and "Order placed! 🎉" (checkout)

---

## Responsive Layout

| Breakpoint | Layout |
|---|---|
| < 480px | Single column, full width padding 16px |
| 480–768px | Single column, max-width 480px centered |
| 768–1024px | Two-column product grid |
| > 1024px | Three-column product grid, content max-width 960px centered |

Breakpoints via CSS media queries injected in `index.css` (no framework).

---

## Deployment

- **Scaffold:** Vite (`npm create vite@latest . -- --template react`)
- **Dependencies:** `lucide-react` only (already used in JSX)
- **Vercel config:** none needed — Vite builds to `dist/`, Vercel auto-detects
- **Build command:** `npm run build`
- **Output dir:** `dist`

---

## Out of Scope

- No authentication
- No real payment or order API
- No search or category browsing
- No backend — all data is static mock
- No unit tests (prototype; add after stakeholder validation)
